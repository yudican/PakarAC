import React, {createContext, useContext} from 'react';
import {AppContext} from './AppProvider';
import {AuthContext} from './AuthProvider';

export const RootContext = createContext();
export const CombineContext = ({children}) => {
  const auth = useContext(AuthContext);
  const app = useContext(AppContext);
  return (
    <RootContext.Provider value={{auth, app}}>{children}</RootContext.Provider>
  );
};
