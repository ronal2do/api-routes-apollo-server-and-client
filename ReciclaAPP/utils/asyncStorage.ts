import AsyncStorage from '@react-native-async-storage/async-storage';

export const APP_KEYS = {
  LOGIN: '@@_APP_TOKEN_NEW',
  CURSOR: '@@_QUESTION_CURSOR',
  LIST: '@@_QUESTION_LIST',
  NEXT_PAGE: '@@_NEXT_PAGE'
}

export const clearStorage = async (): Promise<void> => {
  // const keys = await AsyncStorage.getAllKeys()

  await AsyncStorage.multiRemove([APP_KEYS.CURSOR, APP_KEYS.NEXT_PAGE, APP_KEYS.LIST]);
}

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(APP_KEYS.LOGIN);
  } catch (error) {

  }
}

