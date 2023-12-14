import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text,TouchableOpacity } from "react-native";
import { BarChart } from "react-native-chart-kit";


const CandleChart = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [tooltipData, setTooltipData] = useState(null);
  const [error, setError] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
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
        setError("    Error fetching crypto data. Please try again later.");
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
        data: cryptoData.map((crypto) => crypto.market_cap_change_24h),
      },
    ],
  };
  const handleTooltipPress = (value) => {
    setTooltipData({ value });
    setTooltipVisible(true);
  };

  const handleChartPress = () => {
    setTooltipVisible(false);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleChartPress} style={styles.container}>
      <Text style={styles.header}>BTC 24h volume: <Text style={{fontWeight:'bold',fontSize:26}}>$ {cryptoData[0]?.total_volume}</Text></Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={350}
          height={175}
          yAxisLabel="USD"
          chartConfig={{
            backgroundGradientFrom: "black",
            backgroundGradientTo: "black",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
          onDataPointPress={({ value }) => handleTooltipPress(value)}
        />
        {tooltipVisible && tooltipData && (
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>{`Value: $${tooltipData.value}`}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
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
    color: "#d9dadb",
  },
  chartContainer: {
    alignItems: "center",
    overflow:"scroll"
  },
  tooltipContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
  },
  tooltipText: {
    fontSize: 14,
  },
  
});

export default CandleChart;
