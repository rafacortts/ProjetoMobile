import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from "./src/firebaseConnection"
import {useState, useEffect } from 'react';


export default function App() {
  const[email , setEmail] = useState("")
  const[senha , setSenha] = useState ("")
  const [usuario, setUsuario] = useState("")
  const[type, setType] = useState("Login")
  
async function logar (){

await firebase.auth().signInWithEmailAndPassword(email,senha).then((value) =>{
  alert("Bem vindo " + value.user.email)
  setUsuario(value.user.email)
})
.catch((error) =>{
  alert("Deu ruim")
  return;
})

}

  async function cadastrar(){
    await firebase.auth().createUserWithEmailAndPassword(email,senha).then((value) => {
  alert("Usuario Criado " + value.user.email)      
    })
   .catch((error) => {
     if(error.code=== 'auth/weak-password'){
       alert("Sua senha devara possuir pelo menos 6 caracteres")   
       return;
     }
     if(error.code=== 'auth/weak-email'){
      alert("email invalido")   
      return;
     }
     else {
      alert("Deu tudo errado!")   
      return;
     }    
   })
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
      onChangeText = {(texto) => setEmail(texto)}
      value = {email}
      placeholder = "Digite seu Email"
      />
      <TextInput style={styles.input}
      onChangeText = {(texto) => setSenha(texto)}
      value = {senha}
      placeholder = "Digite sua senha"
      />
      {type === 'login' ?(
        <Button
        title='Acessar'
        onPress={logar}
        />
      ): (
        <Button 
        title='cadastrar'
        onPress={cadastrar}
        />
      )}
  
      {type === 'login' ?(
        <Button
        title='Não tenho conta'
        onPress={() => setType ('cadastro')}
        />
      ): (
        <Button 
        title='já possuo conta'
        onPress={() => setType('login')}
        />
      )}
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap:20
  },
    input : {
      width:200,
      borderWidth:2,
      borderColor : 'black',
      borderRadius:50,
      padding: 5
    }
});