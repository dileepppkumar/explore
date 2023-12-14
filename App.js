import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import CryptoTable from './components/Canddle';
import Home from './components/Home';

export default function App() {
  
  return (
    <View style={styles.container}>
    <ScrollView>
      <Header />
      <Home/>
      <CryptoTable/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#2a2c30"
  },
 
});
