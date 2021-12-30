import AsyncStorage from "@react-native-async-storage/async-storage";

export class LocalStorage {
  async getItem(key: string): Promise<any> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  async setItem(key: string, data: any) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  }

  async clear() {
    await AsyncStorage.clear();
  }
}

export const localStorage = new LocalStorage();
