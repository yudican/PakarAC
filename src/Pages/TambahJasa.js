import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';

export default class TambahJasa extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      namaJasa: '',
      hargaJasa: '',
    };
  }

  handleSave = async () => {
    const {uid} = this.context.auth.user;
    const {tambahJasa} = this.context.app;
    const {namaJasa, hargaJasa} = this.state;

    const data = {
      namaJasa,
      hargaJasa,
      uid_penyedia_jasa: uid,
    };

    await tambahJasa(data, uid, this.props.navigation);
  };

  onHandleChangeText = (type, value) => {
    this.setState((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Tambah Jasa',
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 17,
            },
          }}
          backgroundColor="#5D89F7"
          leftComponent={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" color="#fff" size={20} />
            </TouchableOpacity>
          }
        />
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Tambah Jasa</Card.Title>
          <Card.Divider></Card.Divider>
          <TextInput
            placeholder="Nama Jasa"
            defaultValue={this.state.namaJasa}
            style={styles.textInputContainer}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={(value) => this.onHandleChangeText('namaJasa', value)}
            onSubmitEditing={() => this.harga.focus()}
          />
          <TextInput
            placeholder="Harga"
            keyboardType="number-pad"
            defaultValue={this.state.hargaJasa}
            style={styles.textInputContainer}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={(value) =>
              this.onHandleChangeText('hargaJasa', value)
            }
            ref={(input) => (this.harga = input)}
          />
          <Card.Divider></Card.Divider>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleSave()}>
            <Text style={styles.buttonText}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Batal</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

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
    backgroundColor: 'red',
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
