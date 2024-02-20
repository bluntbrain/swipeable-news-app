import axios from 'axios';
import {NEWS_API_KEY, NEWS_API_URL} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateId = () =>
  `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

export const fetchAndStoreHeadlines = async () => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      headers: {Authorization: `Bearer ${NEWS_API_KEY}`},
    });
    const headlines = response.data.articles;
    const headlinesWithId = headlines.map(article => ({
      ...article,
      id: generateId(),
    }));

    await AsyncStorage.setItem('headlines', JSON.stringify(headlinesWithId));
    console.log('Headlines fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching or storing headlines:', error);
  }
};

export const updateStoredHeadlines = async headlines => {
  try {
    await AsyncStorage.setItem('headlines', JSON.stringify(headlines));
  } catch (error) {
    console.error('Error updating headlines in storage:', error);
  }
};

export const getStoredHeadlines = async () => {
  try {
    const headlinesString = await AsyncStorage.getItem('headlines');
    return headlinesString != null ? JSON.parse(headlinesString) : [];
  } catch (error) {
    console.error('Error fetching headlines from storage:', error);
    return [];
  }
};
