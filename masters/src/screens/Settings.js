import React, { Component } from 'react'
import { Button, Block, Text, Switch, Card } from '../components';
import { AsyncStorage, ActivityIndicator, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import firebase from 'firebase';
import { theme } from '../constants';


export default class Settings extends Component {
    state = {
        gender: 'Male',
        name: '',
        email: '',
        birthday: new Date('2020-06-12T14:42:42'),
        newsletter: true,
        notifications: true,
        editing: null,
        feedback: [],
        isLoading: false,
        show: false,
    }

    componentDidMount() {
        const currUser = firebase.auth().currentUser.uid;
        const email = firebase.auth().currentUser.email;

        firebase.database().ref('users/').child(currUser).once('value', (snapshot) => {
            try {
                this.setState({
                    gender: snapshot.val().gender,
                    organization: snapshot.val().organization,
                    name: snapshot.val().name,
                    birthday: new Date(snapshot.val().birthday),
                    email: email,
                    newsletter: snapshot.val().newsletter,
                    notifications: snapshot.val().notifications,
                    isLoading: false
                })
            } catch {
                console.warn("error")
            }
        });
    }
    saveSettings() {
        const currUser = firebase.auth().currentUser.uid;
        firebase.database().ref('users/').child(currUser).update({
            name: this.state.name,
            birthday: this.state.birthday,
            gender: this.state.gender,
            notifications: this.state.notifications,
            newsletter: this.state.newsletter,
        }).then((data) => {
            //success callback
        }).catch((error) => {
            //error callback
            console.warn('error ', error)
        })
    }
    handleEdit(text) {
        this.setState({ name: text });
    }
    renderEdit(value) {
        const { name, editing } = this.state;

        if (editing === value) {
            return (
                <TextInput
                    autoFocus={true}
                    defaultValue={name}
                    onChangeText={text => this.handleEdit(text)}
                    style={{ height: 25, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.colors.black, marginRight: 20 }}
                />
            )
        }

        return <Text style={{ height: 25 }}>{name}</Text>
    }
    toggleEdit(name) {
        const { editing } = this.state;
        this.setState({ editing: !editing ? name : null });
        if (editing == name) {
            const currUser = firebase.auth().currentUser.uid;
            firebase.database().ref('users/').child(currUser).update({
                name: this.state.name,
            }).then((data) => {
                //success callback
            }).catch((error) => {
                //error callback
                console.warn('error ', error)
            })
        }
    }
    _signOutAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.clear();
        firebase.auth().signOut();
        navigation.navigate('Welcome');
    }
    setDate = (event, date) => {
        date = date || this.state.birthday;

        this.setState({
            show: false,
            birthday: date,
        });
    }
    getDate() {
        return this.state.birthday.toDateString();
    }

    show = mode => {
        this.setState({
            show: true,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    render() {
        const { isLoading, organization, editing, gender, email, show } = this.state;
        return (
            <Block style={{
                flex: 1,
                justifyContent: 'center',
            }}>
                {isLoading ?
                    <Block middle><ActivityIndicator size={100} color={theme.colors.primary} /></Block> :
                    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.colors.gray4 }}>
                        <Block>
                            <Block middle>
                                <Block padding={theme.sizes.base * 2} style={{ backgroundColor: theme.colors.primary }}>
                                    <Image source={require('../assets/images/avatar.png')} style={styles.avatar}></Image>
                                </Block>
                                <Block style={{ padding: theme.sizes.base }}>
                                    <Text style={{ marginBottom: 10, marginTop: 10 }}>PROFIL</Text>
                                    <Card shadow>
                                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                            <Block>
                                                <Text gray2 style={{ marginBottom: 5 }}>Organisation</Text>
                                                <Text>{organization}</Text>
                                            </Block>
                                        </Block>

                                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                            <Block>
                                                <Text gray2 style={{ marginBottom: 5 }}>Email</Text>
                                                <Text>{email}</Text>
                                            </Block>
                                        </Block>

                                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                            <Block>
                                                <Text gray2 style={{ marginBottom: 5 }}>Navn</Text>
                                                {this.renderEdit('name')}
                                            </Block>
                                            <Text medium primary style={{ marginBottom: 5 }} onPress={() => this.toggleEdit('name')}>
                                                {editing === 'name' ? 'Gem' : 'Rediger'}
                                            </Text>
                                        </Block>

                                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                            <Block>
                                                <Text gray2 style={{ marginBottom: 5 }}>Fødselsdato</Text>
                                                {show && <DateTimePicker value={new Date()}
                                                    mode={'date'}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={this.setDate} />
                                                }
                                                <TouchableOpacity onPress={this.datepicker}>
                                                    <Text style={{ marginBottom: theme.sizes.base }}>{this.getDate()}</Text>
                                                </TouchableOpacity>
                                            </Block>
                                            <Text medium primary style={{ marginBottom: 15 }} onPress={this.datepicker}>
                                                {'Rediger'}
                                            </Text>
                                        </Block>

                                        <Block row style={{
                                            flexDirection: 'row',
                                            borderRadius: 14,
                                            borderWidth: 1,
                                            justifyContent: 'space-between',
                                            borderColor: theme.colors.primary
                                        }}>
                                            <TouchableOpacity id={'Mand'}
                                                style={[styles.button, styles.first, gender === 'Male' ? { backgroundColor: theme.colors.primary } : null]}
                                                onPress={() => this.setState({ gender: 'Male' })}
                                            >
                                                <Text style={[styles.buttonText, gender === 'Male' ? styles.activeText : null]}>Mand</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity id={'Kvinde'}
                                                style={[styles.button, styles.last, gender === 'Female' ? { backgroundColor: theme.colors.primary } : null]}
                                                onPress={() => this.setState({ gender: 'Female' })}
                                            >
                                                <Text style={[styles.buttonText, gender === 'Female' ? styles.activeText : null]}>Kvinde</Text>
                                            </TouchableOpacity>
                                        </Block>

                                    </Card>
                                    <Text style={{ marginBottom: 10, marginTop: 10 }}>KONTO</Text>
                                    <Card shadow>
                                        <Block row center space="between" style={{ marginBottom: theme.sizes.base }}>
                                            <Text gray2>Nyhedsbrev</Text>
                                            <Switch
                                                value={this.state.newsletter}
                                                onValueChange={value => this.setState({ newsletter: value })}
                                            />
                                        </Block>
                                        <Block row center space="between" style={{ marginBottom: theme.sizes.base }}>
                                            <Text gray2>Notifikationer</Text>
                                            <Switch
                                                value={this.state.notifications}
                                                onValueChange={value => this.setState({ notifications: value })}
                                            />
                                        </Block>
                                    </Card>
                                    <Button gradient onPress={() => this.saveSettings()}>
                                        <Text bold white center>Gem Indstillinger</Text>
                                    </Button>

                                    <Button title="Actually, sign me out :)" onPress={this._signOutAsync}>
                                        <Text bold black center>Log Ud</Text>
                                    </Button>
                                </Block>
                            </Block>
                        </Block>
                    </ScrollView>
                }

            </Block>
        )
    }
}
const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1
    },
    activeText: {
        color: '#FFF'
    },
    avatar: {
        alignSelf: 'center',
        marginTop: 10,
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#fff"
    },
    first: {
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13,
    },

    last: {
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
    },
    button: {
        flex: 1,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
    inputs: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
    sliders: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: 'white',
        borderWidth: 3,
    },
    toggles: {
        paddingHorizontal: theme.sizes.base * 2,
    }
})  