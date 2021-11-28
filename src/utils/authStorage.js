import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor (namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    const token = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );

    return token;
  }

  setAccessToken(token) {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(token));
    );
  }

  removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;