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

export default class UbahPassword extends Component {
  static contextType = RootContext;
  firebaseRef = database();
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      newPassword: '',
      profile_photo: '',
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
          const {email, profile_photo} = userData;
          this.setState((prevState) => ({
            email,
            profile_photo,
          }));
        }
      });
  };

  handleUpdatePassword = async () => {
    const {email, password, newPassword} = this.state;
    const {updatePassword} = this.context.auth;
    const {navigation} = this.props;

    const data = {
      email,
      password,
      newPassword,
    };

    updatePassword(email, password, newPassword, navigation);
    this.setState({password: '', newPassword: ''});
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Ubah Kata Sandi',
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
          <TouchableOpacity>
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
                placeholder="Kata Sandi Sebelumnya"
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                secureTextEntry
                ref={(input) => (this.password = input)}
                defaultValue={this.state.password}
                onChangeText={(value) => this.setState({password: value})}
              />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Kata Sandi Baru"
                placeholderTextColor="#ffffff"
                secureTextEntry
                ref={(input) => (this.newPassword = input)}
                defaultValue={this.state.newPassword}
                onChangeText={(value) => this.setState({newPassword: value})}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleUpdatePassword()}>
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
