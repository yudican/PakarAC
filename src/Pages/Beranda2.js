import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
// import {Container,Item,Input,Button,Text,Fab} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Header,
  Card,
  ListItem,
  Icon,
  SearchBar,
  Button,
} from 'react-native-elements';
import PesananAktif from '../Components/PesananAktif/PesananAktif';
import {RootContext} from '../Auth/Navigation/Context';
import database from '@react-native-firebase/database';
import {FlatList} from 'react-native';
import {getDateOrder} from '../Utils/helper';

export default class Beranda2 extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      statusPembayaran: 'Perlu Dibayar',
      pesanan: [],
      laporanBulanIni: {
        pendapatan: 0,
        totalTransaksi: 0,
        totalBiayaAdmin: 0,
      },
    };
  }

  componentDidMount() {
    this.handleGetReportPesanan();
    this.handleGetPesanan();
    this.handleGetPembayaran();
  }

  handleGetPesanan = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef.ref('Pengguna/Pesanan').on('value', (snapshot) => {
      const order = snapshot.val();
      if (order) {
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
      }
    });
  };

  handleGetPembayaran = async () => {
    const {uid} = this.context.auth.user;
    const bulan = `${new Date().getMonth()}-${new Date().getFullYear()}`;
    await this.firebaseRef
      .ref(`Pengguna/Penyedia_Jasa/${uid}/Pembayaran/${bulan}`)
      .on('value', (snapshot) => {
        const pembayaran = snapshot.val();
        if (pembayaran) {
          this.setState({
            statusPembayaran: pembayaran.status,
          });
        }
      });
  };

  resetState = () => {
    this.setState((prevState) => ({
      laporanBulanIni: {
        pendapatan: 0,
        totalTransaksi: 0,
        totalBiayaAdmin: 0,
      },
    }));
  };

  handleGetReportPesanan = async (value = null) => {
    value === null && this.resetState();
    const {uid} = this.context.auth.user;
    await this.firebaseRef.ref('Pengguna/Pesanan').on('value', (snapshot) => {
      const order = snapshot.val();
      if (order) {
        const orderData = Object.values(order);
        const orders = orderData.filter(
          (itemOrder) => itemOrder.uidPenyedia === uid,
        );
        if (orders.length > 0) {
          orders.map((dataItem) => {
            if (dataItem.status === 'Sudah Selesai') {
              let tanggalOrder = new Date(dataItem.tanggalPesan);
              let tanggal = new Date();
              let firstDateofTheMonth = new Date(
                tanggalOrder.getFullYear(),
                tanggalOrder.getMonth(),
                1,
              );
              let lastDateofTheMonth = new Date(
                tanggalOrder.getFullYear(),
                tanggalOrder.getMonth(),
                0,
              );
              if (dataItem.status === 'Sudah Selesai') {
                if (
                  tanggal.getDate() > firstDateofTheMonth.getDate() &&
                  tanggal.getDate() < lastDateofTheMonth.getDate()
                ) {
                  this.setState((prevState) => ({
                    laporanBulanIni: {
                      pendapatan:
                        parseInt(prevState.laporanBulanIni.pendapatan) +
                        parseInt(dataItem.totalHarga),
                      totalTransaksi:
                        parseInt(prevState.laporanBulanIni.totalTransaksi) +
                        orderData.length,
                      totalBiayaAdmin:
                        parseInt(prevState.laporanBulanIni.totalBiayaAdmin) +
                        parseInt(dataItem.biayaAdmin),
                    },
                  }));
                }
              }
            }
          });
        }
      }
    });
  };

  render() {
    const {pesanan, laporanBulanIni, biayaAdmin, statusPembayaran} = this.state;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: 'Beranda',
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
          <ImageBackground
            source={require('../Assets/Image/BerandaImage.png')}
            style={styles.header}>
            {/* <Image source={Logo} style={styles.logo} /> */}
          </ImageBackground>
          <Card
            containerStyle={
              ({position: 'absolute', width: '90%'}, styles.containerCard)
            }>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Pendapatan Bulan Ini : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp.{laporanBulanIni.pendapatan}
              </ListItem.Subtitle>
            </ListItem>
            <Card.Divider />
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Biaya Admin Bulan ini : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp.{laporanBulanIni.totalBiayaAdmin}
              </ListItem.Subtitle>
            </ListItem>
            <Card.Divider />
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>
                  Status Pembayaran Admin Bulan Ini :{' '}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle
                style={{
                  color:
                    statusPembayaran === 'Lunas'
                      ? 'green'
                      : statusPembayaran === 'Perlu Dibayar'
                      ? 'orange'
                      : 'red',
                }}>
                {statusPembayaran}
              </ListItem.Subtitle>
            </ListItem>
          </Card>

          <View style={styles.pesananAktif}>
            <Text style={styles.label}>Pesanan Belum Dikonfirmasi</Text>
            <FlatList
              data={pesanan}
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: -windowHeight * 0.07,
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  logo: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.06,
  },
  hello: {
    marginTop: windowHeight * 0.03,
  },
  selamat: {
    fontSize: 24,
    fontFamily: 'TitilliumWeb-Regular',
  },
  username: {
    fontSize: 22,
    fontFamily: 'TitilliumWeb-Bold',
  },
  layanan: {
    paddingLeft: 30,
    paddingTop: 15,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'TitilliumWeb-Bold',
    color: 'orange',
  },
  iconCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  pesananAktif: {
    paddingHorizontal: 25,
    backgroundColor: '#F6F6F6',
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  categoryBtn: {
    flex: 1,
    marginHorizontal: 0,
    alignItems: 'center',
    marginRight: 60,
  },
});
