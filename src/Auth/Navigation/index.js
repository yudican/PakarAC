import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AppProvider} from './AppProvider';
import {AuthProvider} from './AuthProvider';
import {CombineContext} from './Context';
import Routes from './Routes';

const Providers = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <CombineContext>
          <Routes />
        </CombineContext>
      </AuthProvider>
    </AppProvider>
  );
};

export default Providers;
