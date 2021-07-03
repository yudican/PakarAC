import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 200, height: 210}}
          source={require('../images/logo.png')}
        />
        <Text style={styles.logoText}>
          {this.props.title || 'Selamat Datang'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoText: {
    marginVertical: 15,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#6B95FF',
  },
});
