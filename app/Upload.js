import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 100,
    MaxWidth: 100,
    selectionLimit: 0,
    mediaaType: 'photo',
    includeBase64: false,
  },
};

const Upload = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState();

  const [data, setData] = useState({});

  const openCamera = async () => {
    const res = await launchCamera(options);
    if (res?.assets[0]?.uri) setImg(res);
    console.log(parseInt(res?.assets[0].fileSize) / 1024);
  };

  const handleInput = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const uploadImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('img', {
      uri: img.assets[0].uri,
      type: img.assets[0].type,
      name: img.assets[0].fileName,
    });

    formData.append('receiver_phone', data.receiver_phone);

    formData.append('sender_phone', data.sender_phone);

    await fetch('http://api.office.imrul.xyz/api/letter', {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data;',
      },
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        navigation.navigate('Details', {data: data});
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error,
          position: 'bottom',
        });
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={styles.image}
        source={{
          uri: img?.assets[0]?.uri
            ? img?.assets[0].uri
            : 'https://t4.ftcdn.net/jpg/03/02/74/89/360_F_302748918_Vs76DTDodjhhkYuCEFahu0LcoDZkBuaW.jpg',
        }}
      />
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttontxt}>
          {img?.assets[0]?.uri ? 'Take Another' : 'Take a Photo'}
        </Text>
      </TouchableOpacity>

      {img?.assets[0]?.uri && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Sender Phone Number"
            keyboardType="numeric"
            onChangeText={value => handleInput('sender_phone', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Receiver Phone Number"
            keyboardType="numeric"
            onChangeText={value => handleInput('receiver_phone', value)}
          />
        </View>
      )}

      {data?.sender_phone?.length && data?.receiver_phone?.length && (
        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.buttontxt}>Upload</Text>
        </TouchableOpacity>
      )}

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    height: 35,
    width: 120,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    margin: 5,
    textAlign: 'center',
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

export default Upload;
