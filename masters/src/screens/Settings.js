import React, { Component } from 'react'
import { Button, Block, Text, Divider, Switch, Card } from '../components';
import { AsyncStorage, ActivityIndicator, Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'
import firebase from 'firebase';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

export default class Settings extends Component {
    state = {
        gender: 'Male',
        name: '',
        weight: 75,
        height: 180,
        email: '',
        newsletter: true,
        notifications: true,
        profile: { name: 'Sebastian' },
        editing: null,
        errors: [],
        isLoading: false,
    }

    _signOutAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.clear();
        firebase.auth().signOut();
        navigation.navigate('Welcome');
    }
    render() {
        const { isLoading, editing, gender, email } = this.state;
        return (
            <Block style={{
                flex: 1,
                justifyContent: 'center',
            }}>
                {isLoading ?
                    <Block middle><ActivityIndicator size={100} color={theme.colors.primary} /></Block> :
                    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.colors.gray4}}>
                        <Block>
                            <Block middle>
                                <Block padding={theme.sizes.base * 2} style={{ backgroundColor: theme.colors.primary }}>
                                    <Image source={require('../assets/images/avatar.png')} style={styles.avatar}></Image>
                                </Block>
<Block style={{ padding: theme.sizes.base }}>
                                    <Text style={{marginBottom: 10, marginTop: 10}}>PROFILE</Text>
                                <Card shadow>
                                    <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                        <Block>
                                            <Text gray2 style={{ marginBottom: 5 }}>Username</Text>
                                        </Block>
                                        <Text medium primary style={{ marginBottom: 5 }} onPress={() => this.toggleEdit('name')}>
                                            {editing === 'name' ? 'Save' : 'Edit'}
                                        </Text>
                                    </Block>


                                    <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                        <Block>
                                            <Text gray2 style={{ marginBottom: 5 }}>Firstname</Text>
                                        </Block>
                                        <Text medium primary style={{ marginBottom: 5 }} onPress={() => this.toggleEdit('name')}>
                                            {editing === 'name' ? 'Save' : 'Edit'}
                                        </Text>
                                    </Block>
                                    <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                        <Block>
                                            <Text gray2 style={{ marginBottom: 5 }}>Lastname</Text>
                                        </Block>
                                        <Text medium primary style={{ marginBottom: 5 }} onPress={() => this.toggleEdit('name')}>
                                            {editing === 'name' ? 'Save' : 'Edit'}
                                        </Text>
                                    </Block>
                                    <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                        <Block>
                                            <Text gray2 style={{ marginBottom: 5 }}>Email</Text>
                                            <Text style={{ marginBottom: theme.sizes.base }}>{email}</Text>
                                        </Block>
                                    </Block>
                                    <Text gray2 style={{ marginBottom: 5 }}>Birthday</Text>
                                    <DatePicker
                                        style={{ width: 200 }}
                                        date={this.state.date}
                                        mode="date"
                                        format="MMMM Do YYYY"
                                        minDate="2016-05-01"
                                        maxDate="2016-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start',
                                                borderWidth: 0,
                                                marginLeft: 0,
                                                paddingLeft: 0
                                            }
                                        }}
                                        onDateChange={(date) => { this.setState({ date: date }) }}
                                    />
                                    <Block row style={{
                                        flexDirection: 'row',
                                        borderRadius: 14,
                                        borderWidth: 1,
                                        justifyContent: 'space-between',
                                        borderColor: theme.colors.primary
                                    }}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.first, gender === 'Male' ? { backgroundColor: theme.colors.primary } : null]}
                                            onPress={() => this.setState({ gender: 'Male' })}
                                        >
                                            <Text style={[styles.buttonText, gender === 'Male' ? styles.activeText : null]}>Male</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.last, gender === 'Female' ? { backgroundColor: theme.colors.primary } : null]}
                                            onPress={() => this.setState({ gender: 'Female' })}
                                        >
                                            <Text style={[styles.buttonText, gender === 'Female' ? styles.activeText : null]}>Female</Text>
                                        </TouchableOpacity>
                                    </Block>

                                </Card>
                                <Text style={{marginBottom: 10, marginTop: 10}}>ACCOUNT</Text>
                                <Card shadow>
                                    <Block row center space="between" style={{ marginBottom: theme.sizes.base }}>
                                        <Text gray2>Newsletter</Text>
                                        <Switch
                                            value={this.state.newsletter}
                                            onValueChange={value => this.setState({ newsletter: value })}
                                        />
                                    </Block>
                                    <Block row center space="between" style={{ marginBottom: theme.sizes.base }}>
                                        <Text gray2>Notifications</Text>
                                        <Switch
                                            value={this.state.notifications}
                                            onValueChange={value => this.setState({ notifications: value })}
                                        />
                                    </Block>
                                </Card>
                                <Button gradient onPress={() => this.saveSettings()}>
                                    <Text bold white center>Save Settings</Text>
                                </Button>

                                <Button title="Actually, sign me out :)" onPress={this._signOutAsync}>
                                    <Text bold black center>Log Out</Text>
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