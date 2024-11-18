import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { info } from '../Data/Dados';

function Card({ elemento }) {
  const [showDetails, setShowDetails] = useState(false); 

  const toggleDetails = () => {
    setShowDetails(!showDetails); 
  };

  return (
      <View style={styles.card}>
        <Text style={styles.pCard}>Grupo: {elemento.nome}</Text>
        
        <TouchableOpacity onPress={toggleDetails}>
          <Text style={styles.toggleText}>{showDetails ? 'Ver Menos' : 'Ver Mais'}</Text>
        </TouchableOpacity>

        {showDetails && (
          <>
            <Text style={styles.pCard}>Descrição: {elemento.descricao}</Text>
            <Text style={styles.pCard}>Integrantes: {elemento.integrantes.join(', ')}</Text>
          </>
        )}
      </View>
  );
}

export default function Main({ navigation }) {
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.p}>Olá, confira os projetos para o InovaWeek 2024!</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {info.map((x, index) => (
            <Card key={index} elemento={x} />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#271811',
  },

  card: {
    width: 250,
    borderRadius: 10,
    backgroundColor: '#FFDECE',
    marginTop: 10,
    padding: 15,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  
  pCard: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },

  toggleText: {
    color: '#ff5600',
    fontSize: 12,
    fontWeight: 'bold',
    margin: 5,
  },

  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    height:'90%',
    borderRadius: 20,
  },

  button: {
    backgroundColor: '#ff5600',
    marginTop: 30,
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  p: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 20,
    padding: 10,
    textAlign: 'center',
  },

  scrollView: {
    height: 1, // GAMBIARRA
    padding: 1, // GAMBIARRA pt2
    alignItems: 'center',
    marginBottom: 20,
  },
});
