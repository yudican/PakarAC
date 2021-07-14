import React, {createContext, useState} from 'react';
import {db} from '../../database/config';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, navigation) => {
          try {
            await db.app
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then((res) => {
                console.log(res, email, password);
              });
          } catch (e) {
            Alert.alert(
              'Login Gagal',
              'Periksan kembali email dan password anda',
            );
          }
        },
        register: async (email, password, rePassword, navigation) => {
          if (password == rePassword) {
            try {
              await db.app
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                  db.app
                    .database()
                    .ref('Pengguna/Penyedia_Jasa/' + res.user.uid)
                    .set({
                      email: email,
                      status: 'pending',
                    })
                    .then((data) => {
                      Alert.alert('Selamat', 'Anda berhasil mendaftar');
                    });
                });
            } catch (e) {
              alert(
                'Email sudah terdaftar atau tidak memenuhi syarat , mohon cek kembali',
              );
            }
          } else {
            Alert.alert('Daftar Gagal', 'Masukkan ulang password salah');
          }
        },
        registerGoogle: async (user) => {
          try {
            await db.app
              .auth()
              .createUserWithEmailAndPassword(user.email, user.id)
              .then((res) => {
                db.app
                  .database()
                  .ref('Pengguna/Penyedia_Jasa/' + res.user.uid)
                  .set({
                    email: user.email,
                    nama: user.name,
                    profile_photo: user.photo,
                    status: 'pending',
                  })
                  .then((data) => {
                    Alert.alert('Selamat', 'Anda berhasil mendaftar');
                  });
              });
          } catch (e) {
            alert(
              'Email sudah terdaftar atau tidak memenuhi syarat , mohon cek kembali',
            );
          }
        },
        registerDetail: async (data, userUid, navigation) => {
          await db.app
            .database()
            .ref('Pengguna/Penyedia_Jasa/' + userUid)
            .update(data)
            .then((data) => {
              db.app
                .database()
                .ref(
                  `Pengguna/Penyedia_Jasa/${userUid}/Laporan-Keuangan/Bulan-${new Date().getMonth()}-${new Date().getFullYear()}`,
                )
                .set({pendapatan: 0, biayaAdmin: 0, status: 'Perlu Dibayar'});
              Alert.alert(
                'Berhasil',
                'Akun anda sedang ditinjau. mohon tunggu',
              );
              navigation.replace('SignUpPending');
            });
        },
        sendEmailResetPaasword: async (email) => {
          try {
            await db.app
              .auth()
              .sendPasswordResetEmail(email)
              .then(async () => {
                Alert.alert('Email Terkirim', 'Silahkan cek email anda.');
              });
          } catch (e) {
            Alert.alert('Error', 'Email salah atau tidak terdaftar');
          }
        },
        updatePassword: async (email, password, newPassword, navigation) => {
          if (password == '' || newPassword == '') {
            Alert.alert('Informasi', 'Silahkan isi semua form yang tersedia.');
          } else {
            await db.app
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                db.app
                  .auth()
                  .currentUser.updatePassword(newPassword)
                  .then(async () => {
                    Alert.alert('Berhasil', 'Kata sandi baru telah diupdate.');

                    navigation.goBack();
                  });
              })
              .catch(() => {
                Alert.alert('Error', 'Kata sandi yang anda masukkan salah');
              });
          }
        },
        logout: async (navigation = null) => {
          try {
            await db.app
              .auth()
              .signOut()
              .then(async () => {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                setUser(null);
              });
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
