import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Header, Card, ListItem, Avatar, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import {RootContext} from '../Auth/Navigation/Context';

export default class Profil extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      no_telp: '',
      profile_photo: '',
      alamat: '',
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
          const {merk, no_telp, profile_photo, alamat} = snapshot.val();
          this.setState({
            no_telp,
            profile_photo,
            alamat,
            merk,
          });
        }
      });
  };

  render() {
    const {navigation} = this.props;
    const {no_telp, profile_photo, alamat, merk} = this.state;
    const {logout} = this.context.auth;
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: 'Profil',
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 17,
            },
          }}
          backgroundColor="#5D89F7"
          rightComponent={
            <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
              <Ionicons name="notifications" color="#fff" size={20} />
            </TouchableOpacity>
          }
          // containerStyle={{borderBottomEndRadius:20,borderBottomStartRadius:20}}
        />
        <ScrollView>
          <View style={styles.container}>
            <Card containerStyle={styles.cardContainer}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity>
                  <Avatar
                    title="PA"
                    titleStyle={{color: 'orange'}}
                    source={{
                      uri: profile_photo,
                    }}
                    size="large"
                    rounded
                    containerStyle={{marginTop: '5%', borderWidth: 0.1}}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: '7%',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'rgba(0,0,0,0.75)',
                  }}>
                  {merk}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 5,
                    fontSize: 12,
                    color: 'rgba(0,0,0,0.4)',
                  }}>
                  {no_telp}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 5,
                    fontSize: 12,
                    color: 'rgba(0,0,0,1)',
                  }}>
                  {alamat}
                </Text>
              </View>
            </Card>
            <Card
              containerStyle={{
                width: '95%',
                borderRadius: 10,
                shadowColor: '#000',
                elevation: 7,
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                shadowOffset: {width: 0, height: 3},
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('UbahProfil')}>
                <ListItem bottomDivider>
                  <Icon name="edit" type="antdesign" color="green" />
                  <ListItem.Content>
                    <ListItem.Title>Ubah Profil</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('KelolaJasa')}>
                <ListItem bottomDivider>
                  <Icon name="page-edit" type="foundation" color="#b434eb" />
                  <ListItem.Content>
                    <ListItem.Title>Kelola Jasa</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('LaporanKeuangan')}>
                <ListItem bottomDivider>
                  <Icon name="money-symbol" type="fontisto" color="orange" />
                  <ListItem.Content>
                    <ListItem.Title>Laporan Keuangan</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PembayaranAdm')}>
                <ListItem bottomDivider>
                  <Icon name="money" type="font-awesome" color="#ff6200" />
                  <ListItem.Content>
                    <ListItem.Title>Pembayaran Admin</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()}>
                <ListItem>
                  <Icon name="logout" type="antdesign" color="red" />
                  <ListItem.Content>
                    <ListItem.Title>Keluar Akun</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 10,
    width: '95%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
