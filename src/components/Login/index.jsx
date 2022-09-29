import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Button from '../Button';

import { database, auth } from '../../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const FORM_TYPES = { LOGIN: 'login', REGISTER: 'register' }

export default function Login({ setUser }) {

  const [formType, setFormType] = useState(FORM_TYPES.LOGIN)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => setUser(userCredential.user))
      .catch(error => console.log(error))
  }

  function handleRegister() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => setUser(userCredential.user))
      .catch(error => console.log(error))
  }

  function changeFormType() {
    if (formType === FORM_TYPES.LOGIN) {
      setFormType(FORM_TYPES.REGISTER)
    } else {
      setFormType(FORM_TYPES.LOGIN)
    }
  }

  return (
    <View>
      <TextInput
        placeholder='Email'
        style={styles.input}
        value={email}
        onChangeText={currentText => setEmail(currentText)}
      />

      <TextInput
        placeholder='Senha'
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={currentText => setPassword(currentText)}
      />

      <Button
        label={ (formType === FORM_TYPES.LOGIN) ? "Acessar" : 'Cadastrar' }
        textColor="#fff"
        backgroundColor={ (formType === FORM_TYPES.LOGIN) ? '#3EA6F2' : '#fb4d4d' }
        onPress={ (formType === FORM_TYPES.LOGIN) ? handleLogin : handleRegister }
      />

      <TouchableOpacity onPress={changeFormType}>
        <Text style={{ textAlign: 'center' }}>
          { (formType === FORM_TYPES.LOGIN) ? 'Criar uma conta' : 'Já possui uma conta? Entrar' }
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#BBB',
  },
});
