import React, { Component } from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import { colors } from 'react-native-elements';

export default class Splash extends Component{
    constructor(){
        super()
        this.state={timer:0}
        setInterval(() => {
           this.setState({timer:this.state.timer + 1}) 
        }, 1000);
    }
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.logo} source={require('./SplashLogo.jpg')}/>
                <Text style={styles.title}>PAKAR AC</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily : 'bauhaus 93',
        justifyContent: 'center',
        color:'#5D89F7'
    },
    logo :{ 
        height: 200,
        width: 190,
        alignItems: 'center'
    }
})