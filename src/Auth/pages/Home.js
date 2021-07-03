import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Card, Header, ListItem} from 'react-native-elements';
import {db} from '../../database/config';

export default class Beranda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listParfum: [],
      keyParfum: [],
    };
  }

  componentDidMount() {
    db.app
      .database()
      .ref('Parfum')
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let parfumItem = {...data};

        this.setState({
          listParfum: parfumItem,
          keyParfum: Object.keys(parfumItem),
        });
      });
  }

  render() {
    console.log('listParfum : ', this.state.listParfum);
    console.log('keyParfum : ', this.state.keyParfum);
    const {listParfum, keyParfum} = this.state;
    return (
      <View>
        <Header
          centerComponent={{text: 'Beranda', style: {color: '#fff'}}}
          ackgroundColor="#3CABBB"
        />
        <View>
          <Card style={{borderRadius: 100}}>
            <Card.Title>Daftar Parfum Impian</Card.Title>
            <Card.Divider />
            {keyParfum.length > 0 ? (
              keyParfum.map((key) => (
                <TouchableOpacity>
                  <ListItem key={key} bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>
                        {listParfum[key].namaParfum}
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        Rp. {listParfum[key].harga}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                </TouchableOpacity>
              ))
            ) : (
              <Card>
                <Text>Daftar Masih Kosong</Text>
              </Card>
            )}
          </Card>
        </View>
      </View>
    );
  }
}
