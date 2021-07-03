import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';
import PesananAktif from '../Components/PesananAktif/PesananAktif';
import {getDateOrder} from '../Utils/helper';

export default class Pesanan extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pesanan: [],
    };
  }

  componentDidMount() {
    // this.handleGetProfile();
    this.handleGetPesanan();
  }

  handleGetPesanan = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef.ref('Pengguna/Pesanan').on('value', (snapshot) => {
      const order = snapshot.val() || {};

      const orderData = Object.values(order);
      const orders = orderData.filter(
        (itemOrder) => itemOrder.uidPenyedia === uid,
      );
      this.setState({pesanan: []});
      if (orders.length > 0) {
        orders.map((item) => {
          this.firebaseRef
            .ref('Pengguna/Penyedia_Jasa/' + item.uidPenyedia)
            .on('value', (snapshots) => {
              const seller = snapshots.val();
              if (seller) {
                this.firebaseRef
                  .ref('Pengguna/Pelanggan/' + item.uidPelanggan)
                  .on('value', (snapshotsPel) => {
                    const pelanggan = snapshotsPel.val();
                    if (pelanggan) {
                      this.setState((prevState) => ({
                        pesanan: [
                          ...prevState.pesanan,
                          {
                            ...item,
                            merk: seller.merk,
                            pelanggan,
                            uid_pelanggan: item.uidPelanggan,
                          },
                        ],
                      }));
                    }
                  });
              }
            });
        });
      }
    });
  };
  render() {
    const {pesanan, search} = this.state;
    const {navigation} = this.props;
    const filteredElements = pesanan.filter(
      (e) =>
        e.pelanggan.nama.toLowerCase().includes(search) ||
        getDateOrder(e.tanggalPesan, '/').includes(search),
    );
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: 'Riwayat Pesanan',
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
        <SearchBar
          placeholder="Cari riwayat pesanan disini ..."
          onChangeText={(value) => this.setState({search: value})}
          value={this.state.search}
          lightTheme
          showLoading
          inputStyle={{height: 40, borderRadius: 15, fontSize: 16}}
          inputContainerStyle={{
            borderRadius: 15,
            height: 30,
            backgroundColor: 'white',
          }}
        />
        <ScrollView>
          <View style={styles.pesananAktif}>
            <FlatList
              data={filteredElements}
              renderItem={({item}) => (
                <PesananAktif
                  title={item.pelanggan.nama}
                  status={item.status}
                  date={getDateOrder(item.tanggalPesan, '/')}
                  onPress={() =>
                    navigation.navigate('PesananDetail', {
                      noOrder: item.noOrder,
                      uid_pelanggan: item.uidPelanggan,
                    })
                  }
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pesananAktif: {
    paddingTop: 3,
    paddingHorizontal: 10,
    backgroundColor: '#F6F6F6',
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
