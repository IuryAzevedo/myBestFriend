import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Add a pet for add a portion
            </Text>
            <Text style={styles.text
            }>Go to pet screen, add a pet and finally,
                go to portion screen for add a portion for your pet</Text>
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