/**
 * @format
 */

import 'react-native-gesture-handler'
// import RootApp from './src/Auth/RootApp'
// import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
// import Splash from './src/Splash/Splash';
import {name as appName} from './app.json';
// import BottomTab from './BottomTab'
// import {Beranda2} from './src/Pages/Beranda2'
// import MapComponent from './src/Components/Maps/MapsComponent'
// import SignUpDetail from './src/Auth/pages/SignUpDetail'
// import UbahProfil from './src/Pages/UbahProfil'
// import Notifikasi from './src/Pages/Notifikasi'
// import Cart from './src/Pages/Cart'
// import Favorite from './src/Pages/Favorite'
// import ListJasaTerdekat from './src/Pages/ListJasaTerdekat'
// import ListJasaRekomendasi from './src/Pages/ListJasaRekomendasi'
// import TokoDetail from './src/Pages/TokoDetail'
// import PesananLangsung from './src/Pages/PesananLangsung'
// import PesananDetail from './src/Pages/PesananDetail'
// import ChatDetail from './src/Pages/ChatDetail'
// import PembatalanPesanan from './src/Pages/BatalkanPesanan'
// import TulisUlasan from './src/Pages/TulisUlasan'
// import Komplain from './src/Pages/Komplain'
// import KelolaJasa from './src/Pages/KelolaJasa'
// import KelolaListJasa from './src/Pages/KelolaListjasa'
// import PembayaranAdm from './src/Pages/PembayaranAdm'
// import LaporanKeuangan from './src/Pages/LaporanKeuangan'
// import CobaDatePicker from './src/Pages/CobaDatePicker'
// import BatalkanPesanan from './src/Pages/BatalkanPesanan';
// import TambahJasa from './src/Pages/TambahJasa'
import Login from './src/Auth/pages/Login'


// class Main extends Component{
//     constructor(){
//         super();
//         this.state = {currentScreen: 'Splash'};        
//         console.log('Done 3 seconds')
//         setTimeout(()=>{
//             console.log('Done 3 seconds')
//             this.setState({currentScreen: 'Login'})
//         },3000) 
//     }
//     render(){
//         const {currentScreen} = this.state
//         let mainScreen = currentScreen === 'Splash' ? <Splash/> : <App/>
//         return mainScreen
//     }
// }

AppRegistry.registerComponent(appName, () => App); 

// AppRegistry.registerComponent(appName, () => RootApp);
