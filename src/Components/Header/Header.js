import React,{Component} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Header} from 'react-native-elements'
import {TouchableOpacity} from 'react-native'

const HeaderPages = ({headerText}) =>{
    return(
        <Header
            centerComponent={{ text: {headerText}, style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
            backgroundColor='#5D89F7'
            rightComponent={
              <TouchableOpacity>
                <Ionicons name="notifications" color="#fff" size={20}/>
              </TouchableOpacity>
            }
            // containerStyle={{borderBottomEndRadius:20,borderBottomStartRadius:20}}
        />
    )
}
export default HeaderPages;