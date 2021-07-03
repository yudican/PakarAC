import React, { Component } from 'react';
import {StyleSheet, Text,View, Dimensions, TouchableOpacity} from 'react-native';
//import IconPesananAktif from '../../Assets/Icon/AirConditioning.png';

export default class TopPesanan extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.container}>
                {/* <IconPesananAktif /> */}
                <View style={styles.text}>
                <Text style={styles.title}>Pesanan No. 121100394</Text>
                <Text style={styles.status}>Sedang Diproses</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: windowHeight*0.02,
    alignItems: 'center'
  },
  text: {
    marginLeft: windowWidth*0.02,
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold'
  },
  status: {
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Light',
    color: 'black'
  }
});
