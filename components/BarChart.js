import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const BarrChart = () => {
  const [cryptoData, setCryptoData] = useState([]);

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

        const data = await response.json();

        const limitedData = Object.values(data);

        setCryptoData(limitedData);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  const chartData = {
    labels: cryptoData.map((crypto) => crypto.name),
    datasets: [
      {
        data: cryptoData.map((crypto, index) => {
          // Apply a sine function to create a wave-like effect
          const waveAmplitude = 10; // Adjust the amplitude of the wave
          const waveFrequency = 2 * Math.PI / cryptoData.length; // Adjust the frequency of the wave
          const sineWaveValue = waveAmplitude * Math.sin(waveFrequency * index);

          return crypto.market_cap_rank + sineWaveValue;
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crypto Market Cap Bar Chart</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={350}
          height={200}
          yAxisLabel="USD"
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
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
    backgroundColor: "#fff",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 10,
    color:"black"
  },
  chartContainer: {
    alignItems: "center",
  },
});

export default BarrChart;
