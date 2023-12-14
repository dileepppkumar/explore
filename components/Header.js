import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Header = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#191B1F', 
    marginTop:'20px',
  },
  button: {
    padding: 10,
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff', // You can change the color
    color: '#fff', // You can change the color
  },
});

export default Header;
