import React from "react"
import {createAppContainer} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"
import {createBottomTabNavigator} from "react-navigation-tabs"
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import OctionsIcon from "react-native-vector-icons/Octicons"
import Beranda from './src/Pages/Beranda2'
import Pesanan from './src/Pages/Pesanan'
import Profil from './src/Pages/Profil'
// import Login from './src/Auth/pages/Login'
// import SignUp from './src/Auth/pages/Signup'
import { ScreenStackHeaderBackButtonImage } from "react-native-screens"
import Chat from './src/Pages/Chat'

// const AuthStack = createStackNavigator({
//     Login : {
//         screen : Login
//     },
//     SignUp : {
//         screen : Login
//     },
// })

const HomeStack = createStackNavigator({
    // Login : {
    //     screen : Login,
    //     navigationOptions:{
    //         headerShown : false
    //     },
    //     tabBarOptions : {
    //         tabBarVisible : false
    //     }
    // },
    // SignUp : {
    //     screen : SignUp,
    //     navigationOptions:{
    //         tabBarVisible : false,
    //         headerShown : false
    //     }
    // },
    Home : {
        screen : Beranda,
        navigationOptions:{
            headerShown : false
        },
    },
    Pesanan : {
        screen : Pesanan,
        navigationOptions:{
            headerShown : false
        },
    },
    Chat : {
        screen : Chat,
        navigationOptions:{
            headerShown : false
        }
    },
    Profil: {
        screen : Profil,
        navigationOptions:{
            headerShown : false
        },
    },
})

// HomeStack.navigationOptions = ({navigation}) => {
//     let tabBarVisible
//     if(navigation.state.routes.length>1){
//         navigation.state.routes.map(route=>{
//             if(route.routeName=="Login"||route.routeName=="SignUp")
//             {
//                 tabBarVisible = false
//             }
//             else{
//                 tabBarVisible = true;
//             }
//         })
//     }
//     return tabBarVisible
// }

const PesananStack = createStackNavigator({
    HotNews: {
        screen : Pesanan,
        navigationOptions:{
            headerShown : false
        },
    }
})
const ChatStack = createStackNavigator({
    Profil: {
        screen : Chat,
        navigationOptions:{
            headerShown : false
        },
    }
})
const ProfilStack = createStackNavigator({
    Profil: {
        screen : Profil,
        navigationOptions:{
            headerShown : false
        },
    }
})


const BottomTab = createBottomTabNavigator({
    HomeTab : {
        screen : HomeStack, navigationOptions : {
            tabBarLabel : 'Beranda',
            tabBarIcon : ({tintColor})=>(
                <OctionsIcon name="home" color={tintColor} size={25}/>
            )
        }
    },
    PesananTab : {
        screen : PesananStack, navigationOptions : {
            tabBarLabel : 'Pesanan',
            tabBarIcon : ({tintColor})=>(
                <OctionsIcon name="list-unordered" color={tintColor} size={25}/>
            ),
            // tabBarOptions : {
            //     activeTintColor: 'red',
            //     inactiveTintColor : '#a1aab8',
            //     style:{
            //         borderTopColor: '#fff',
            //         shadowColor: '#a1aab8',
            //         backgroundColor : 'black',
            //     },
            // }
        }
    },
    ChatTab : {
        screen : ChatStack, navigationOptions : {
            tabBarLabel : 'Pesan',
            tabBarIcon : ({tintColor})=>(
                <Fontisto name="hipchat" color={tintColor} size={25}/>
            ),
        }
    },
    ProfileTab : {
        screen : ProfilStack, navigationOptions: {
            tabBarLabel : 'Profil',
            tabBarIcon : ({tintColor})=>(
                <MaterialCommunityIcons name="account-outline" color={tintColor} size={25}/>
            )
        }
    },
}, {
    tabBarOptions : {
        activeTintColor:'#FFF',
        inactiveTintColor:'#101010',
        style:{
            borderTopColor: '#fff',
            shadowColor: '#a1aab8',
            backgroundColor : '#5D89F7',
            borderTopEndRadius:20,
            borderTopStartRadius:20,
        },
    },
})

export default createAppContainer(BottomTab)