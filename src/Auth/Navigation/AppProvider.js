import React, {createContext, useState} from 'react';
import {db} from '../../database/config';
import {Alert, ToastAndroid} from 'react-native';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import messaging from '@react-native-firebase/messaging';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  return (
    <AppContext.Provider
      value={{
        updateProfile: async (data, userUid, navigation) => {
          try {
            await db.app
              .database()
              .ref('Pengguna/Penyedia_Jasa/' + userUid)
              .update(data)
              .then((data) => {
                ToastAndroid.showWithGravityAndOffset(
                  'Profile Berhasil Diupdate',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
                navigation.navigate('Home', {screen: 'Profil'});
              });
          } catch (e) {
            Alert.alert('Error', 'Terjadi Kesalahan');
          }
        },
        updateSpanduk: async (data, userUid) => {
          try {
            await db.app
              .database()
              .ref('Pengguna/Penyedia_Jasa/' + userUid)
              .update(data)
              .then((data) => {
                ToastAndroid.showWithGravityAndOffset(
                  'Spanduk Berhasil Diupdate',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              });
          } catch (e) {
            Alert.alert('Error', 'Terjadi Kesalahan');
          }
        },
        tambahJasa: async (data, uid, navigation) => {
          try {
            await db.app
              .database()
              .ref(`Pengguna/Penyedia_Jasa/${uid}/Data_Jasa/${uuid.v4()}`)
              .set(data)
              .then((data) => {
                ToastAndroid.showWithGravityAndOffset(
                  'Jasa Berhasil Ditambah',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
                navigation.navigate('KelolaJasa');
              });
          } catch (e) {
            Alert.alert('Error', 'Terjadi Kesalahan');
          }
        },
        sendChat: async (messages, uid) => {
          await db.app
            .database()
            .ref(`Pengguna/Chat/${uid}/${uuid.v4()}`)
            .set(messages)
            .then((data) => {
              console.log(data);
            });
        },
        getReceiverChat: (uid) => {
          let sender = {};
          db.app
            .database()
            .ref(`Pengguna/Pelanggan/${uid}`)
            .on('value', (snapshot) => {
              sender = snapshot.val() || {};
            });
          return sender;
        },
        updateOrder: async (data, trxId, msg) => {
          await db.app
            .database()
            .ref(`Pengguna/Pesanan/${trxId}`)
            .update(data)
            .then((data) => {
              ToastAndroid.showWithGravityAndOffset(
                msg || 'Pesanan Berhasil Di Konfirmasi',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            });
        },
        addNotification: async (data, uid_pelanggan) => {
          await db.app
            .database()
            .ref(`Pengguna/Pelanggan/${uid_pelanggan}/Notifikasi/${uuid.v4()}`)
            .set(data);

          await db.app
            .database()
            .ref(`Pengguna/Pelanggan/${uid_pelanggan}}`)
            .once('value', (snapshot) => {
              if (snapshot.val()) {
                const {fcmToken} = snapshot.val();
                if (fcmToken) {
                  messaging().sendToDevice(fcmToken, {
                    notification: {
                      title: data.nama,
                      body: data.title,
                    },
                  });
                }
              }
            });
        },
        addOwnNotification: async (data, uid) => {
          await db.app
            .database()
            .ref(`Pengguna/Penyedia_Jasa/${uid}/Notifikasi/${uuid.v4()}`)
            .set(data);
        },
        sendPaymentAdmin: async (data, uid, pembayaran_id, navigation) => {
          await db.app
            .database()
            .ref(`Pengguna/Penyedia_Jasa/${uid}/Pembayaran/${pembayaran_id}`)
            .set(data)
            .then(() => navigation.replace('Home', {screen: 'Profil'}));
        },
        uploadImage: async (uri, fileName, path) => {
          const imageRef = storage().ref(`${path}/${fileName}`);
          await imageRef
            .putFile(uri.replace('file:///', 'file:/'), {
              contentType: 'image/jpg',
            })
            .then((res) => console.log(res))
            .catch((error) => {
              console.log(error);
            });
          const url = await imageRef.getDownloadURL().catch((error) => {
            throw error;
          });

          return url;
        },
      }}>
      {children}
    </AppContext.Provider>
  );
};
