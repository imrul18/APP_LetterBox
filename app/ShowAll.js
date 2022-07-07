import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator
} from 'react-native';
import moment from 'moment';

const ShowAll = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();

  const getData = async () => {
    let res = await axios.get('http://api.office.imrul.xyz/api/letter');
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const searchFilter = val => {
    const filter = data.filter(item => {
      let str = item?.name;
      return str.toLowerCase().includes(val.toLowerCase());
    });
    setSearchData(filter);
  };

  useEffect(() => {
    searchFilter('');
  }, [data]);

  const Cardlist = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('Details', {data: item});
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.cardtitle}>
            <Image style={styles.image} source={{uri: item?.img}} />
          </View>
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbox}>
        <TextInput
          onChangeText={val => searchFilter(val)}
          style={styles.searchtext}
          placeholder="Search"
        />
      </View>
      <View style={styles.showemployee}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchData}
          renderItem={Cardlist}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.loginModalView}>
          <ActivityIndicator size="large" color="red" />
          <Text>Please Wait...</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
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
  image: {
    height: 70,
    width: 60,
    borderRadius: 10,
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
  loginModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 280,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7f7f7f',
  },
});

export default ShowAll;
