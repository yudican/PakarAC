import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Header,
  ListItem,
  Avatar,
  Card,
  CheckBox,
  Icon,
  SearchBar,
  Rating,
  AirbnbRating,
} from 'react-native-elements';

export default class TulisUlasan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // search:''
      qty: '1',
      harga: 250000,
      totalHarga: 0,
      biayaAdmin: 2500,
      catatan: '',
      rating: 0,
    };
  }

  // ratingUpdate(rating){
  //     this.setState({
  //         rating: rating
  //     })
  // }

  render() {
    const totalHarga =
      parseInt(this.state.qty) * this.state.harga + this.state.biayaAdmin;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Pesanan No.12011022',
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 17,
            },
          }}
          backgroundColor="#5D89F7"
          leftComponent={
            <TouchableOpacity>
              <Ionicons name="arrow-back" color="#fff" size={20} />
            </TouchableOpacity>
          }
        />
        <ScrollView>
          <ImageBackground
            source={require('../Assets/Image/Toko1.png')}
            style={styles.header}></ImageBackground>
          <View style={styles.container}>
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.labelTokoContainer}>
                <TouchableOpacity>
                  <Text style={styles.labelToko}>Helvetia AC</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#ffd500',
                        fontWeight: '700',
                        fontSize: 16,
                      }}>
                      4.7/5
                    </Text>
                    <Rating
                      imageSize={18}
                      startingValue={4.7}
                      readonly
                      fractions={1}
                      style={{paddingHorizontal: 18}}
                      ratingColor="#ffdd00"
                    />
                  </View>
                  <Text style={{color: 'rgba(0,0,0,0.4)'}}>
                    Jl. Helvetia Raya No.8, Medan
                  </Text>
                  <Text style={{color: 'rgba(0,0,0,0.9)'}}>
                    Jam Operasi : 10.00 - 20.00
                  </Text>
                </TouchableOpacity>
              </View>

              <Card.Divider></Card.Divider>

              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={{fontSize: 14}}>
                    Paket Combo Cuci AC + Isi Freon AC 1/2PK R32
                  </ListItem.Title>
                  <ListItem.Subtitle style={{fontSize: 12}}>
                    Rp.{this.state.harga}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle>Qty : </ListItem.Subtitle>
                <ListItem.Subtitle>{this.state.qty}</ListItem.Subtitle>
                {/* <ListItem.Subtitle>
                                        <View style={{flexDirection:'row'}}>
                                            <TextInput
                                                style={{width:30,borderWidth:1,height:40,borderRadius:5,fontSize:14,textAlign:'center',borderColor:'rgba(0,0,0,0.2)',margin:5}}
                                                defaultValue={this.state.qty}
                                                keyboardType="numeric"
                                                maxLength={3}
                                                onChangeText={(value)=>this.setState({qty:value})}
                                            />
                                        </View>
                                    </ListItem.Subtitle> */}
              </ListItem>
              <Card.Divider></Card.Divider>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Subtitle>Biaya Admin : </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle>
                  Rp. {this.state.biayaAdmin}
                </ListItem.Subtitle>
              </ListItem>
              <Card.Divider></Card.Divider>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Subtitle>Total Harga : </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Title>Rp. {totalHarga}</ListItem.Title>
              </ListItem>
              <Card.Divider></Card.Divider>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Subtitle>Rating : </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle>
                  <AirbnbRating
                    count={5}
                    defaultRating={this.state.rating}
                    size={20}
                    showRating={false}
                    onFinishRating={(value) => this.setState({rating: value})}
                  />
                </ListItem.Subtitle>
              </ListItem>
              <Card.Divider></Card.Divider>
              <TextInput
                editable
                maxLength={500}
                multiline
                numberOfLines={5}
                placeholder="Tulis Ulasan (Opsional)"
                onChangeText={(value) => this.setState({catatan: value})}
                defaultValue={this.state.catatan}
                style={{paddingHorizontal: 20}}
              />
              <Card.Divider></Card.Divider>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Posting</Text>
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
  labelTokoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
});
