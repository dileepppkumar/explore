import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const BarrChart = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets" +
            "?vs_currency=usd" +
            "&order=market_cap_desc" +
            "&per_page=20" +
            "&page=1" +
            "&sparkline=false"
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setError("Error fetching crypto data. Please try again later.");
      }
    };
  
    fetchCryptoData();
  }, []);
  
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const chartData = {
    labels: cryptoData.map((crypto) => crypto.ath_date.split('T')[0].split('-')[2]),
    datasets: [
      {
        data: cryptoData.map((crypto, index) => {
          const waveAmplitude = 10; 
          const waveFrequency = 2 * Math.PI / cryptoData.length;
          const sineWaveValue = waveAmplitude * Math.sin(waveFrequency * index);

          return crypto.market_cap_rank + sineWaveValue;
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BTC current price: <Text style={{fontWeight:'bold',fontSize:26}}>$ 42,544,566</Text></Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={350}
          height={200}
          yAxisLabel="USD"
          chartConfig={{
            backgroundGradientFrom: "black",
            backgroundGradientTo: "black",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#2a2c30",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 10,
    color:"#d9dadb"
  },
  chartContainer: {
    alignItems: "center",
  },
});

export default BarrChart;
