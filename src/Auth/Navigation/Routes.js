import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {db} from '../../database/config';
import {AuthContext} from './AuthProvider';
import Splash from '../../Splash/Splash';
import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = (props) => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [status, setStatus] = useState(null); // accountStatus = pending || rejected || accepted || checking
  const [loading, setLoading] = useState(false);

  const onAuthStateChanged = (user) => {
    setUser(user);
    checkAccountStatus(user);
    user && requestUserPermission(user.uid);
    if (initializing) setInitializing(false);
  };

  const checkAccountStatus = async (user) => {
    if (user) {
      await db.app
        .database()
        .ref(`Pengguna/Penyedia_Jasa/${user.uid}`)
        .once('value', (querySnapShot) => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          setStatus(data.status);
        });
    }
  };

  const requestUserPermission = async (uid) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      console.log(uid);
      if (fcmToken) {
        await db.app
          .database()
          .ref(`Pengguna/Penyedia_Jasa/${uid}`)
          .update({fcmToken});
      }
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const {body, title} = remoteMessage.notification;
      Notifications.postLocalNotification({
        body,
        title,
        fireDate: new Date(),
      });
    });
    const subscriber = db.app.auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  if (initializing) return <Splash />;
  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack initialRouteName={'Login'} />
      </NavigationContainer>
    );
  }

  if (status === null) return <Splash />;

  //   if account status 'pending'
  if (status == 'pending') {
    return (
      <NavigationContainer>
        <AuthStack initialRouteName={'Signupdetail'} />
      </NavigationContainer>
    );
  }

  if (status == 'checking') {
    return (
      <NavigationContainer>
        <AuthStack initialRouteName={'SignUpPending'} />
      </NavigationContainer>
    );
  }

  if (status == 'rejected') {
    return (
      <NavigationContainer>
        <AuthStack initialRouteName={'SignUpRejected'} />
      </NavigationContainer>
    );
  }

  if (status === 'accepted' || status === 'active') {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  }
};

export default Routes;
