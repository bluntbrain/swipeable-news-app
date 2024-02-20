import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SwipeableListItem from '../../components/SwipeableListItem';
import useHomeScreen from './useHomeScreen';

const HomeScreen = () => {
  const {
    sortedHeadlines,
    refreshing,
    countdown,
    onRefresh,
    deleteItem,
    pinItem,
  } = useHomeScreen();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>Top Headlines</Text>
          <Text style={styles.headlinesShown}>
            Headlines Shown: {sortedHeadlines.length}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.timer}>Refreshing in:</Text>
          <Text style={styles.timer}>{countdown} secs</Text>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sortedHeadlines}
        keyExtractor={(item, index) => 'key' + index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item, index}) => (
          <SwipeableListItem
            item={item}
            index={index}
            onDelete={deleteItem}
            onPin={pinItem}
            length={sortedHeadlines.length}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timer: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    color: '#000',
  },
  listItem: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  headlinesShown: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
});
