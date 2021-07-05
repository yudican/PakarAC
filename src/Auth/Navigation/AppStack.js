import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Test';
import Beranda2 from '../../Pages/Beranda2';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Pesanan from '../../Pages/Pesanan';
import ChatPages from '../../Pages/Chat';
import Profil from '../../Pages/Profil';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UbahProfil from '../../Pages/UbahProfil';
import KelolaJasa from '../../Pages/KelolaJasa';
import TambahJasa from '../../Pages/TambahJasa';
import ChatDetail from '../../Pages/ChatDetail';
import PesananDetail from '../../Pages/PesananDetail';
import BatalkanPesanan from '../../Pages/BatalkanPesanan';
import LaporanKeuangan from '../../Pages/LaporanKeuangan';
import PembayaranAdm from '../../Pages/PembayaranAdm';
import Notifikasi from '../../Pages/Notifikasi';
import Komplain from '../../Pages/Komplain';
import UbahPassword from '../../Pages/UpdatePassword';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabHome}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="UbahProfil"
        component={UbahProfil}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="KelolaJasa"
        component={KelolaJasa}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TambahJasa"
        component={TambahJasa}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="PesananDetail"
        component={PesananDetail}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="BatalkanPesanan"
        component={BatalkanPesanan}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="LaporanKeuangan"
        component={LaporanKeuangan}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="PembayaranAdm"
        component={PembayaranAdm}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Notifikasi"
        component={Notifikasi}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Komplain"
        component={Komplain}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="UbahPassword"
        component={UbahPassword}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

function TabHome() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#000"
      shifting={false}
      barStyle={{backgroundColor: '#5D89F7'}}>
      <Tab.Screen
        name="Home"
        component={Beranda2}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Pesanan"
        component={Pesanan}
        options={{
          tabBarLabel: 'Pesanan',
          tabBarIcon: ({color}) => <Icon name="list" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatPages}
        options={{
          tabBarLabel: 'Pesan',
          tabBarIcon: ({color}) => (
            <AntDesign name="message1" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({color}) => <Icon name="user" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppStack;
