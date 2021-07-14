// import {DatePicker} from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Header, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';

export default class LaporanKeuangan extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      show: false,
      coba: '',
      laporanHariIni: {
        pendapatan: 0,
        totalTransaksi: 0,
        totalBiayaAdmin: 0,
      },
      laporanBulanIni: {
        pendapatan: 0,
        totalTransaksi: 0,
        totalBiayaAdmin: 0,
      },
      laporanTahunIni: {
        pendapatan: 0,
        totalTransaksi: 0,
        totalBiayaAdmin: 0,
      },
      costumFilter: {
        pendapatan: 0,
        totalTransaksi: 0,
        totalBiayaAdmin: 0,
      },
    };
  }

  componentDidMount() {
    // this.handleGetProfile();
    this.handleGetPesanan();
  }

  resetState = (value) => {
    if (value) {
      this.setState((prevState) => ({
        costumFilter: {
          pendapatan: 0,
          totalTransaksi: 0,
          totalBiayaAdmin: 0,
        },
      }));
    } else {
      this.setState((prevState) => ({
        laporanHariIni: {
          pendapatan: 0,
          totalTransaksi: 0,
          totalBiayaAdmin: 0,
        },
        laporanBulanIni: {
          pendapatan: 0,
          totalTransaksi: 0,
          totalBiayaAdmin: 0,
        },
        laporanTahunIni: {
          pendapatan: 0,
          totalTransaksi: 0,
          totalBiayaAdmin: 0,
        },
        costumFilter: {
          pendapatan: 0,
          totalTransaksi: 0,
          totalBiayaAdmin: 0,
        },
      }));
    }
  };

  handleGetPesanan = async (value = null) => {
    this.resetState(value);
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
            let tanggalOrder = new Date(dataItem.tanggalPesan);
            let tanggal = new Date();
            let firstDateofTheMonth = new Date(
              tanggal.getFullYear(),
              tanggal.getMonth(),
              1,
            );
            let lastDateofTheMonth = new Date(
              tanggal.getFullYear(),
              tanggal.getMonth(),
              0,
            );
            let firstDateofTheYear = new Date(tanggal.getFullYear(), 0, 1);
            let lastDateofTheYear = new Date(tanggal.getFullYear(), 12, 0);
            let tglFilter = new Date(value);

            if (dataItem.status === 'Sudah Selesai') {
              if (value) {
                if (tanggalOrder.getDate() === tglFilter.getDate()) {
                  this.setState((prevState) => ({
                    costumFilter: {
                      pendapatan:
                        parseInt(prevState.costumFilter.pendapatan) +
                        parseInt(dataItem.totalHarga),
                      totalTransaksi:
                        parseInt(prevState.costumFilter.totalTransaksi) +
                        orders.filter((e) => e.status === 'Sudah Selesai')
                          .length,
                      totalBiayaAdmin:
                        parseInt(prevState.costumFilter.totalBiayaAdmin) +
                        parseInt(dataItem.biayaAdmin),
                    },
                  }));
                } else {
                  this.setState((prevState) => ({
                    costumFilter: {
                      pendapatan: 0,
                      totalTransaksi: 0,
                      totalBiayaAdmin: 0,
                    },
                  }));
                }
              } else {
                if (tanggalOrder.getDate() === tanggal.getDate()) {
                  this.setState((prevState) => ({
                    laporanHariIni: {
                      pendapatan:
                        parseInt(prevState.laporanHariIni.pendapatan) +
                        parseInt(dataItem.totalHarga),
                      totalTransaksi:
                        parseInt(prevState.laporanHariIni.totalTransaksi) +
                        orders.filter((e) => e.status === 'Sudah Selesai')
                          .length,
                      totalBiayaAdmin:
                        parseInt(prevState.laporanHariIni.totalBiayaAdmin) +
                        parseInt(dataItem.biayaAdmin),
                    },
                  }));
                }

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
                        orders.filter((e) => e.status === 'Sudah Selesai')
                          .length,
                      totalBiayaAdmin:
                        parseInt(prevState.laporanBulanIni.totalBiayaAdmin) +
                        parseInt(dataItem.biayaAdmin),
                    },
                  }));
                }

                if (
                  firstDateofTheYear.getTime() < lastDateofTheYear.getTime()
                ) {
                  this.setState((prevState) => ({
                    laporanTahunIni: {
                      pendapatan:
                        parseInt(prevState.laporanTahunIni.pendapatan) +
                        parseInt(dataItem.totalHarga),
                      totalTransaksi:
                        parseInt(prevState.laporanTahunIni.totalTransaksi) +
                        orders.filter((e) => e.status === 'Sudah Selesai')
                          .length,
                      totalBiayaAdmin:
                        parseInt(prevState.laporanTahunIni.totalBiayaAdmin) +
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

  onChangeDate = (selectedDate) => {
    this.handleGetPesanan(selectedDate.nativeEvent.timestamp);
    this.setState((prevState) => ({
      date: selectedDate.nativeEvent.timestamp,
      show: !prevState.show,
    }));
  };
  handleShowDate() {
    if (this.state.show == false) {
      this.setState({
        show: true,
      });
    } else {
      this.setState({
        show: false,
      });
    }
  }

  render() {
    const {
      laporanHariIni,
      laporanBulanIni,
      laporanTahunIni,
      costumFilter,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Laporan Keuangan',
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
        />
        <ScrollView>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title style={{color: 'green'}}>Keuangan Hari Ini</Card.Title>
            <Card.Divider />
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Pendapatan : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp. {laporanHariIni.pendapatan}
              </ListItem.Subtitle>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Total Transaksi : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                {laporanHariIni.totalTransaksi}
              </ListItem.Subtitle>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Total Biaya Admin : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp. {laporanHariIni.totalBiayaAdmin}
              </ListItem.Subtitle>
            </ListItem>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title style={{color: '#ff602b'}}>
              Keuangan Bulan Ini
            </Card.Title>
            <Card.Divider />
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Pendapatan : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp. {laporanBulanIni.pendapatan}
              </ListItem.Subtitle>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Total Transaksi : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                {laporanBulanIni.totalTransaksi}
              </ListItem.Subtitle>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Total Biaya Admin : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp. {laporanBulanIni.totalBiayaAdmin}
              </ListItem.Subtitle>
            </ListItem>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title style={{color: '#2b99ff'}}>
              Keuangan Tahun Ini
            </Card.Title>
            <Card.Divider />
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Pendapatan : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp. {laporanTahunIni.pendapatan}
              </ListItem.Subtitle>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Total Transaksi : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                {laporanTahunIni.totalTransaksi}
              </ListItem.Subtitle>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Total Biaya Admin : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp. {laporanTahunIni.totalBiayaAdmin}
              </ListItem.Subtitle>
            </ListItem>
          </Card>

          <Card containerStyle={styles.cardContainer}>
            <Card.Title>Filter Laporan</Card.Title>
            <Card.Divider />
            <View>
              <Button
                title="Pilih Tanggal"
                onPress={this.handleShowDate.bind(this)}
              />
            </View>
            {this.state.show === true ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(this.state.date)}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={(value) => this.onChangeDate(value)}
              />
            ) : (
              <View />
            )}
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Pendapatan : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp. {costumFilter.pendapatan}
              </ListItem.Subtitle>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Total Transaksi : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                {costumFilter.totalTransaksi}
              </ListItem.Subtitle>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Total Biaya Admin : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>
                Rp. {costumFilter.totalBiayaAdmin}
              </ListItem.Subtitle>
            </ListItem>
            {/* <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Lihat Detail</Text>
                    </TouchableOpacity> */}
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
    backgroundColor: '#f57327',
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
