import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

const SwipeableListItem = ({item, index, onDelete, onPin, length}) => {
  const renderRightActions = () => (
    <TouchableOpacity onPress={() => onDelete(index)} style={styles.deleteBox}>
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = () => (
    <TouchableOpacity onPress={() => onPin(index)} style={styles.pinBox}>
      <Text style={styles.actionText}>{item.pinned ? 'Unpin' : 'Pin'}</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}>
      <View style={styles.listItem}>
        {item.pinned && <Text style={styles.pinnedIcon}>📌</Text>}
        <View style={styles.itemNumberStyle}>
          <Text style={styles.itemNumberText}>{length - index}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    height: '85%',
    borderRadius: 8,
    marginVertical: 8,
  },
  pinBox: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    height: '85%',
    borderRadius: 8,
    marginVertical: 8,
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    padding: 20,
  },
  itemNumberStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#efefef',
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
  },
  itemNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  pinnedIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
    fontSize: 12,
  },
});

export default SwipeableListItem;
