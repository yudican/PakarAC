import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import {Avatar, Header, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import {RootContext} from '../Auth/Navigation/Context';
import {getDate} from '../Utils/helper';

export default class ChatDetail extends Component {
  static contextType = RootContext;
  firebaseRef = database();
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      nama: '',
      profile_photo: '',
    };
  }

  componentDidMount() {
    this.handleGetProfile();
    this.handleGetChat();
    this.handleGetOwnChat();
  }

  handleGetChat = async () => {
    const {uid} = this.context.auth.user;
    const {user_id} = this.props.route.params;
    await this.firebaseRef
      .ref(`Pengguna/Chat/${user_id}-${uid}`)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const messages = Object.values(snapshot.val());
          this.setState((prevState) => ({
            messages: messages,
          }));
        }
      });
  };

  handleGetOwnChat = async () => {
    const {uid} = this.context.auth.user;
    const {user_id} = this.props.route.params;
    console.log(`Pengguna/Chat/${user_id}-${uid}`);
    await this.firebaseRef
      .ref(`Pengguna/Chat/${user_id}-${uid}`)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const messages = Object.values(snapshot.val());
          const newMessage = messages.filter(
            (message) => message.senderId == uid,
          );

          console.log(messages);
          this.setState((prevState) => ({
            messages: [...prevState.messages, newMessage],
          }));
        }
      });
  };

  handleGetProfile = async () => {
    const {user_id} = this.props.route.params;
    const {uid} = this.context.auth.user;
    if (user_id !== uid) {
      await this.firebaseRef
        .ref('Pengguna/Pelanggan/' + user_id)
        .on('value', (snapshot) => {
          if (snapshot.val()) {
            const {nama, profile_photo} = snapshot.val();
            this.setState((prevState) => ({
              ...prevState,
              nama,
              profile_photo,
            }));
          }
        });
    }
  };

  onSend = (messages) => {
    const {uid} = this.context.auth.user;
    const {user_id} = this.props.route.params;
    const {sendChat} = this.context.app;
    this.setState((prevState) => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));

    let date = new Date();
    sendChat(
      {
        ...messages[0],
        senderId: uid,
        receiverId: user_id,
        createdAt: `${date}`,
      },
      `${user_id}-${uid}`,
    );
  };

  render() {
    const {user_id} = this.props.route.params;
    const {nama, profile_photo} = this.state;
    const {navigation, route} = this.props;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: nama,
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
          backgroundColor="#5D89F7"
          containerStyle={{height: '10%'}}
          leftComponent={
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <Ionicons name="arrow-back" color="#fff" size={25} />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingHorizontal: 10}}>
                <Avatar
                  source={{
                    uri:
                      profile_photo ||
                      'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg',
                  }}
                  rounded
                  size={30}
                  titleStyle={{color: 'orange'}}
                />
              </TouchableOpacity>
            </View>
          }
        />
        <GiftedChat
          messages={this.state.messages.sort(
            (a, b) => getDate(b.createdAt) - getDate(a.createdAt),
          )}
          isTyping
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: user_id,
            name: nama,

            avatar:
              profile_photo ||
              'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg',
          }}
        />
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  textInputBox: {
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 0.3,
    borderRadius: 20,
    width: '80%',
    height: 35,
    marginHorizontal: 10,
    marginVertical: 7,
  },
  sendButton: {
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 7,
  },
  containerChatFunction: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderTopColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.3,
  },
  fotoButton: {},
  headerContainer: {
    flexDirection: 'row',
  },
});
