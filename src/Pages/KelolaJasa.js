import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Header, Card, ListItem, Image} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import {RootContext} from '../Auth/Navigation/Context';
import {launchImageLibrary} from 'react-native-image-picker';
import {FlatList} from 'react-native';

const libraryOptions = {
  mediaType: 'photo',
  quality: 1,
};

export default class KelolaJasa extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);

    this.state = {
      spanduk: '',
      data_jasa: [],
    };
  }

  componentDidMount() {
    this.handleGetProfile();
    this.handleGetJasaLayanan();
  }

  handleGetProfile = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref('Pengguna/Penyedia_Jasa/' + uid)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const {spanduk} = snapshot.val();
          this.setState({
            spanduk,
          });
        }
      });
  };

  handleGetJasaLayanan = async () => {
    const {uid} = this.context.auth.user;
    const {data_jasa} = this.state;
    await this.firebaseRef
      .ref(`Pengguna/Penyedia_Jasa/${uid}/Data_Jasa`)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          this.setState({
            data_jasa: Object.values(snapshot.val()),
          });
        }
      });
  };

  handleSelectSpanduk = async (data) => {
    const {uid} = this.context.auth.user;
    const {uploadImage, updateSpanduk} = this.context.app;
    if (data.assets.length > 0) {
      const file = data.assets[0].uri;
      const fileName = data.assets[0].fileName;
      const url = await uploadImage(file, fileName, 'User/Spanduk');
      await updateSpanduk({spanduk: url}, uid);
    }
  };

  render() {
    const {spanduk, data_jasa = []} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Kelola Jasa',
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 17,
            },
          }}
          backgroundColor="#5D89F7"
          leftComponent={
            <TouchableOpacity
              onPress={() => navigation.navigate('Home', {screen: 'Profil'})}>
              <Ionicons name="arrow-back" color="#fff" size={20} />
            </TouchableOpacity>
          }
        />
        <ScrollView>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title>Foto Spanduk</Card.Title>
            <Card.Divider />
            <Image
              source={{
                uri: spanduk,
              }}
              style={{width: '100%', height: 200}}
            />
            <Card.Divider />
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                launchImageLibrary(libraryOptions, this.handleSelectSpanduk)
              }>
              <Text style={styles.buttonText}>Upload Foto</Text>
            </TouchableOpacity>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title>List Jasa</Card.Title>
            <Card.Divider />

            <FlatList
              data={data_jasa}
              renderItem={({item, index}) => (
                <TouchableOpacity key={index}>
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{item.namaJasa}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Subtitle>Rp. {item.hargaJasa}</ListItem.Subtitle>
                  </ListItem>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TambahJasa')}>
              <Text style={styles.buttonText}>Tambah Jasa</Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
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
});
