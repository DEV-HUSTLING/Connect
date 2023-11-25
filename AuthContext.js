import { View, Text } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user auth changed', user&&user.email);
      setUser(user);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);
  const value = {
    user,
    initialized,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
