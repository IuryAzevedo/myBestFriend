import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Portion() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Portion
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