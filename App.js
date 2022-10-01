import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StateContext} from './State/index'
import Auth from './navigation/Auth';
import Config from './Config';
import DocApplication from './navigation/DocApplication';
import UserApplication from './navigation/UserApplication';


export default function App() {


  const [user, setUser] = useState('')


  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(Config.user);
      jsonValue != null ? setUser(JSON.parse(jsonValue)) : setUser(null);
      console.log('user details from async  ==>', jsonValue);
    } catch (e) {
      // error reading value
      console.log('error reading value from user in  ==>', e);
    }
  }


  useEffect(() => {
    getUser();
  }, [])

  if (user) {
    return (
      <StateContext.Provider value={{}}> 
        <View style={styles.container}>
          <Text>go to application</Text>
          <StatusBar style="auto" />
        </View>
      </StateContext.Provider>
    );
  } else {
    return (
      <StateContext.Provider value={{}}>
        <Auth/>
      </StateContext.Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
