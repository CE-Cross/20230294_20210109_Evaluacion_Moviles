import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { database } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Componente Add para agregar un nuevo producto
const Add = ({ navigation }) => {
    // Estado inicial del producto
    const [producto, setProducto] = useState({
        nombre: '',
        precio: 0,
        vendido: false,
        creado: new Date(),
    });

    // Función para navegar a la pantalla de inicio
    const goToHome = () => {
        navigation.goBack();
    };


    // Función para agregar el producto a Firestore
    const agregarProducto = async () => {
        try {

            await addDoc(collection(database, 'productos'), {...producto});
            console.log('Se guardó la colección');

            Alert.alert('Producto agregado', 'El producto se agregó correctamente', [
                { text: 'Ok', onPress: goToHome },
            ]);
        } catch (error) {
            console.error('Error al agregar el producto', error);
            Alert.alert('Error', 'Ocurrió un error al agregar el producto. Por favor, intenta nuevamente.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps='handled'
            >
                <Text style={styles.title}>Agregar producto</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setProducto({ ...producto, nombre: text })}
                        value={producto.nombre}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Precio:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setProducto({ ...producto, precio: parseFloat(text) })}
                        value={producto.precio}
                        keyboardType='numeric'
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={agregarProducto}>
                    <Text style={styles.buttonText}>Agregar producto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={goToHome}>
                    <Text style={styles.buttonText}>Volver a home</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};