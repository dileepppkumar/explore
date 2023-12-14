import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchCoinsList } from './Api';
import Header from './components/Header';
import BarrChart from './components/BarChart';
import CryptoTable from './components/Canddle';

export default function App() {
  const [data, setData] = useState([]);
  const [Cdata, setCData] = useState([]);
  const [loading, setLoading] = useState(false);

  


  // const fetchedData = async () => {
  //   setLoading(true)
  //   try {
  //     const coinsList = await fetchCoinsList();
  //     const limitedData = coinsList.slice(0, 20);

  //   setData(limitedData);
  //   setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchedCData = async () => {
  //   setLoading(true)
  //   try {
  //     const targetCurrency = 'eur';
  //     const coinsList = await fetchCoinsList(targetCurrency);
  //     setCData(coinsList);
  //     setLoading(false)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchedData();
  //   fetchedCData();

  // }, []);


  return (
    <SafeAreaView style={styles.safeContainer}>
    <View >
   <Header/>
   <CryptoTable/>
   {/* <BarrChart/> */}
      
    </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer:{
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
