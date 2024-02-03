import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function User() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                User
            </Text>
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
        alignItems: 'center'
     }
})