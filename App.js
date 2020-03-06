import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import header from './assets/totalvoice.png';
import totalvoice from 'totalvoice-node';

const client = new totalvoice("Access-Token");
const options = {velocidade: 2, tipo_voz: "br-Vitoria"};

export default function App() {
  const [phone, setPhone] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSendTTS() {
    setLoading(true);
    client.tts.enviar(phone, message, options)
      .then(data => {
        Alert.alert(`TTS enviado com sucesso`);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert(`TTS não enviado`);
        setLoading(false);
      });
  }

  return (
    <>
      <View style={styles.header}>
        <Image source={header} style={styles.image} />
      </View>      
      <KeyboardAvoidingView 
        style={styles.containerContent}
        behavior={Platform.select({
          ios: 'padding',
          android: 'padding',
        })}
        enabled
      >        
        <Text style={styles.containerText}>Bem vindo ao teste de uso da lib de Node.js da Totalvoice utilizando React Native </Text>
        <View style={styles.containerInput}>
          <TextInput keyboardType='numeric' style={styles.textInput} placeholder='Digite o número' value={phone} onChangeText={setPhone} />
        </View>
        <View style={styles.containerInput}>
          <TextInput style={styles.textInput} placeholder='Digite a mensagem' value={message} onChangeText={setMessage} />
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => handleSendTTS()} style={styles.button} disabled={loading}>
            <Text style={styles.buttonText}>Enviar TTS</Text>
          </TouchableOpacity>
        </View>      
      </KeyboardAvoidingView>      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    width: '100%',
    height: 100,
    backgroundColor: '#7d1e78'
  },
  image: {
    width: 250,
    height: 80,
  },
  containerContent: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#231f20',
  },
  containerInput: {
    justifyContent: 'center',
    marginTop: 15,
    width: '100%',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#e6ebf1',
  },
  textInput: {
    paddingLeft: 10,
  },
  containerButton: {
    marginTop: 15,
    width: '100%',

    alignItems: 'center'
  },
  button: {
    marginHorizontal: 30,
    width: '100%',
    height: 50,
    backgroundColor: '#0096dc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

