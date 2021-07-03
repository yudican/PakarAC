import React, { Component } from 'react';
// import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
import {View,TouchableOpacity,Image,ScrollView,Text,StyleSheet,TextInput,Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Header, ListItem, Avatar, Card, CheckBox,Icon} from 'react-native-elements'


export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            checked:false,
            checkedItem1 : false,
            checkedItem2 : false,
        }
    }
    
    handleCheckedBox(){
        if(this.state.checked)
        {
            this.setState({
                checked:false,
                checkedItem1:false,
                checkedItem2:false,
            })
        }
        else{
            this.setState({
                checked:true,
                checkedItem1:true,
                checkedItem2:true,
            })
        }
        console.log(this.state.checked)
    }
    handleItemCheckedBox1(){
        if(this.state.checkedItem1)
        {
            this.setState({
                checkedItem1:false,
            })
        }
        else{
            this.setState({
                checkedItem1:true
            })
        }
        console.log(this.state.checkedItem1)
    }

    handleItemCheckedBox2(){
        if(this.state.checkedItem2)
        {
            this.setState({
                checkedItem2:false
            })
        }
        else{
            this.setState({
                checkedItem2:true
            })
        }
        console.log(this.state.checkedItem2)
    }
    
  render() {
    return (
      <View>
          <Header
            centerComponent={{ text: 'Keranjang', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
            backgroundColor='#5D89F7'
            leftComponent={
                <TouchableOpacity>
                    <Ionicons name="arrow-back" color="#fff" size={20}/>
                </TouchableOpacity>
            }
        />
            <Card containerStyle={styles.cardContainer}>
                <View style={styles.labelTokoContainer}>
                    <CheckBox
                    checked={this.state.checked}
                    onPress={this.handleCheckedBox.bind(this)}
                    />
                    <TouchableOpacity>
                        <Text style={styles.labelToko}>Panama AC</Text>
                        <Text style={{color:'rgba(0,0,0,0.4)'}}>Jl. Hang Tuah No.8, Medan</Text>
                    </TouchableOpacity>
                </View>
                <Card.Divider></Card.Divider>
                <TouchableOpacity>
                    <ListItem bottomDivider>
                        <ListItem.Title>
                            <CheckBox
                                checked={this.state.checkedItem1}
                                onPress={this.handleItemCheckedBox1.bind(this)}
                            />
                        </ListItem.Title>
                        <ListItem.Content>
                        <ListItem.Title style={{fontSize:14}}>Cuci AC</ListItem.Title>
                        <ListItem.Subtitle style={{fontSize:12}}>Rp.75.000</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Subtitle>Qty : </ListItem.Subtitle>
                        <ListItem.Subtitle>
                            <View style={{flexDirection:'row'}}>
                                <TextInput
                                    style={{width:30,borderWidth:1,height:40,borderRadius:5,fontSize:14,textAlign:'center',borderColor:'rgba(0,0,0,0.2)',margin:5}}
                                    defaultValue='1'
                                    keyboardType="numeric"
                                    maxLength={3}
                                />
                            </View>
                        </ListItem.Subtitle>
                    </ListItem> 
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <ListItem bottomDivider>
                        <ListItem.Title>
                            <CheckBox
                                checked={this.state.checkedItem2}
                                onPress={this.handleItemCheckedBox2.bind(this)}
                            />
                        </ListItem.Title>
                        <ListItem.Content>
                        <ListItem.Title style={{fontSize:14}}>Ganti Freon AC 1 PK R32</ListItem.Title>
                        <ListItem.Subtitle style={{fontSize:12}}>Rp.250.000</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Subtitle>Qty : </ListItem.Subtitle>
                        <ListItem.Subtitle>
                            <View style={{flexDirection:'row'}}>
                                <TextInput
                                    style={{width:30,borderWidth:1,height:40,borderRadius:5,fontSize:14,textAlign:'center',borderColor:'rgba(0,0,0,0.2)',margin:5}}
                                    defaultValue='1'
                                    keyboardType="numeric"
                                    maxLength={3}
                                />
                            </View>
                        </ListItem.Subtitle>
                    </ListItem> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Pesan</Text>
                    </TouchableOpacity>
                    
            </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container : {
        flex :1
    },
    labelToko : {
        fontSize:16,
        fontWeight:'bold'
    },
    cardContainer :{
        borderRadius:15,
    },
    labelTokoContainer : {
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    button: {
        width:'95%',
        backgroundColor:'#ff3a03',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13,
      },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    },
})