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
  Keyboard,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CONSTANT from '../../constants';
import { API } from './../../configs/axios';
import { user } from '../../store';
import { useSnapshot } from 'valtio';

function LoginPage({ navigation }, props) {
  const logoImg = require('../../../assets/logo.png');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const onChangeId = (id) => setId(id);
  const onChangePw = (pw) => setPw(pw);
  const snapUser = useSnapshot(user);

  const login = async () => {
    setLoading(true);
    const body = new FormData();
    body.append(`email`, `${id}`);
    body.append(`password`, `${pw}`);
    try {
      const response = await API.post('auth/signin', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
        transformRequest: (formData) => formData,
      });
      await snappingUser(
        id,
        response.data.displayName,
        response.data.token
      ).then(function () {
        setLoading(false);
        navigation.reset({ routes: [{ name: 'MainPage' }] });
      });
    } catch (e) {
      setLoading(false);
      Alert.alert('아이디와 비밀번호를 확인해주세요!');
    }
  };
  const snappingUser = async (id, displayName, token) => {
    user.id = id;
    user.displayName = displayName;
    user.token = token;
  };
  const findPw = () => {
    //TODO : make modal find password
    //POST : auth/forgotPassword / BODY : email
    Alert.alert('비밀 번호 찾기');
  };
  const signUp = () => {
    navigation.navigate('SignUpPage');
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
        <Pressable
          onPress={(Keyboard.dismiss(), login)}
          style={styles.buttonLogin}
        >
          <Text style={styles.buttonLoginText}>로그인하기</Text>
        </Pressable>
        <Pressable onPress={findPw}>
          <Text style={styles.buttonFind}>비밀번호를 잊으셨나요?</Text>
        </Pressable>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <Pressable onPress={signUp} style={styles.buttonSignUp}>
          <Text style={styles.buttonSignUpText}>회원가입하러가기</Text>
        </Pressable>
      </View>
      {loading ? (
        <>
          <View style={styles.overlay}>
            <Image
              width="20"
              height="20"
              source={require('../../assets/guide/loading.gif')}
            ></Image>
          </View>
        </>
      ) : null}
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage;
