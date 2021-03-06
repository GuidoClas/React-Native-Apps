import { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import AnimatedLogo from "./components/AnimatedLogo/AnimatedLogo";
import AnimatedSplash from 'react-native-animated-splash-screen';
import Toast from "react-native-toast-message";
import UserContext from "./context/context";
import Things from "./components/Home/Tabs/Things";
import Camera from "./components/Camera/Camera";
import MyPictures from "./components/MyPictures/MyPictures";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoaded, setIsloaded] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setTimeout(() => {
      setIsloaded(true);
    }, 4000);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      backgroundColor={"#fff"}
      customComponent={<AnimatedLogo />}
    >
      <UserContext.Provider value={{ email, setEmail, user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
                title: "PICloud",
                headerStyle: {
                  backgroundColor: "#e09e31",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontFamily: 'monospace'
                }
              }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Things"
              component={Things}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Camera"
              component={Camera}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              
              name="MyPictures"
              component={MyPictures}
            />
          </Stack.Navigator>
          <Toast/>
        </NavigationContainer>
      </UserContext.Provider>
    </AnimatedSplash>
  );
};