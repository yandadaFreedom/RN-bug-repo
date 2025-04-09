import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const ScrollDemo = () => {
  function onTouchend () {
    console.log('----------onTouchend')
  }
  return (
    <View style={styles.container} >
      <View onTouchEnd={onTouchend}>
        <View style={[
            styles.fixedItem,
            {
              zIndex: 10,
              transform: [{ translateY: 100 }],
            },
        ]}>
          <Text>zIndex item</Text>
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <Text>Item</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  item: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    width: 200,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedItem: {
    width: 200,
    height: 80,
    backgroundColor: '#ff6b6b',
    borderRadius: 10
  }
});

export default ScrollDemo;
