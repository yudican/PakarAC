import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Header} from 'react-native-elements';
import {db} from '../../database/config';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namaparfum: '',
      harga: '',
    };
  }
  componentDidMount() {
    this.inputnamaparfum.focus();
  }

  onSubmit = () => {
    if (this.state.namaparfum && this.state.harga) {
      const daftarParfum = db.app.database().ref('Parfum');
      const parfum = {
        namaParfum: this.state.namaparfum,
        harga: this.state.harga,
      };

      daftarParfum.push(parfum).then((data) => {
        Alert.alert('Broo...', 'data lu udh berhasil ditambahkan!!');
        this.setState({
          namaparfum: '',
          harga: '',
        });
      });
    } else {
      Alert.alert('Woi Bego', 'data lu masih kosong bego!!');
    }
  };

  render() {
    return (
      <View>
        <Header
          centerComponent={{text: 'Input Data', style: {color: '#fff'}}}
          backgroundColor="#3CABBB"
        />

        <Card style={{borderRadius: 100}}>
          <Card.Title>Input Daftar Parfum Impian</Card.Title>
          <Card.Divider />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Nama Parfum"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            ref={(input) => (this.inputnamaparfum = input)}
            onSubmitEditing={() => this.harga.focus()}
            defaultValue={this.state.namaparfum}
            onChangeText={(value) => this.setState({namaparfum: value})}
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Harga"
            placeholderTextColor="#ffffff"
            keyboardType="numeric"
            ref={(input) => (this.harga = input)}
            defaultValue={this.state.harga}
            onChangeText={(value) => this.setState({harga: value})}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onSubmit()}>
            <Text style={styles.buttonText}>Tambah</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#240000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  containersignup: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#3CABBB',
    borderRadius: 10,
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
