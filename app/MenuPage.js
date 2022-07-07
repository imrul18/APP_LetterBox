import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MenuPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Upload')}}>
        <Text style={styles.buttontxt}>Upload New</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Show All')}}>
        <Text style={styles.buttontxt}>Show All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    height: 35,
    width: 120,
    margin: 10,
    borderRadius: 10,
    alignItems:'center',
    justifyContent: 'center'
  },
  buttontxt:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize:16
  }
});

export default MenuPage;
