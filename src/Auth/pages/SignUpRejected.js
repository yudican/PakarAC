import React, {Component} from 'react';
import {Image, View, Text, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RootContext} from '../Navigation/Context';

class SignUpRejected extends Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    const {navigation} = this.props;
    const {logout} = this.context.auth;
    logout();
    navigation.replace('Login');
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{alignItems: 'center', marginTop: hp(5)}}>
          <Image
            source={require('../../Assets/Icon/rejected.png')}
            style={{height: hp(15), width: hp(15), borderRadius: hp(7.5)}}
          />
          <Text
            style={{
              marginTop: hp(2),
              fontSize: hp(3),
              color: '#c0392b',
              fontWeight: 'bold',
            }}>
            Akun Ditolak
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginHorizontal: wp(4),
              marginTop: hp(2),
              fontSize: hp(2),
            }}>
            Mohon maaf pendaftaran akun penyedia jasa anda belum disetujui. anda
            dapat melakukan pendaftaran ulang dengan email yang sama.
          </Text>
        </View>
        <View style={{flex: 1, marginTop: hp(4), marginHorizontal: wp(3)}}>
          <Text
            style={{textAlign: 'left', fontSize: hp(2.2), fontWeight: 'bold'}}>
            Alasan Ditolak:
          </Text>
          <Text>
            Mohon maaf pendaftaran akun penyedia jasa anda belum disetujui. anda
            dapat melakukan pendaftaran ulang dengan email yang sama. Mohon maaf
            pendaftaran akun penyedia jasa anda belum disetujui. anda dapat
            melakukan pendaftaran ulang dengan email yang sama.
          </Text>
        </View>
        <View style={{marginHorizontal: wp(3)}}>
          <Button
            fillColor={'#2980b9'}
            label={'Pengajuan Ulang'}
            onPress={() => navigation.replace('Signupdetail')}
          />
          <Button
            fillColor={'#c0392b'}
            label={'Logout'}
            onPress={() => this.handleLogout()}
          />
        </View>
      </View>
    );
  }
}

const Button = ({label, fillColor, onPress}) => {
  return (
    <TouchableHighlight underlayColor={'#fff'} onPress={onPress}>
      <View style={{marginHorizontal: wp(3)}}>
        <View
          style={{
            backgroundColor: fillColor,
            paddingVertical: hp(1.5),
            marginBottom: hp(2),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: hp(1),
          }}>
          <Text style={{color: '#fff', fontSize: hp(2)}}>{label}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SignUpRejected;
