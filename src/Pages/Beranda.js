import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, Header, Icon, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Carousel from '../Components/Carousel/Component/Carousel'
// import {dummyData} from '../Components/Carousel/data/data'

export default class Beranda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  render() {
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
            <Ionicons name="notifications" color="#fff" size={20} />
          }
        />
        <SearchBar
          placeholder="Cari disini ..."
          onChangeText={(value) => this.setState({search: value})}
          value={this.state.search}
          // lightTheme
          showLoading
          inputStyle={{height: 40}}
          inputContainerStyle={{borderRadius: 15, height: 30}}
        />
        {/* <View>
                    <Carousel data = {dummyData} />
                </View> */}
        {/* <TouchableWithoutFeedback style={{bottom:100}}>
                    <Animated.View style={styles.button, styles.menu}>
                        <AntDesign name="plus" size={24} color="#fff"/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                 */}
        <Card containerStyle={{borderRadius: 12}}>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => console.log('Menu1')}>
              <Icon reverse name="location" type="evilicon" color="#EC5C3F" />
              <Text style={{textAlign: 'center'}}>Terdekat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => console.log('Menu2')}>
              <Icon reverse name="tag" type="evilicon" color="orange" />
              <Text style={{textAlign: 'center'}}>Rekomendasi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Menu3')}>
              <Icon reverse name="favorite" type="material" color="red" />
              <Text style={{textAlign: 'center'}}>Favorit</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <View
          style={{
            alignItems: 'center',
            right: 15,
            position: 'absolute',
            bottom: 10,
            zIndex: 1,
          }}>
          <Icon
            raised
            name="shoppingcart"
            type="antdesign"
            color="#F18F37"
            onPress={() => console.log('This Is Shopping Cart')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container : {
  //     alignItems: "center",
  //     position:'absolute'
  // },
  // button : {
  //     position : "absolute",
  //     width:60,
  //     height:60,
  //     borderRadius : 60 / 2,
  //     alignItems:'center',
  //     justifyContent:'center',
  //     shadowRadius:10,
  //     shadowColor:'#5D89F7',
  //     shadowOpacity:0.3,
  //     shadowOffset:{height:10}
  // },
  // menu : {
  //     backgroundColor:"#5D89F7"
  // }
  categoryContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  categoryBtn: {
    flex: 1,
    marginHorizontal: 0,
    alignItems: 'center',
    marginRight: 60,
  },
});
