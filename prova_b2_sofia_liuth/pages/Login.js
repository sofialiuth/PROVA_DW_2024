import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase';


export default function Login({ navigation }) {
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState(''); 
  

  const handleLogin = async () => {  
    setMessage('');
    setMessageType('');
    
    if (!email || !senha) {
      setMessage('Por favor, preencha todos os campos.'); 
      setMessageType('error'); 
      return; 
    }

    try 
    {
      
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
      })

      if (error) 
      {
        setMessage('E-mail ou senha incorretos.'); 
        setMessageType('error'); 
      } 
      else if (data) 
      {
        setMessage('Login realizado com sucesso!'); 
        setMessageType('success'); 
        
        setTimeout(() => 
        {
          navigation.navigate('Main'); 
        }, 2000);
      }
    } 
    catch (error) 
    {
      setMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.'); 
      setMessageType('error'); 
      console.error(error); 
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.container3}>
        <Text style={styles.p}>ÁREA DE LOGIN</Text>

       {message ? (
        <Text style={[styles.message, messageType === 'error' ? styles.error : styles.success]}>
          {message}
        </Text>
      ) : null}

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
        value={senha}
        secureTextEntry={true}
        onChangeText={setSenha}
        theme={{ colors: { primary: '#ff5600' } }}
      />

      
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.esqueceu}>criar conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
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

  container3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '70%',
    height:'60%',
    borderRadius: 20,
  },

  container2: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  p: {
    marginBottom: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#271811',
  },
  button: {
    backgroundColor: '#ff5600',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textInput: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '80%',
    height: 50,
    fontSize: 15,
  },
  esqueceu: {
    textAlign: 'center',
    color: '#ff5600',
    fontSize: 12,
    marginTop: 3,
    textDecorationLine: 'underline',
  },
  message: {
    marginBottom: 20,
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
