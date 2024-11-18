import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase';

export default function Register({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState(''); 
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!nomeCompleto || !email || !senha) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return;
    }
    if (!isValidEmail(email)) {
      setMessage('Por favor, insira um e-mail válido.');
      setMessageType('error');
      return;
    }

    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha
      })

      if (error) {
        setMessage('Erro ao registrar. Tente novamente.');
        console.error(insertError);
        return;
      }
      else if(data)
      {
        setMessage('Conta criada com sucesso!');
        Alert.alert('Sucesso', 'Conta criada com sucesso!'); 
        setMessageType('success');
        setTimeout(() => {
          navigation.navigate('Login'); 
        }, 2000); 
      }
      
    } catch (error) {
      console.error(error);
      setMessage('Erro inesperado. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.container2}>
        <Text style={styles.p1}>CRIANDO UMA CONTA!</Text>

        {message ? (
            <Text style={[styles.message, messageType === 'success' ? styles.success : styles.error]}>
              {message}
            </Text>
          ) : null}

        <TextInput
          label="Nome Completo"
          style={styles.textInput}
          value={nomeCompleto}
          onChangeText={setNomeCompleto} 
          theme={{ colors: { primary: '#ff5600' } }}
        />

        <TextInput
          label="Email"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail} 
          theme={{ colors: { primary: '#ff5600' } }}
        />

        <TextInput
          label="Senha"
          style={styles.textInput}
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha} 
          theme={{ colors: { primary: '#ff5600' } }}
        />

        <View style={styles.container3}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.cancelar}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#271811',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '70%',
    height:'60%',
    borderRadius: 20,
  },

  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 20,
  },
  
  p1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#271811',
    marginBottom: 25,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '80%',
    height: 50,
    fontSize: 15,
  },
  cancelar: {
    color: '#ff5600',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#ff5600',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    marginBottom: 15,
    fontSize: 12,
    textAlign: 'center',
  },
  error: {
    color: '#ff5600',
  },
  success: {
    color: '#00FF35',
  },
});
