import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import * as RootNavigation from 'src/routes/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState, useAppSelector} from 'src/redux/store';
import config from 'src/config';
import utils from 'src/utils';

const CartButton = () => {
  const storeProducts = useAppSelector(
    (state: RootState) => state.cartSlice.products,
  );

  return (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.navigate('Cart', {});
      }}
      activeOpacity={0.7}
      style={styles.cartButton}>
      <Icon
        name="cart-variant"
        size={utils.normalize(25)}
        color={config.colors.COLOR_BLACK}
      />
      {storeProducts.length > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeCount}>{storeProducts.length + ''}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  badgeCount: {
    fontSize: utils.normalize(10),
    fontFamily: undefined,
    fontWeight: '600',
    color: config.colors.COLOR_WHITE,
  },
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: utils.normalize(3),
    top: utils.normalize(3),
    borderRadius: utils.normalize(10),
    height: utils.normalize(15),
    minWidth: utils.normalize(15),
    paddingHorizontal: utils.normalize(5),
    backgroundColor: config.colors.COLOR_APP_RED,
  },
  cartButton: {
    width: utils.normalize(45),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
