import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import moment from 'moment';

const Show = ({navigate, route}) => {
  const item = route.params.data;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: item?.img}} />
      <View style={styles.card}>
        <View style={styles.cardtitle}>
          <Text>ID</Text>
          <Text>Upload Date</Text>
          <Text>Upload Time</Text>
          <Text>Sender Number</Text>
          <Text>Receiver Number</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{item?.name}</Text>
          <Text>{moment(item?.created_at).format('YYYY-MM-DD')}</Text>
          <Text>{moment(item?.created_at).format('hh:mm A')}</Text>
          <Text>{item?.sender_phone}</Text>
          <Text>{item?.receiver_phone}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 10,
  },

  searchbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  showemployee: {
    flex: 1,
  },
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  cardtitle: {
    paddingRight: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  carddetails: {
    paddingLeft: 20,
  },
  cardactions: {
    justifyContent: 'space-between',
  },
});

export default Show;
