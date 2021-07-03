import React, {Component} from 'react';
// import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
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

export default class TokoDeatil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      favorit: false,
    };
  }

  handleFavoritBtn() {
    if (this.state.favorit) {
      this.setState({
        favorit: false,
      });
    } else {
      this.setState({
        favorit: true,
      });
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: 'Helvetia AC',
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
        <SearchBar
          placeholder="Cari jasa di toko ini..."
          onChangeText={(value) =>
            this.setState({search: value}, console.log(this.state.search))
          }
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
          <ImageBackground
            source={require('../Assets/Image/Toko1.png')}
            style={styles.header}>
            {/* <Image source={Logo} style={styles.logo} /> */}
          </ImageBackground>
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
                <Icon
                  name={this.state.favorit ? 'favorite' : 'favorite-border'}
                  type="material"
                  color="red"
                  onPress={this.handleFavoritBtn.bind(this)}
                  size={20}
                  raised
                  containerStyle={{right: 0, position: 'absolute'}}
                />
              </View>

              <Card.Divider></Card.Divider>
              <TouchableOpacity>
                <ListItem bottomDivider>
                  <ListItem.Title></ListItem.Title>
                  <ListItem.Content>
                    <ListItem.Title style={{fontSize: 14}}>
                      Cuci AC
                    </ListItem.Title>
                    <ListItem.Subtitle style={{fontSize: 12}}>
                      Rp.75.000
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Subtitle>
                    <Icon
                      raised
                      name="shoppingcart"
                      size={16}
                      type="antdesign"
                      color="#F18F37"
                      onPress={() => console.log('This Is Shopping Cart')}
                    />
                  </ListItem.Subtitle>
                </ListItem>
              </TouchableOpacity>
              <TouchableOpacity>
                <ListItem bottomDivider>
                  <ListItem.Title></ListItem.Title>
                  <ListItem.Content>
                    <ListItem.Title style={{fontSize: 14}}>
                      Ganti Freon AC 1 PK R32
                    </ListItem.Title>
                    <ListItem.Subtitle style={{fontSize: 12}}>
                      Rp.250.000
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Subtitle>
                    <Icon
                      raised
                      name="shoppingcart"
                      size={16}
                      type="antdesign"
                      color="#F18F37"
                      onPress={() => console.log('This Is Shopping Cart')}
                    />
                  </ListItem.Subtitle>
                </ListItem>
              </TouchableOpacity>
              <TouchableOpacity>
                <ListItem bottomDivider>
                  <ListItem.Title></ListItem.Title>
                  <ListItem.Content>
                    <ListItem.Title style={{fontSize: 14}}>
                      Ganti Freon AC 1/2 PK R32
                    </ListItem.Title>
                    <ListItem.Subtitle style={{fontSize: 12}}>
                      Rp.180.000
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Subtitle>
                    <Icon
                      raised
                      name="shoppingcart"
                      size={16}
                      type="antdesign"
                      color="#F18F37"
                      onPress={() => console.log('This Is Shopping Cart')}
                    />
                  </ListItem.Subtitle>
                </ListItem>
              </TouchableOpacity>
              <TouchableOpacity>
                <ListItem bottomDivider>
                  <ListItem.Title></ListItem.Title>
                  <ListItem.Content>
                    <ListItem.Title style={{fontSize: 14}}>
                      Paket Combo Cuci AC + Ganti Freon AC 1/2PK R32
                    </ListItem.Title>
                    <ListItem.Subtitle style={{fontSize: 12}}>
                      Rp.250.000
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Subtitle>
                    <Icon
                      raised
                      name="shoppingcart"
                      size={16}
                      type="antdesign"
                      color="#F18F37"
                      onPress={() => console.log('This Is Shopping Cart')}
                    />
                  </ListItem.Subtitle>
                </ListItem>
              </TouchableOpacity>
              <TouchableOpacity>
                <ListItem bottomDivider>
                  <ListItem.Title></ListItem.Title>
                  <ListItem.Content>
                    <ListItem.Title style={{fontSize: 14}}>
                      Ganti Freon AC 2 PK R32
                    </ListItem.Title>
                    <ListItem.Subtitle style={{fontSize: 12}}>
                      Rp.350.000
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Subtitle>
                    <Icon
                      raised
                      name="shoppingcart"
                      size={16}
                      type="antdesign"
                      color="#F18F37"
                      onPress={() => console.log('This Is Shopping Cart')}
                    />
                  </ListItem.Subtitle>
                </ListItem>
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
