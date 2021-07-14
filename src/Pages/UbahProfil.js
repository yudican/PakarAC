import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {Icon, Picker} from 'native-base';
import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Card, Header} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';

const libraryOptions = {
  mediaType: 'photo',
  quality: 1,
};

export default class UbahProfil extends Component {
  static contextType = RootContext;
  firebaseRef = database();
  constructor(props) {
    super(props);
    this.state = {
      nama: 'Asako Rakuda',
      alamat: 'Jl. Teuku Umar No.73',
      no_telp: '087770178512',
      provinsi: 'Sumatera Utara',
      kota: 'Medan',
      spanduk: '',
      profile_photo: '',
      provinsiList: [
        'Sumatera Utara',
        'Sumatera Selatan',
        'Sumatera Barat',
        'DKI Jakarta',
      ],
      kotaList: {
        SumateraUtara: [
          'Medan',
          'Pematang Siantar',
          'Tanjung Balai',
          'Tebing Tinggi',
          'Gunung Sitoli',
        ],
        SumateraSelatan: [
          'Kabupaten Banyuasin',
          'Kabupaten Empat Lawang',
          'Kota Palembang',
          'Kota Prabumulih',
        ],
        SumateraBarat: [
          'Bukit Tinggi',
          'Padang',
          'Padang Panjang',
          'Pariaman',
          'Payakumbuh',
          'Sawahlunto',
          'Solok',
        ],
        DKIJakarta: ['Kembang', 'Menteng', 'Kebayoran Baru', 'Cakung', 'Koja'],
      },
    };
  }

  componentDidMount() {
    this.handleGetProfile();
  }

  handleGetProfile = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref('Pengguna/Penyedia_Jasa/' + this.context.auth.user.uid)
      .on('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          const {
            nama,
            alamat,
            no_telp,
            provinsi,
            kota,
            spanduk,
            profile_photo,
          } = userData;
          this.setState((prevState) => ({
            ...prevState,
            nama,
            alamat,
            no_telp,
            provinsi,
            kota,
            spanduk,
            profile_photo,
          }));
        }
      });
  };

  handleOnChangeProvinsi(prov) {
    this.setState({
      provinsi: prov,
    });

    console.log(this.state.provinsi);
  }
  handleOnChangeKota(kota) {
    this.setState({
      kota: kota,
    });
    console.log(this.state.kota);
  }

  handleSelectProfile = async (data) => {
    const {uid} = this.context.auth.user;
    if (data.assets.length > 0) {
      const file = data.assets[0].uri;
      const url = await this.uploadImage(file, `${uid}.jpg`, 'User/Profile');
      this.setState({profile_photo: url});
    }
  };

  uploadImage = async (uri, fileName, path) => {
    const imageRef = storage().ref(`${path}/${fileName}`);
    await imageRef
      .putFile(uri.replace('file:///', 'file:/'), {
        contentType: 'image/jpg',
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
    const url = await imageRef.getDownloadURL().catch((error) => {
      throw error;
    });

    return url;
  };

  handleUpdateProfile = async () => {
    const {
      nama,
      alamat,
      no_telp,
      provinsi,
      kota,
      spanduk,
      profile_photo,
    } = this.state;
    const {uid} = this.context.auth.user;
    const {updateProfile} = this.context.app;

    const data = {
      nama,
      alamat,
      no_telp,
      provinsi,
      kota,
      spanduk,
      profile_photo,
    };

    updateProfile(data, uid, this.props.navigation);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Ubah Profil',
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
          // containerStyle={{borderBottomEndRadius:20,borderBottomStartRadius:20}}
        />

        <View style={{zIndex: -99}}>
          <Image
            source={{
              uri: this.state.spanduk,
            }}
            style={{width: wp(100), height: hp(25)}}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            top: hp(10),
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <TouchableOpacity
            onPress={() =>
              launchImageLibrary(libraryOptions, this.handleSelectProfile)
            }>
            <Avatar
              title="PA"
              titleStyle={{color: 'orange'}}
              source={{
                uri: this.state.profile_photo,
              }}
              size="large"
              rounded
              containerStyle={{
                marginTop: '5%',
                borderWidth: 0.1,
                backgroundColor: '#fff',
              }}
            />
          </TouchableOpacity>
        </View>
        <Card containerStyle={styles.cardContainer}>
          <ScrollView>
            <View style={styles.containersignup}>
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Nama"
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                ref={(input) => (this.nama = input)}
                onSubmitEditing={() => this.noTelp.focus()}
                defaultValue={this.state.nama}
                onChangeText={(value) => this.setState({nama: value})}
              />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="No Handphone"
                keyboardType="number-pad"
                placeholderTextColor="#ffffff"
                ref={(input) => (this.noTelp = input)}
                defaultValue={this.state.no_telp}
                onChangeText={(value) => this.setState({no_telp: value})}
              />

              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Alamat"
                placeholderTextColor="#ffffff"
                defaultValue={this.state.alamat}
              />
              <Text>Provinsi</Text>
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#bdc3c7',
                  overflow: 'hidden',
                  width: '95%',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  marginVertical: 10,
                  fontSize: 14,
                }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Pilih Provinsi"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  backgroundColor="rgba(0,0,0)"
                  style={{color: 'white', padding: 0}}
                  borderRadius={15}
                  selectedValue={this.state.provinsi}
                  onValueChange={this.handleOnChangeProvinsi.bind(this)}>
                  {this.state.provinsiList.map((data) => (
                    <Picker.Item label={data} value={data} />
                  ))}
                </Picker>
              </View>
              <Text>Kota</Text>
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#bdc3c7',
                  overflow: 'hidden',
                  width: '95%',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  marginVertical: 10,
                  fontSize: 14,
                }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Pilih Provinsi"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  backgroundColor="rgba(0,0,0)"
                  style={{color: 'white', padding: 0}}
                  borderRadius={15}
                  selectedValue={this.state.provinsi}
                  onValueChange={this.handleOnChangeKota.bind(this)}>
                  {this.state.provinsi == 'Sumatera Utara'
                    ? this.state.kotaList.SumateraUtara.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))
                    : this.state.provinsi == 'Sumatera Selatan'
                    ? this.state.kotaList.SumateraSelatan.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))
                    : this.state.provinsi == 'Sumatera Barat'
                    ? this.state.kotaList.SumateraBarat.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))
                    : this.state.kotaList.DKIJakarta.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))}
                </Picker>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleUpdateProfile()}>
                <Text style={styles.buttonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Card>
      </View>
    );
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303030',
    flex: 1,
    alignItems: 'center',
    // justifyContent :'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  loginButton: {
    color: '#5D89F7',
    fontSize: 16,
    fontWeight: '500',
  },
  containersignup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 12,
  },

  inputBox: {
    width: '95%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
    color: 'white',
    marginVertical: 10,
  },
  button: {
    width: '95%',
    backgroundColor: 'green',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  cardContainer: {
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
});
