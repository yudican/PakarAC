import { List } from 'native-base'
import React,{Component} from 'react'
import {View,TextInput, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions} from 'react-native'
import {Header, Card, ListItem, Image} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class KelolaListJasa extends Component{
    constructor(props){
        super(props)
        this.state={
            namaJasa : 'Cuci AC',
            hargaJasa : '75000'
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Ubah Jasa', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
                    backgroundColor='#5D89F7'
                    leftComponent={
                        <TouchableOpacity>
                            <Ionicons name="arrow-back" color="#fff" size={20}/>
                        </TouchableOpacity>
                        }
                />
                    <Card containerStyle={styles.cardContainer}>
                        <Card.Title>Edit Jasa</Card.Title>
                        <Card.Divider></Card.Divider>
                        <TextInput
                            placeholder="Nama Jasa"
                            defaultValue={this.state.namaJasa}
                            style={styles.textInputContainer}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(value)=>this.setState({namaJasa:value})}
                            onSubmitEditing={()=>this.harga.focus()}
                        />
                        <TextInput
                            placeholder="Harga"
                            keyboardType='number-pad'
                            defaultValue={this.state.hargaJasa}
                            style={styles.textInputContainer}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(value)=>this.setState({hargaJasa:value})}
                            ref={(input)=>this.harga=input}
                        />
                        <Card.Divider></Card.Divider>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Ubah</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2}>
                            <Text style={styles.buttonText}>Hapus</Text>
                        </TouchableOpacity>
                    </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    cardContainer : {
        borderRadius:15,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    textInputContainer :{
        borderRadius:20,
        paddingHorizontal:20,
        backgroundColor:'rgba(0,0,0,0.1)',
        marginTop:20
    },
    button : {
        width:'100%',
        backgroundColor:'green',
        borderRadius: 25,
        marginVertical:15,
        paddingVertical: 13,
    },
    button2 : {
        width:'100%',
        backgroundColor:'red',
         borderRadius: 25,
          paddingVertical: 13,
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    },
})