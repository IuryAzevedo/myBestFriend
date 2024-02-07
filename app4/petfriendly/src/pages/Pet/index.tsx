import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Image } from "react-native";
import { TextInput, } from "react-native-gesture-handler";
import DatePicker from 'react-native-date-picker'

export default function Pet() {

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState<Date>(new Date());
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState('');
    const [open, setOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dismissKeyboard = () => {
        Keyboard.dismiss()
    }
    const handleDateConfirm = (selectedDate: React.SetStateAction<Date>) => {
        setIdade(selectedDate);
        setShowDatePicker(false);
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Text style={styles.text}>Name</Text>
                <TextInput placeholder="name" style={styles.input}
                    value={nome} autoCapitalize='none'
                    onChangeText={(nome) => setNome(nome)} />
                {/* <Text style={styles.text}>Age</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text>Enter your pet's age</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DatePicker
                        mode="date"
                        date={idade}
                        onDateChange={handleDateConfirm}
                    />
                )} */}
                <Text style={styles.text}>Type</Text>
                <TextInput placeholder="type" style={styles.input}
                    value={tipo} autoCapitalize='none'
                    onChangeText={(tipo) => setTipo(tipo)} />
                <Text style={styles.text}>Breed</Text>
                <TextInput placeholder="breed" style={styles.input}
                    value={raca} autoCapitalize='none'
                    onChangeText={(raca) => setRaca(raca)} />

                <View>
                    <TouchableOpacity style={styles.add}>
                        <Text style={{ color: "#fafafa" }}>Add pet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafafa",
        width: '100%',
        height: '100%'
    },
    input: {
        width: 297,
        height: 46,
        borderRadius: 8,
        backgroundColor: "#D9D9D9",
        padding: 8,
        marginBottom: 10,
    },
    text: {
        marginRight: 250,
        fontSize: 16
    },
    add: {
        backgroundColor: "#7648D4",
        color: "#fafafa",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        width: 297,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
    }
})