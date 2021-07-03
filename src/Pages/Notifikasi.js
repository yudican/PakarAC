import React, {Component} from 'react';
import Swipeable from 'react-native-swipeable';
import {Text, TouchableHighlight, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Header, ListItem, Avatar, Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {FlatList} from 'react-native';
import {getDateOrder} from '../Utils/helper';
import {RootContext} from '../Auth/Navigation/Context';
import database from '@react-native-firebase/database';

const rightButtons = [
  <TouchableHighlight>
    <Icon reverse name="trash" type="ionicon" color="red" size={22} />
  </TouchableHighlight>,
];

export default class Notifikasi extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    this.handleGetNotifications();
  }

  handleGetNotifications = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref(`Pengguna/Penyedia_Jasa/${uid}/Notifikasi`)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const notifications = Object.values(snapshot.val());
          this.setState({notifications});
        }
      });
  };

  render() {
    return (
      <View>
        <Header
          centerComponent={{
            text: 'Notifikasi',
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 17,
            },
          }}
          backgroundColor="#5D89F7"
          leftComponent={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="arrow-back" color="#fff" size={20} />
            </TouchableOpacity>
          }
        />
        <ScrollView>
          <FlatList
            data={this.state.notifications}
            renderItem={({item}) => (
              <Swipeable rightButtons={rightButtons}>
                <TouchableOpacity>
                  <ListItem bottomDivider>
                    {item.profile_photo ? (
                      <Avatar
                        title="AT"
                        rounded
                        source={{uri: item.profile_photo}}
                        size="small"
                        titleStyle={{color: 'orange'}}
                      />
                    ) : (
                      <Avatar
                        title="SI"
                        rounded
                        size="small"
                        titleStyle={{color: 'orange'}}
                      />
                    )}
                    <ListItem.Content>
                      <ListItem.Title style={{fontSize: 14}}>
                        {item.nama || 'Sistem'}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{fontSize: 10}}>
                        {item.title}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Subtitle style={{fontSize: 10}}>
                      {getDateOrder(item.waktu, '/')}
                    </ListItem.Subtitle>
                  </ListItem>
                </TouchableOpacity>
              </Swipeable>
            )}
          />

          <View style={{alignItems: 'center', paddingTop: '5%'}}>
            <Text style={{color: 'rgba(0,0,0,0.5)'}}>
              --Tidak Ada Notifikasi Lagi--
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
