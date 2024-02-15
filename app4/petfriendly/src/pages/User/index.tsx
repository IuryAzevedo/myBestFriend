import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function User() {
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={require('../../assets/elipse2.png')} />
                <Text style={styles.text}>Profile</Text>
            </View>
            <View style={styles.card}>
                <Image style={styles.profileImg} source={require('../../assets/eu.jpeg')}/>
                <Text style={styles.textName}>Iury Azevedo</Text>
            </View>

            <View style={styles.card1}>
                <TouchableOpacity style={styles.cardButton}>
                    <AntDesign name="setting" size={24} color="black" style={styles.settings} />
                    <Text style={styles.textButton}>Settings</Text>
                    <AntDesign name="right" size={16} color="black" style={styles.vector}/>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.cardButton}>
                    <AntDesign name="edit" size={24} color="black" style={styles.edit}/>
                    <Text style={styles.textButton}>Edit Profile</Text>
                    <AntDesign name="right" size={16} color="black" style={styles.vector}/>
                </TouchableOpacity>
                <View style={styles.divider} />
                
                <TouchableOpacity style={styles.cardButton}>
                    <MaterialCommunityIcons name="logout-variant" size={24} color="black" style={styles.logout} />
                    <Text style={styles.textButton}>Logout</Text>
                    <AntDesign name="right" size={16} color="black" style={styles.vector}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fafafa',
        position: 'absolute',
        top: 60,
        left: 175,
    },
    banner: {
        width: 500,
        height: 200,
        marginTop: -280,
        borderRadius: 16,
        marginRight: -110,
    },
    card: {
        width: 280,
        height: 170,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: "#fcfafc",
        shadowColor: '#171717',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    profileImg: {
        backgroundColor: 'lightblue',
        borderRadius: 50,
        width: 100,
        height: 100,
        marginTop: -150
    },
    textName: {
        top: 50,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    card1: {
        top: 60,
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: "#fcfafc",
        shadowColor: '#171717',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        width: 280,
        height: 150,
    },
    divider: {
        width: '100%',
        borderColor: '#f1f1f1',
        borderWidth: 1
    },
    textButton: {
        fontSize: 16,
        marginLeft: 10,
    },
    cardButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 1,
        marginBottom: 20,
        paddingHorizontal: 20,
        width: '100%' ,
        top: 10,
    },
    vector: {     
        marginLeft: 'auto'
    },
    settings: {
        marginRight: 10
    },
    edit: {
        marginRight: 10
    },
    logout: {
        marginRight: 10
    }
});
