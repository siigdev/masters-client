import React, { Component } from 'react'
import { Button, Block, Text, Card } from '../components';
import { AsyncStorage, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../constants';
import firebase from 'firebase';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default class Main extends Component {
    state = {
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
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }
    };

    componentDidMount() {
        this.getNewRoom()
    }
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
                    decibel: snapshot.val().Decibel,
                    lux: snapshot.val().Lux,
                    occupants: snapshot.val().Occupants,
                    temperature: snapshot.val().Temperature,
                    isBooked: snapshot.val().isBooked,
                    isTempBooked: snapshot.val().isTempBooked,
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
                            onRegionChange={this._handleMapRegionChange} style={styles.mapStyle} />
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
                        <Text caption gray2>Lydstyrke</Text>
                        <Text h3>{room.lux}</Text>
                    </Block>
                    <Block center>
                        <Text style={{ padding: theme.sizes.base / 2 }}><Ionicons name="md-sunny" size={32} color="#5E82B6" /></Text>
                        <Text caption gray2>Støvniveau</Text>
                        <Text h3>{room.decibel}db</Text>
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