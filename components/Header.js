import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';

const Subheader = ({ coinsCount }) => {
  return (
    <View style={styles.subheader}>
      <View style={styles.subheaderLeft}>
        <View style={styles.subheaderItem}>
          
          <Text style={styles.subheaderText}>Coins: ${coinsCount[0]?.current_price}</Text>
        </View>

        <View style={styles.subheaderItem}>
          <Text style={styles.subheaderText}> Exchanges: 458</Text>
        </View>
      </View>

      <View style={styles.subheaderItem}>
        <Text style={[styles.subheaderText, styles.greenText]}>
          ${coinsCount[0]?.atl}T{' '}
        </Text>
      </View>
      <View style={styles.subheaderRight}>
      

        <View style={styles.subheaderItem}>
          <Text style={styles.subheaderText}> <Image style={[styles.cryptoImage, { width: 20, height: 20 }]} source={{uri:coinsCount[0]?.image}} />Bitcoin 46%</Text>
          <Text style={styles.subheaderText}> <Image style={[styles.cryptoImage, { width: 20, height: 20 }]} source={{uri:coinsCount[1]?.image}} />Ethereum 32%</Text>

          
        </View>
      </View>

    </View>
  );
};
const Header = () => {
  const [coin, setCoinData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets' +
            '?vs_currency=usd' +
            '&order=market_cap_desc' +
            '&per_page=20' +
            '&page=1' +
            '&sparkline=false'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setCoinData(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Coins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Portfolio</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
      </View>

      <Subheader coinsCount={coin} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: '#191B1F',
    marginTop: '20px',
  },
  button: {
    padding: 10,
    border:'1px solid white',
    borderRadius:2
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    paddingLeft: 10,
    textAlign:'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
  },
  subheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#303135',
    paddingVertical: 10,
    paddingHorizontal: 16,
    textAlign:'left'

  },
  subheaderLeft: {
    flexDirection: 'column',
    paddingTop:10,
    gap:10,
    textAlign:'left'
  },
  subheaderRight: {
    flexDirection: 'column',
    top:0
  },
  
  subheaderText: {
    color: '#d9dadb',
    fontSize: 8,
  },
  greenText: {
    color: 'green',
  },
  downSymbol: {
    fontSize: 12,
    marginTop:'3px',
    padding:10
  },
  cryptoImage: {
    margin:4
  },
});

export default Header;
