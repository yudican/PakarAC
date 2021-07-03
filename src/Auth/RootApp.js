import React from 'react'
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Input from './pages/Input'
import BottomTab from '../../BottomTab'
import SignUpDetail from './pages/SignUpDetail'

const AppNavigator = createStackNavigator({
    Login:{
        screen: Login,
        navigationOptions : {
            headerShown : false
        }
    },
    SignUp:{
        screen:SignUp,
        navigationOptions : {
            headerShown : false
        }
    },
    SignUpDetail:{
        screen:SignUpDetail,
        navigationOptions : {
            headerShown : false
        }
    },
    Home : {
        screen : BottomTab,
            navigationOptions : {
            headerShown : false
        }
    },
    InputScreen : {
        screen : Input,
            navigationOptions : {
            headerShown : false
        }
    },

});

export default createAppContainer(AppNavigator);