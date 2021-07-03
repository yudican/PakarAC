import React, {Component} from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RootContext} from '../Navigation/Context';

class SignUpPending extends Component {
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
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, alignItems: 'center', marginTop: hp(5)}}>
          <Image
            source={require('../../Assets/Icon/pending.png')}
            style={{height: hp(15), width: hp(15), borderRadius: hp(7.5)}}
          />
          <Text
            style={{
              marginTop: hp(2),
              fontSize: hp(3),
              color: '#f39c12',
              fontWeight: 'bold',
            }}>
            Akun Sedang Ditinjau
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginHorizontal: wp(4),
              marginTop: hp(2),
              fontSize: hp(2),
            }}>
            Terima kasih telah mendaftar, Akun anda sedang dalam proses
            peninjauan.
          </Text>
        </View>

        <View style={{marginHorizontal: wp(3)}}>
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

export default SignUpPending;
