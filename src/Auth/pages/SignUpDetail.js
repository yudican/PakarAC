import storage from '@react-native-firebase/storage';
import {Icon, Picker} from 'native-base';
import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Card, Image} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import {RootContext} from '../Navigation/Context';
import database from '@react-native-firebase/database';

const libraryOptions = {
  mediaType: 'photo',
  quality: 1,
  includeBase64: true,
};

export default class SignupDetail extends Component {
  static contextType = RootContext;
  firebaseRef = database();
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        nama: '',
        profile_photo: '',
        merk: '',
        alamat: '',
        no_telp: '',
        provinsi: 'Sumatera Utara',
        kota: 'Medan',
        spanduk: '',
        ktp: '',
        status: 'checking',
      },
      file: {},
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
      keyKotaList: '',
    };
  }

  componentDidMount() {
    this.handleGetProfile();
  }

  handleGetProfile = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref('Pengguna/Penyedia_Jasa/' + uid)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const {nama, profile_photo} = snapshot.val();
          this.setState((prevState) => ({
            formData: {
              ...prevState.formData,
              profile_photo: profile_photo ? profile_photo : '',
              nama: nama ? nama : '',
            },
          }));
        }
      });
  };

  handleOnChangeProvinsi(prov) {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        provinsi: prov,
      },
    }));
  }
  handleOnChangeKota(kota) {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        kota,
      },
    }));
  }

  handleOnChangeText = (type, value) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [type]: value,
      },
    }));
  };

  handleSubmit = async () => {
    const {formData} = this.state;
    const {uid} = this.context.auth.user;
    const {registerDetail} = this.context.auth;

    registerDetail(formData, uid, this.props.navigation);
  };

  handleImageSpandukSelected = async (data) => {
    if (data.assets.length > 0) {
      const file = data.assets[0].uri;
      const fileName = data.assets[0].fileName;
      const url = await this.uploadImage(file, fileName, 'User/Spanduk');
      this.handleOnChangeText('spanduk', url);
    }
  };

  handleImageKtpSelected = async (data) => {
    if (data.assets.length > 0) {
      const file = data.assets[0].uri;
      const fileName = data.assets[0].fileName;
      const url = await this.uploadImage(file, fileName, 'User/KTP');
      this.handleOnChangeText('ktp', url);
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

  render() {
    const {
      nama,
      profile_photo,
      merk,
      alamat,
      no_telp,
      provinsi,
      kota,
      spanduk,
      ktp,
    } = this.state.formData;
    return (
      <View style={styles.container}>
        {/* <ImageBackground source={require('../../Assets/Image/BerandaImage.png')} style={styles.header}>
                </ImageBackground> */}

        <View style={{alignItems: 'stretch', padding: '5%'}}>
          <Text style={{color: 'white'}}>Selamat Datang</Text>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Lengkapi Profilmu
          </Text>
        </View>

        <Card containerStyle={styles.cardContainer}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity>
                <Avatar
                  title="PA"
                  titleStyle={{color: 'orange'}}
                  source={{
                    uri:
                      profile_photo ||
                      'https://i.pinimg.com/474x/1b/b0/df/1bb0df650864f1e700a9be54d6f98842.jpg',
                  }}
                  size="large"
                  rounded
                  containerStyle={{marginTop: '5%', borderWidth: 0.1}}
                />
              </TouchableOpacity>
            </View>
            {/* <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'TitilliumWeb-Regular'}}>Lengkapi Datamu</Text> */}
            <View style={styles.containersignup}>
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Nama"
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                ref={(input) => (this.nama = input)}
                onSubmitEditing={() => this.merk.focus()}
                defaultValue={nama}
                onChangeText={(value) => this.handleOnChangeText('nama', value)}
              />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Merk Dagang"
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                ref={(input) => (this.merk = input)}
                onSubmitEditing={() => this.noTelp.focus()}
                defaultValue={merk}
                onChangeText={(value) => this.handleOnChangeText('merk', value)}
              />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="No Handphone"
                keyboardType="number-pad"
                placeholderTextColor="#ffffff"
                ref={(input) => (this.noTelp = input)}
                defaultValue={no_telp}
                onChangeText={(value) =>
                  this.handleOnChangeText('no_telp', value)
                }
              />

              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Alamat"
                placeholderTextColor="#ffffff"
                defaultValue={alamat}
                onChangeText={(value) =>
                  this.handleOnChangeText('alamat', value)
                }
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
                  selectedValue={provinsi}
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
                  placeholder="Pilih Kota"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  backgroundColor="rgba(0,0,0)"
                  style={{color: 'white', padding: 0}}
                  borderRadius={15}
                  selectedValue={kota}
                  onValueChange={this.handleOnChangeKota.bind(this)}>
                  {provinsi == 'Sumatera Utara'
                    ? this.state.kotaList.SumateraUtara.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))
                    : provinsi == 'Sumatera Selatan'
                    ? this.state.kotaList.SumateraSelatan.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))
                    : provinsi == 'Sumatera Barat'
                    ? this.state.kotaList.SumateraBarat.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))
                    : this.state.kotaList.DKIJakarta.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))}
                </Picker>
              </View>
              <Card.Divider />
              <Image
                source={{
                  uri:
                    spanduk ||
                    'https://serviceacmedan.com/wp-content/uploads/2020/02/Tukang-Service-AC-Helvetia-Medan.jpg',
                }}
                style={{width: 300, height: 150}}
              />
              <TouchableOpacity
                style={styles.button2}
                onPress={() =>
                  launchImageLibrary(
                    libraryOptions,
                    this.handleImageSpandukSelected,
                  )
                }>
                <Text style={styles.buttonText}>Pilih Foto Spanduk</Text>
              </TouchableOpacity>
              <Card.Divider />
              <Image
                source={{
                  uri:
                    ktp ||
                    'https://cdn0-production-images-kly.akamaized.net/GRIhJrG_cyx3KhpBBcuD99KS7Vc=/1231x710/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2706098/original/064888300_1547705646-20190117-E-KTP-Warga-Binaan-7.jpg',
                }}
                style={{width: 300, height: 150}}
              />
              <TouchableOpacity
                style={styles.button2}
                onPress={() =>
                  launchImageLibrary(
                    libraryOptions,
                    this.handleImageKtpSelected,
                  )
                }>
                <Text style={styles.buttonText}>Upload Foto Bersama KTP</Text>
              </TouchableOpacity>
              <Text style={{paddingHorizontal: 20, color: 'rgba(0,0,0,0.5)'}}>
                Info : Upload foto anda sedang memegang KTP anda dan KTP harus
                terlihat jelas di foto
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleSubmit()}>
                <Text style={styles.buttonText}>Daftar</Text>
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
    backgroundColor: '#5D89F7',
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
  button2: {
    width: '95%',
    backgroundColor: '#F18F37',
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
    height: '85%',
    backgroundColor: 'white',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  map: {
    height: 200,
  },
  mapContainer: {
    flex: 1,
    position: 'absolute',
  },
});
