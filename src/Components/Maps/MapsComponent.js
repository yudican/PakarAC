import React,{Component} from 'react'
import {View, Text,StyleSheet,Dimensions} from 'react-native'
// import MapView,{Marker} from 'react-native-maps'
// import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
// import Placesearch from 'react-native-placesearch';



export default class MapComponent extends Component{
    constructor(props){
        super(props)
            this.state={
                longitude : 0,
                latitude : 0,
                // positionCoord:null,
                // error:null,
                // mapRegion:null,
            }
    }
    // onRegionChange(region, latitude, longitude) {
    //     this.setState({
    //       mapRegion: region,
    //       // If there are no new values set the current ones
    //       latitude: latitude || this.state.latitude,
    //       longitude: longitude || this.state.longitude
    //    });
    //    console.log(this.state)
    //  }
    componentDidMount(){
        // Geolocation.getCurrentPosition((position) => {
        //     this.setState({
        //         longitude : position.coords.longitude,
        //         latitude : position.coords.latitude,
        //         error:null
        //     })
        //     console.log(position)
        // }, error=>this.setState({error:error.message}),
        //     {enableHighAccuracy:true,timeout:20000,maximumAge:2000}
        // );
        // Geolocation.getCurrentPosition(position=>this.setState({position}))
        // console.log(position)
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    longitude:position.coords.longitude,
                    latitude:position.coords.latitude
                })
                console.log(position)
                console.log(this.state)
            },
            );
    }

    render(){
        return(
            <View style={styles.container}>
                {/* <MapView style={styles.map} region={{
                    latitude:this.state.latitude,
                    longitude : this.state.longitude,
                    latitudeDelta : 0.001,
                    longitudeDelta : 0.001
                    }}>
                    <Marker coordinate={this.state}
                    />
                </MapView> */}
                {/* <GooglePlacesAutocomplete
                    placeholder='Masukkan Lokasi'
                    minLength={2}
                    autoFocus={false}
                    fetchDetails={true}
                    listViewDisplayed='auto'
                    query={{
                        key: 'AIzaSyANSgoTfGHsSMKjbEynjeDiZrvHUGIAv9M',
                        language: 'en',
                        types: 'geocode',
                    }}
                    currentLocation={false}
                    onPress={(data, details = null) => {
                    const region = {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    };
                    this.onRegionChange(region, region.latitude, region.longitude);
                    }}
                />
                <MapView
                    style={{flex:1,width:window.width}}
                    region={this.state.mapRegion}
                    onRegionChange={(regions)=>{
                        this.setState({
                            mapRegion:regions
                        })
                    }}
                    onPress={(e)=>{
                        const region={
                            latitude:e.nativeEvent.coordinate.latitude,
                            longitude:e.nativeEvent.coordinate.longitude,
                            latitudeDelta:0.001,
                            longitudeDelta:0.001,
                        }
                        this.onRegionChange(region,region.latitude,region.longitude)
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: (this.state.latitude),
                            longitude: (this.state.longitude),
                        }}
                        title="Lokasi"
                        description="Lokasi Rumah"
                        />
                </MapView> */}
                <GooglePlacesAutocomplete
                    placeholder='Masukkan Lokasi'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        this.setState({
                            longitude:details.geometry.location.lng,
                            latitude:details.geometry.location.lat
                        }),
                        console.log(this.state)
                    }}
                    query={{
                        key: 'AIzaSyANSgoTfGHsSMKjbEynjeDiZrvHUGIAv9M',
                        language: 'en',
                        
                    }}
                />
                {/* <MapView style={styles.map} region={{
                    latitude:this.state.latitude,
                    longitude : this.state.longitude,
                    latitudeDelta : 0.001,
                    longitudeDelta : 0.001
                    }}>
                    <Marker coordinate={this.state}
                    title="Lokasi Anda"
                    description="Anda memilih lokasi ini"
                    pinColor='red'
                    />
                </MapView>  */}
                {/* <Placesearch 
                apikey="AIzaSyANSgoTfGHsSMKjbEynjeDiZrvHUGIAv9M" // required *
                SelectedAddress={(data)=>console.log(data)} // required *
                country ="IN" //optional
                coordinate={true} //optional
                removeImg = {true} //optional
                /> */}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject
    },
    map:{
        height:'90%',
        flex:1
    }
})