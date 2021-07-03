import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../pages/Signup';
import LoginScreen from '../pages/Login';
import SignUpDetailScreen from '../pages/SignUpDetail';
import HomeScreen from './Test';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpRejected from '../pages/SignUpRejected';
import SignUpPending from '../pages/SignupPending';
import ForgotPassword from '../pages/ForgotPassword';
// import { GoogleSignin } from '@react-native-community/google-signin';

const Stack = createStackNavigator();

const AuthStack = ({initialRouteName = 'Login'}) => {
  // const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  // let routeName;

  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then((value) => {
  //     if (value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   }); // Add some error handling, also you can simply do setIsFirstLaunch(null)

  //   // GoogleSignin.configure({
  //   //   webClientId: 'YOUR_APP_WEB_CLIENT_ID',
  //   // });

  // }, []);

  // if (isFirstLaunch === null) {
  //   return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  // } else if (isFirstLaunch == true) {
  //   routeName = 'Login';
  // } else {
  //   routeName = 'Login';
  // }

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signupdetail"
        component={SignUpDetailScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SignUpRejected"
        component={SignUpRejected}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SignUpPending"
        component={SignUpPending}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
