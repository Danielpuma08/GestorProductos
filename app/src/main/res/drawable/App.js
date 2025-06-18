import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import {
  crearTablaProducto,
  insertarProducto,
  obtenerProductos,
} from './productoDao';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    crearTablaProducto();
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    obtenerProductos(data => setProductos(data));
  };

  const guardar = () => {
    if (!nombre || !precio) return;
    insertarProducto(nombre, parseFloat(precio), (ok) => {
      if (ok) {
        setNombre('');
        setPrecio('');
        cargarProductos();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestor de Productos</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Precio" value={precio} onChangeText={setPrecio} style={styles.input} keyboardType="decimal-pad" />
      <Button title="Guardar" onPress={guardar} />
      <Text style={styles.subtitle}>Listado:</Text>
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.nombre} - ${item.precio.toFixed(2)}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 20, marginBottom: 10 },
  subtitle: { marginTop: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
});
