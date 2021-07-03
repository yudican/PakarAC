import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Header, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';

export default class BatalkanPesanan extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      // search:''
      totalHarga: 0,
      biayaAdmin: 2500,
      status: 'Belum Dikonfirmasi',
      ulasan: '',
      rating: 0,
      alasanPembatalan: '',
      catatan: '',
      buyer: {},
      pesanan: [],
      profile_photo: '',
      nama: '',
    };
  }

  componentDidMount() {
    this.handleGetProfile();
    this.handleGetPesanan();
  }

  handleGetProfile = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref('Pengguna/Penyedia_Jasa/' + uid)
      .on('value', (snapshot) => {
        const {nama, profile_photo} = snapshot.val();
        this.setState({
          profile_photo,
          nama,
        });
      });
  };

  handleGetPesanan = async () => {
    const {uid} = this.context.auth.user;
    const {uid_pelanggan, noOrder} = this.props.route.params;
    console.log(`Pengguna/Pesanan/${uid_pelanggan}-${uid}`);
    await this.firebaseRef
      .ref(`Pengguna/Pesanan/${uid_pelanggan}-${uid}`)
      .on('value', (snapshot) => {
        const dataOrder = snapshot.val();
        if (dataOrder) {
          const orderId = Object.keys(dataOrder);
          const orderData = Object.values(dataOrder);
          orderId.map((ownUid) => {
            if (dataOrder.noOrder === noOrder) {
              this.firebaseRef
                .ref('Pengguna/Pelanggan/' + uid_pelanggan)
                .on('value', (snapshots) => {
                  const buyer = snapshots.val();
                  this.setState({
                    buyer,
                    pesanan: Object.values(dataOrder.Jasa),
                    totalHarga: dataOrder.totalHarga,
                    biayaAdmin: dataOrder.biayaAdmin,
                    status: dataOrder.status,
                    catatan: dataOrder.catatan,
                    rating: dataOrder.rating,
                    ulasan: dataOrder.ulasan,
                    alasanPembatalan: dataOrder.alasanPembatalan || '',
                  });
                });
            }
          });
        }
      });
  };

  handleCancelOrder = () => {
    const {uid} = this.context.auth.user;
    const {uid_pelanggan, noOrder} = this.props.route.params;
    const {updateOrder, addNotification} = this.context.app;
    const {profile_photo, nama} = this.state;

    const data = {
      status: 'Dibatalkan',
      alasanPembatalan: this.state.alasanPembatalan,
    };
    const notificationData = {
      noOrder,
      title: `Pesanan Kamu Dibatalkan`,
      waktu: new Date().getTime(),
      nama,
      profile_photo,
      isRead: false,
    };

    addNotification(notificationData, uid_pelanggan);
    updateOrder(data, noOrder, 'Pesanan Berhasil Dibatalkan');
    this.props.navigation.replace('Home', {screen: 'Pesanan'});
  };

  render() {
    const {
      biayaAdmin,
      totalHarga,
      pesanan,
      buyer,
      status,
      rating,
      ulasan,
    } = this.state;
    const {navigation, route} = this.props;
    const {uid_pelanggan, noOrder} = route.params;
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: 'Pesanan ' + noOrder,
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
        <ScrollView>
          <ImageBackground
            source={require('../Assets/Image/BerandaImage.png')}
            style={styles.header}>
            {/* <Image source={Logo} style={styles.logo} /> */}
          </ImageBackground>
          <View style={styles.container}>
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.labelTokoContainer}>
                <TouchableOpacity>
                  <Text style={styles.labelToko}>{buyer.nama}</Text>
                  <Text style={{color: 'rgba(0,0,0,0.4)'}}>{buyer.alamat}</Text>
                  <Text style={{color: 'rgba(0,0,0,0.9)'}}>
                    {buyer.no_telp}
                  </Text>
                </TouchableOpacity>
              </View>

              <Card.Divider></Card.Divider>

              <FlatList
                data={pesanan}
                renderItem={({item}) => (
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title style={{fontSize: 14}}>
                        {item.namaJasa}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{fontSize: 12}}>
                        Rp.{item.hargaJasa}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Subtitle>Qty : </ListItem.Subtitle>
                    <ListItem.Subtitle>{item.jumlah}</ListItem.Subtitle>
                  </ListItem>
                )}
              />
              <Card.Divider></Card.Divider>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Subtitle>Biaya Admin : </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle>Rp. {biayaAdmin}</ListItem.Subtitle>
              </ListItem>
              <Card.Divider></Card.Divider>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Subtitle>Total Harga : </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Title>Rp. {totalHarga}</ListItem.Title>
              </ListItem>
              <Card.Divider></Card.Divider>
              <TextInput
                maxLength={500}
                multiline
                numberOfLines={5}
                placeholder="Alasan Penolakan (Wajib Disi)"
                onChangeText={(value) =>
                  this.setState({alasanPembatalan: value})
                }
                style={{paddingHorizontal: 20, color: 'black'}}
              />

              <TouchableOpacity
                disabled={!this.state.alasanPembatalan}
                style={styles.button4}
                onPress={() => this.handleCancelOrder()}>
                <Text style={styles.buttonText}>Tolak Pesanan</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  labelToko: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    borderRadius: 15,
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
  cardContainer2: {
    borderRadius: 15,
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
  },
  labelTokoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '95%',
    backgroundColor: 'red',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  button2: {
    width: '95%',
    backgroundColor: 'green',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  button3: {
    width: '95%',
    backgroundColor: '#ff3a03',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  button4: {
    width: '95%',
    backgroundColor: 'red',
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
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
});
