import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Image } from "react-native";
import { TextInput, } from "react-native-gesture-handler";
import DatePicker from 'react-native-date-picker'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import LottieView from "lottie-react-native";
export default function Pet() {

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState<number | undefined>(undefined);
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState('');
    // const [open, setOpen] = useState(false);
    // const [showDatePicker, setShowDatePicker] = useState(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss()
    }
    // const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    //     const currentDate = selectedDate || idade;
    //     setIdade(currentDate);
    //     setShowDatePicker(false);
    // }

    const handleIdadeChange = (idadeString: string) => {
        const idadeNumber = parseInt(idadeString);
        setIdade(isNaN(idadeNumber) ? undefined : idadeNumber);
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.lottieView}>
                    <LottieView
                        style={styles.lottie}
                        source={require("../../assets/petwalk.json")}
                        autoPlay
                        loop
                    />
                </View>
                <Text style={styles.text}>Name</Text>
                <TextInput placeholder="name" style={styles.input}
                    value={nome} autoCapitalize='none'
                    onChangeText={(nome) => setNome(nome)} />
                <Text style={styles.text2}>Age</Text>

                <TextInput
                    placeholder="Age"
                    keyboardType="numeric"
                    style={styles.input}
                    value={idade?.toString()}
                    autoCapitalize="none"
                    onChangeText={(idade) => handleIdadeChange(idade)}
                />
                {/* <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.text}>Age: {idade.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={idade}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
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
                        <Text style={{ color: "#fafafa", fontWeight: 'bold' }}>Add Pet</Text>
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <Text>Add your</Text>
                        <Text style={styles.texInfo}>Pet</Text>
                        <Text style={styles.texInfo2}>or</Text>
                        <Text style={styles.texInfo}>Pets</Text>
                        <Text style={styles.texInfo2}>:)</Text>
                    </View>
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
    text2: {
        marginRight: 260,
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
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 8,
        flexDirection: 'row',
    },
    texInfo: {
        color: '#7648D4',
        marginLeft: 3,

    },
    texInfo2: {
        marginLeft: 3,
        color: 'black'
    },
    lottieView: {
        justifyContent: "center",
        alignItems: "center",
    },
    lottie: {
        width: 150,
        height: 150,
    },
})