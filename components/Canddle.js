import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator, ScrollView, Image, ProgressBarAndroidBase, ProgressBarAndroid } from 'react-native';

const PAGE_SIZE = 20;


const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${PAGE_SIZE}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`
        );

        if (!response.ok) {
          
            
            throw new Error('Failed to fetch data. Please check your network connection.');
          
        }

        const data = await response.json();

        if (page === 1) {
          if (Array.isArray(data)) {
            setCryptoData([...data]);
          } else {
            console.error('Invalid data structure:', data);
          }
        } else {
          setCryptoData((prevData) => [...prevData, ...data]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getColorAndSymbol = (percentage) => {
    const color = percentage < 1 ? 'red' : 'green';
    const symbol = percentage < 1 ? '▼' : '▲';
    return { color, symbol };
  };

  const renderCryptoItem = ({ item }) => {
    const { color: color1h, symbol: symbol1h } = getColorAndSymbol(
      item.price_change_percentage_1h_in_currency
    );
    const { color: color24h, symbol: symbol24h } = getColorAndSymbol(
      item.price_change_percentage_24h_in_currency
    );
    const { color: color7d, symbol: symbol7d } = getColorAndSymbol(
      item.price_change_percentage_7d_in_currency
    );

    const formatPrice = (price) => parseFloat(price).toFixed(3);

    return (
      <View style={styles.row} key={item.id || index.toString()}>
      < View style={[styles.cell,{display:'flex',flexDirection:'row',gap:10}]}>
          <Image source={{ uri: item.image }} style={[styles.image,{padding:10}]} />
        <Text style={{color:'white'}} >
             {item.name}
        </Text>
      </View>
        <Text style={styles.cell}>{formatPrice(item.current_price)}</Text>
        <Text style={[styles.cell, { color: color1h }]}>{`${symbol1h} ${item.price_change_percentage_1h_in_currency.toFixed(2)}%`}</Text>
        <Text style={[styles.cell, { color: color24h }]}>{`${symbol24h} ${item.price_change_percentage_24h_in_currency.toFixed(2)}%`}</Text>
        <Text style={[styles.cell, { color: color7d }]}>{`${symbol7d} ${item.price_change_percentage_7d_in_currency.toFixed(2)}%`}</Text>
       
        <View style={styles.cell}>
        <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
    <Text style={{color:'white'}}>{item.atl.toFixed(2)}B</Text>
    <Text style={{color:'white'}}>{item.price_change_24h.toFixed(2)}B</Text>
    </View>
    <ProgressBarAndroid
      styleAttr="Horizontal"
      color='darkgrey'
      indeterminate={false}
      progress={item.atl}
    />
  </View>
  <View style={styles.cell}>
        <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
    <Text style={{color:'white'}}>{item.price_change_24h.toFixed(2)}M</Text>
    <Text style={{color:'white'}}>{item.high_24h.toFixed(2)}M</Text>
    </View>
    <ProgressBarAndroid
      styleAttr="Horizontal"
      color='darkgrey'
      indeterminate={false}
      progress={item.atl}
    />
  </View>
      </View>
    );
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Price</Text>
          <Text style={styles.headerCell}>1h%</Text>
          <Text style={styles.headerCell}>24h%</Text>
          <Text style={styles.headerCell}>7d%</Text>
          <Text style={styles.headerCell}>24h Volume</Text>
          <Text style={styles.headerCell}>Total Supply</Text>
        </View>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={cryptoData}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={renderCryptoItem}
            ListFooterComponent={() =>
              loading ? <ActivityIndicator size="large" color="#03AE9D" /> : null
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
          />
        )}
        {!loading && !error && (
          <Button title="Load More" onPress={handleLoadMore} disabled={loading} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    gap:4,
    padding: 15,
    color: 'white',
    borderWidth: 1,
    backgroundColor: '#191B1F',
    height: 70,
    width: 200,
  },
  headerCell: {
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#191B1F',
    borderWidth: 1,
    height: 50,
    color: 'white',
    width: 100,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default CryptoTable;
