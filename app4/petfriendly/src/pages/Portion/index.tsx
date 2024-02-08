import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput } from "react-native";
import LottieView from "lottie-react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
export default function Portion() {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState<number | undefined>(undefined);
    const [tipo, setTipo] = useState('');
    const [quantidade, setQuantidade] = useState<number | undefined>(undefined);
    const [dataRacao, setDataRacao] = useState<Date>(new Date())
    // const [open, setOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [openDrop, setOpenDrop] = useState(false);
    const [valueDrop, setValueDrop] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const dismissKeyboard = () => {
        Keyboard.dismiss()
    }
    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || dataRacao;
        setDataRacao(currentDate);
        setShowDatePicker(false);
    }
    const handlePrecoChange = (precoString: string) => {
        const precoNumber = parseInt(precoString);
        setPreco(isNaN(precoNumber) ? undefined : precoNumber);
    }
    const handleQuantidadeChange = (quantidadeString: string) => {
        const quantidadeNumber = parseInt(quantidadeString);
        setQuantidade(isNaN(quantidadeNumber) ? undefined : quantidadeNumber);
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

                <View style={styles.viewPickers}>
                    <Text style={styles.text2}>Date of buy</Text>
                    <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.text4}>Date: {dataRacao.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dataRacao}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <DropDownPicker
                        style={styles.dropDowPicker}
                        open={openDrop}
                        value={valueDrop}
                        items={items}
                        setOpen={setOpenDrop}
                        setValue={setValueDrop}
                        setItems={setItems}
                    />
                </View>
                <Text style={styles.text}>Name</Text>
                <TextInput placeholder="name" style={styles.input}
                    value={nome} autoCapitalize='none'
                    onChangeText={(nome) => setNome(nome)} />
                <Text style={styles.text3}>Type of Portion</Text>
                <TextInput placeholder="type of portion" style={styles.input}
                    value={tipo} autoCapitalize='none'
                    onChangeText={(tipo) => setTipo(tipo)} />
                <Text style={styles.text5}>Quantity</Text>
                <TextInput placeholder="quantity" style={styles.input}
                    keyboardType="numeric"
                    value={quantidade?.toString()} autoCapitalize='none'
                    onChangeText={(quantidade) => handleQuantidadeChange(quantidade)} />
                <Text style={styles.text}>Price</Text>
                <TextInput placeholder="price" style={styles.input}
                    keyboardType="numeric"
                    value={preco?.toString()} autoCapitalize='none'
                    onChangeText={(preco) => handlePrecoChange(preco)} />
                <View>
                    <TouchableOpacity style={styles.add}>
                        <Text style={{ color: "#fafafa", fontWeight: 'bold' }}>Add Portion</Text>
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <Text>Add</Text>
                        <Text style={styles.texInfo}>Portion</Text>
                        <Text style={styles.texInfo2}>for your</Text>
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
        height: '100%',
        top: 20
    },
    viewPickers: {
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 1,
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
    text3:{
        marginRight: 190,
        fontSize: 16
    },
    text4: {
        marginRight: 20,
        fontSize: 14,
        padding: 5
    },
    text5: {
        marginRight: 240,
        fontSize: 16,
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
    datePicker: {
        height: 46,
        width: 100,
        backgroundColor: '#D9D9D9',
        marginRight: 5,
        borderRadius: 8,
        left: 235,
    },
    dropDowPicker: {
        height: 46,
        width: 100,
        backgroundColor: '#D9D9D9',
        marginRight: 5,
        borderRadius: 8,
        left: 20,
    }
})