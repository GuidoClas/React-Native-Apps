import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  Dimensions
} from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./styles";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UserContext from "../../context/context";

const Login : React.FunctionComponent = () => {
  const { email, setEmail } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [successAtRegister, setSuccessAtRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSignUp = () => {
    Keyboard.dismiss();
    setLoading(true);
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials : any) => {
        setLoading(false);
        setSuccessAtRegister(true);
        console.log('User registered with: ', userCredentials.user.email);
    })
    .catch((err : any) => {
      setLoading(false);
      setError(true);
      setErrorMessage(handleRegisterErrorMessage(err.code));
      console.log(err.code);
      console.log(err.message);
    });
  };  

  const handleLogin = () => {
    setLoading(true);
    loguear(email, password);
  }

  const handleLoginAutom├ítico = (userPosition : Number) => {
    let username : string;
    let password : string;
    switch(userPosition)
    {
      case 1:
        username = "admin@admin.com";
        setEmail(username);
        password = "123456";
        setPassword(password);
      break;
      case 2:
        username = "usuario1@usuario1.com";
        setEmail(username);
        password = "222222";
        setPassword(password);
      break;
      case 3:
        username = "usuario2@usuario2.com";
        setEmail(username);
        password = "333333";
        setPassword(password);
      break;
      default:
        username = "admin@admin.com";
        setEmail(username);
        password = "123456";
        setPassword(password);
      break;
    }
    setLoading(true);
    loguear(username, password);
  }

  const loguear = (username : string, password : string) => {
    auth.
    signInWithEmailAndPassword(username, password)
    .then((userCredential : any) => {
      setLoading(false);
      console.log('User logged in with: ', userCredential.user.email);
      navigation.replace('Home');
    })
    .catch((err : any) => {
      setLoading(false);
      setError(true);
      setErrorMessage(handleLoginErrorMessage(err.code));
      console.log(err.code);
      console.log(err.message);
    });
  };

  const handleLoginErrorMessage = (code : String) => {
    switch (code) {
      case 'auth/user-disabled': {
          return 'Usuario deshabilitado';
      }
      case 'auth/invalid-email': {
          return 'Email inv├ílido';
      }
      case 'auth/user-not-found': {
        return 'No se encontr├│ un usuario con ├ęste mail';
      }
      case 'auth/wrong-password': {
        return 'Contrase├▒a incorrecta';
      }
      default: {
          return 'Contrase├▒a incorrecta';
      }
    }
  };

  const handleRegisterErrorMessage = (code : String) => {
    switch (code) {
      case 'auth/email-already-in-use': {
        return 'El email ya est├í en uso';
      }
      case 'auth/invalid-email': {
        return 'Email inv├ílido';
      }
      case 'auth/weak-password': {
        return 'Tu contrase├▒a es muy d├ębil';
      }
      default: {
        return "Contrase├▒a inv├ílida";
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      
      {loading && <View style={styles.spinnerContainer}>
        <ActivityIndicator style={styles.spinner} size={180} color="lightgrey" />
      </View>}
      <ImageBackground style={styles.imageBg} source={require('../../assets/LoginS.jpg')} >
        <View style={styles.inputContainer}>
          <Text style={styles.titleText}>PICloud</Text>
          <Image
                style={{ width: 100, height: 100 }}
                source={require("../../assets/gifplay.gif")}
              >
          </Image>
          
          <TextInput 
              placeholder="Email"
              placeholderTextColor="white"  
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)} 
          />
          <TextInput
            placeholder="Contrase├▒a"
            placeholderTextColor="white"
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)} 
            secureTextEntry
          />
          {error && <Text style={styles.error}>{errorMessage}</Text>}
          {successAtRegister && <Text style={styles.success}>Se registr├│ exitosamente!</Text>}
            
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
              onPress={handleLogin} 
              style={styles.button}
          > 
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          
        </View>
        
        <View style={styles.containerTouchable}>
            <TouchableOpacity
                onPress={() => handleLoginAutom├ítico(1) } 
                style={styles.buttonAux}
            > 
              <Text style={styles.buttonAuxText}>Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleLoginAutom├ítico(2) } 
              style={styles.buttonAux}
            > 
              <Text style={styles.buttonAuxText}>Usuario 1</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleLoginAutom├ítico(3) } 
                style={styles.buttonAux}
            > 
              <Text style={styles.buttonAuxText}>Usuario 2</Text>
            </TouchableOpacity>
        
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;
