import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    inputSearchContainer : {
        overflow : 'hidden',
        marginHorizontal : 5,
        marginTop : 5,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center',
        borderRadius : 10,
        backgroundColor : "rgba(0,0,0,1)",
    },
    inputSearch : {
        backgroundColor : '#e8e8e8',
        width : 240,
        paddingLeft : 5,
        height : 40
    }
})

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state={
            search:''
        }
    }

    handleSearch(value){
        this.setState({
            search : value
        })
    }
    static navigationOptions = ({navigation})=>{
        return{
            headerTitle : ()=>
                <View style={styles.inputSearchContainer}>
                    <TextInput 
                        style={styles.inputSearch}
                        placeholder="Cari Artikelmu"
                        returnKeyType="search"
                        placeholderTextColor="rgba(4,4,4,0.3)"
                    />
                </View>
            ,
            headerLeftContainerStyle : {
                padding : 3
            },
            headerTintColor : 'black'
        }
    }
    render(){
        return(
            <View>
                <Text>Search bar</Text>
            </View>
        )
    }
}