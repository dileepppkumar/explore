import React from 'react'
import BarrChart from './BarChart'
import CandleChart from './CandleChart'
import { View } from 'react-native'
import CryptoTable from './Canddle'

const Home = () => {
  return (
    <View style={{display:'flex',flexDirection:"column",flexWrap:"wrap",gap:20,height:500,width:'100%',justifyContent:'center',paddingLeft:20}}>
        <BarrChart/>
        <CandleChart/>

    </View>
  )
}

export default Home