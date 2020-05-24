import React, { Component } from 'react'
import { Button, Block, Text, Card } from '../components';
import { AsyncStorage, TouchableOpacity, Dimensions, Image, StyleSheet, View, ScrollView, Vibration, Platform } from 'react-native';
import { theme } from '../constants';
import firebase from 'firebase';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

export default class Main extends Component {
    state = {
        isModalVisible: false,
        room: {
            name: 'Ø22-603-0, Bygning 44',
            decibel: 0,
            lux: 0,
            occupants: 0,
            temperature: 0,
            isBooked: false,
            isTempBooked: false
        },
        mapRegion: {
            latitude: 55.366910,
            longitude: 10.430083,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005
        },
        expoPushToken: '',
        notification: {},
    };
    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })
    componentDidMount() {
        this.getNewRoom();
        this.registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }
    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = await Notifications.getExpoPushTokenAsync();
            this.setState({ expoPushToken: token });
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };

    _handleNotification = notification => {
        Vibration.vibrate();
        this.setState({ notification: notification });
    };
    sendPushNotification = async () => {
        const message = {
            to: this.state.expoPushToken,
            sound: 'default',
            title: ('Dit rum er: ', this.state.room.name),
            body: `Rummet passer til dine præferencer: 
👨‍👨‍👦‍👦 Under 10 personer, det ser ud til at falde snart 
🎤 Lavt støjniveau, det ser ud til at forblive
🌡 Lav temperatur, det ser ud til at stige snart
☀️ Normal lysstyrke, det ser ud til at stige snart`,
            data: { data: 'goes here' },
            _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    };

    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };

    getNewRoom() {
        const rooms = ["U-1", "U-2", "U-3", "U-4", "U-5"]
        let randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        firebase.database().ref('place/').child(randomRoom).on('value', snapshot => {
            this.setState({
                room: {
                    name: snapshot.val().name,
                    decibel: snapshot.val().decibel,
                    lux: snapshot.val().lux,
                    occupants: snapshot.val().occupants,
                    temperature: snapshot.val().temperature,
                    isBooked: snapshot.val().isBooked,
                    isTempBooked: snapshot.val().isTempBooked,
                },
                mapRegion: {
                    latitude: snapshot.val().longi,
                    longitude: snapshot.val().lat,
                    latitudeDelta: 0.0005,
                    longitudeDelta: 0.0005
                }
            })
        })
    }
    renderRoom() {
        const { room } = this.state;
        return (
            <Card shadow style={{ padding: theme.sizes.base }}>
                <Block row>
                    <Block flex={2}>
                        <Text spacing={0.7}>Din anbefaling lige nu er </Text>

                        <Block row style={{ paddingTop: 10 }}>
                            <Text style={{ padding: theme.sizes.padding / 2 }} ><Ionicons name="md-pin" size={40} color={theme.colors.gray2} /></Text>
                            <Text h1>{room.name}</Text>
                        </Block>

                        <TouchableOpacity onPress={this.getNewRoom.bind(this)}>
                            <Text primary spacing={0.3} style={{ paddingTop: 10 }}>Ønsker du et andet rum?</Text>
                        </TouchableOpacity>
                    </Block>

                    <Block flex={1}>
                        <MapView
                            region={this.state.mapRegion}
                            customMapStyle={mapStyle}
                            onRegionChange={this._handleMapRegionChange} style={styles.mapStyle}
                        >
                            <Marker
                                coordinate={this.state.mapRegion}
                            />
                        </MapView>
                    </Block>
                </Block>
            </Card>
        )
    }
    renderRoomDetails() {
        const { room } = this.state;
        return (
            <Card shadow style={{ padding: theme.sizes.base }}>

                <Text spacing={0.7}>Her er i dette øjeblik</Text>
                <Block row style={{ paddingTop: 10 }}>
                    <Block center>
                        <Text style={{ padding: theme.sizes.base / 2 }}><Ionicons name="md-thermometer" size={32} color="#D3E2B0" /></Text>
                        <Text caption gray2>Temperatur</Text>
                        <Text h3>{room.temperature}°</Text>
                    </Block>
                    <Block center>
                        <Text style={{ padding: theme.sizes.base / 2 }}><Ionicons name="md-mic" size={32} color="#E88615" /></Text>
                        <Text caption gray2>Støjniveau</Text>
                        <Text h3>{room.decibel}db</Text>
                    </Block>
                    <Block center>
                        <Text style={{ padding: theme.sizes.base / 2 }}><Ionicons name="md-sunny" size={32} color="#5E82B6" /></Text>
                        <Text caption gray2>Lysstyrke</Text>
                        <Text h3>{room.lux}l</Text>
                    </Block>
                    <Block center>
                        <Text style={{ padding: theme.sizes.base / 2 }}><Ionicons name="md-people" size={32} color="#EF7575" /></Text>
                        <Text caption gray2>Personer</Text>
                        <Text h3>{room.occupants}</Text>
                    </Block>
                </Block>
            </Card>
        )
    }
    render() {
        const { navigation } = this.props;
        return (
            <ScrollView style={{ backgroundColor: theme.colors.gray4, padding: 0 }}>
                <Image
                    source={require('../assets/images/SDU.jpg')}
                    resizeMode="cover"
                    style={{ width, height: height / 3, overflow: 'visible', marginTop: 20 }}
                />
                <Block style={{ padding: theme.sizes.base, marginTop: -75 }}>
                    {this.renderRoom()}
                    {this.renderRoomDetails()}

                </Block>
                <TouchableOpacity onPress={this._showModal}>
                    <Text>Show Modal</Text>
                </TouchableOpacity>
                <Modal isVisible={this.state.isModalVisible} transparent={true}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 300,
                            height: 300
                        }}><Card><Text>HAHAHAHASHADHS</Text>
                            <TouchableOpacity onPress={this._hideModal}>
                                <Text>Hide Modal</Text>
                            </TouchableOpacity>
                            </Card>
                        </View>
                        </View>
        </Modal>
                    <Button gradient title={'Press to Send Notification'} onPress={() => this.sendPushNotification()} />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
                    container: {
                    flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
                    width: '100%',
        height: '100%',
    },
});

const mapStyle =
    [
                {
                    "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
                {
                    "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
                {
                    "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
                {
                    "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
                {
                    "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
                {
                    "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
                {
                    "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]