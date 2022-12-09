import { center } from '@shopify/react-native-skia';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CONSTANT from '../../constants';
import { API } from './../../configs/axios';
import { user } from '../../store';
import { useSnapshot } from 'valtio';

function SignUpPage({ navigation }, props) {
  const logoImg = require('../../../assets/logo.png');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [displayName, setName] = useState('');
  const onChangeId = (id) => setId(id);
  const onChangePw = (pw) => setPw(pw);
  const onChangeName = (displayName) => setName(displayName);
  const snapUser = useSnapshot(user);

  const signUp = async () => {
    const body = new FormData();
    body.append(`email`, `${id}`);
    body.append(`password`, `${pw}`);
    body.append(`displayName`, `${displayName}`);
    try {
      //TODO : 가이드 화면 구현
      const response = await API.post('auth/signup', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
        transformRequest: (formData) => formData,
      });
      snappingUser(id, response.data.displayName, response.data.token);
      navigation.navigate('MainPage');
      //navigation.navigate('GuideMainPage', { userInfo: userInfo });
    } catch (e) {
      Alert.alert(
        '아이디는 이메일 형식, 비밀번호는 6자 이상의 영어+숫자입니다!'
      );
      console.log(e);
    }
  };
  const snappingUser = (id, displayName, token) => {
    user.id = id;
    user.displayName = displayName;
    user.token = token;
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logoImg} />
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.loginFormContainer}
      >
        <TextInput
          placeholder="이메일"
          placeholderTextColor="rgba(0, 98, 212, 0.5)"
          value={id}
          onChangeText={onChangeId}
          style={styles.inputForm}
        ></TextInput>
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="rgba(0, 98, 212, 0.5)"
          value={pw}
          onChangeText={onChangePw}
          style={styles.inputForm}
          secureTextEntry
        ></TextInput>
        <TextInput
          placeholder="닉네임"
          placeholderTextColor="rgba(0, 98, 212, 0.5)"
          value={displayName}
          onChangeText={onChangeName}
          style={styles.inputForm}
        ></TextInput>
        <Pressable onPress={signUp} style={styles.buttonLogin}>
          <Text style={styles.buttonLoginText}>가입하기</Text>
        </Pressable>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CONSTANT.backgroundColor,
  },
  logoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginFormContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {},
  inputForm: {
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 17,
    marginBottom: 20,
    color: '#5A5A5A',
  },
  buttonLogin: {
    width: Dimensions.get('window').width / 1.2,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    backgroundColor: '#0062D4',
  },
  buttonLoginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonSignUp: {
    width: Dimensions.get('window').width / 1.2,
    marginTop: 16,
    paddingVertical: 17,
    borderWidth: 1,
    borderColor: '#0062D4',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonSignUpText: {
    fontWeight: 'bold',
    color: '#0062D4',
    fontSize: 16,
  },
  buttonFind: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0062D4',
  },
});

export default SignUpPage;
