import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Header, Image} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  textInputContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginTop: 20,
  },
  button: {
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 25,
    marginVertical: 15,
    paddingVertical: 13,
  },
  button2: {
    width: '100%',
    backgroundColor: '#f57327',
    borderRadius: 25,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});

const libraryOptions = {
  mediaType: 'photo',
  quality: 1,
  includeBase64: true,
};

export default class PembayaranAdm extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);

    this.state = {
      data_pembayaran: '',
    };
  }

  componentDidMount() {
    this.handleGetPembayaran();
  }

  handleGetPembayaran = async () => {
    const {uid} = this.context.auth.user;
    const bulan = `${new Date().getMonth()}-${new Date().getFullYear()}`;
    await this.firebaseRef
      .ref(`Pengguna/Penyedia_Jasa/${uid}/Pembayaran/${bulan}`)
      .on('value', (snapshot) => {
        const pembayaran = snapshot.val();
        if (pembayaran) {
          if (pembayaran !== 'Ditolak') {
            ToastAndroid.showWithGravityAndOffset(
              'Kamu sudah melakukan pembayaran',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
            this.props.navigation.replace('Home', {screen: 'Profil'});
          }
        }
      });
  };

  handleImagePaymentSelected = async (data) => {
    const {uploadImage} = this.context.app;
    if (data.assets.length > 0) {
      const file = data.assets[0].uri;
      const fileName = data.assets[0].fileName;
      this.setState({data_pembayaran: file});
      const url = await uploadImage(file, fileName, 'User/Pembayaran');
      this.setState({data_pembayaran: url});
    }
  };

  handleSubmit = async () => {
    const {data_pembayaran} = this.state;
    const {uid} = this.context.auth.user;
    const {sendPaymentAdmin, addOwnNotification} = this.context.app;

    const bulan = `${new Date().getMonth()}-${new Date().getFullYear()}`;
    const notificationData = {
      title: `Pembayaran admin untuk bulan ${bulan} sedang diverifikasi`,
      waktu: new Date().getTime(),
      uid_penyedia: uid,
      nama: 'Administrator',
      isRead: false,
    };

    addOwnNotification(notificationData, uid);
    sendPaymentAdmin(
      {uid, data_pembayaran, status: 'Sedang Diverifikasi', bulan},
      uid,
      bulan,
      this.props.navigation,
    );
  };
  render() {
    const {data_pembayaran} = this.state;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Pembayaran',
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 17,
            },
          }}
          backgroundColor="#5D89F7"
          leftComponent={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="arrow-back" color="#fff" size={20} />
            </TouchableOpacity>
          }
        />
        <ScrollView>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title>Upload Bukti Pembayaran</Card.Title>
            <Card.Divider></Card.Divider>
            <Image
              source={{
                uri:
                  data_pembayaran ||
                  'https://1.bp.blogspot.com/-MOHGve9IHeQ/XHvEjRpgyhI/AAAAAAAAIyQ/06yF5OyDDHQEwAqbc9SnzW7Sq0rx_RMdwCLcBGAs/s1600/IMG_20181120_064248_565.jpg',
              }}
              style={{width: '100%', height: 200}}
            />
            <Card.Divider></Card.Divider>
            <TouchableOpacity
              style={styles.button2}
              onPress={() =>
                launchImageLibrary(
                  libraryOptions,
                  this.handleImagePaymentSelected,
                )
              }>
              <Text style={styles.buttonText}>Pilih Gambar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleSubmit()}>
              <Text style={styles.buttonText}>Posting</Text>
            </TouchableOpacity>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title>Info</Card.Title>
            <Card.Divider></Card.Divider>
            <Text style={{fontSize: 14, marginBottom: 15}}>
              Transfer ke nomor rekening dibawah ini :{' '}
            </Text>
            <Text style={{color: 'rgba(0,0,0,0.7)'}}>BCA : 0540820198</Text>
            <Text style={{color: 'rgba(0,0,0,0.7)'}}>
              Maybank : 10039475739
            </Text>
            <Text style={{marginBottom: 15, color: 'rgba(0,0,0,0.7)'}}>
              BNI : 01923848391
            </Text>
            <Card.Divider></Card.Divider>
            <Text style={{color: 'rgba(0,0,0,0.5)'}}>
              Status pembayaran akan diperbaharui dalam waktu maksimal 1x24 jam.
              Apabila ketika sudah membayar namun status pembayaran belum
              diperbaharui, mohon hubungi admin melalui email :
            </Text>
            <Text>tukangac.app@gmail.com</Text>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
