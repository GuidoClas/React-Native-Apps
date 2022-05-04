import { TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { styles } from "./styles";
import { auth } from '../../firebase';
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


const Home = () => {
  const user = (auth.currentUser?.email).split('@')[0];

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch((err : any) => {
      console.log(err.code);
      console.log(err.message);
    })
  }
  return (
    <View >
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.container}
      >
        <Image
        source={require('../../assets/logout.png')}
        style={styles.image}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Home;