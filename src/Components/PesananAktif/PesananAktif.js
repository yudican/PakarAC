import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
//import IconPesananAktif from '../../Assets/Icon/AirConditioning.png';

const PesananAktif = ({title, status, date, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require('../../Assets/Icon/AirConditioning.png')}
        style={{width: 30, height: 30}}
      />
      <View style={styles.text}>
        <Text style={styles.title}>
          [{date}] {title}
        </Text>
        <Text style={styles.status(status)}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PesananAktif;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    marginVertical: windowHeight * 0.01,
    alignItems: 'center',
  },
  text: {
    marginLeft: windowWidth * 0.02,
  },
  title: {
    fontSize: 15,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  status: (status) => ({
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Light',
    color:
      status === 'Sudah Selesai'
        ? '#55CB95'
        : status === 'Dalam Proses' || status === 'Belum Dikonfirmasi'
        ? '#F18F37'
        : 'red',
  }),
});
