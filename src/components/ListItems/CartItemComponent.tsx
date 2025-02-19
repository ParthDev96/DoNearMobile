import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {PRODUCT} from '../../types/Products';
import Components from '..';
import config from '../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getProductCondtionFromRandomNumber} from '../../utils/StaticData';

interface Props {
  item: PRODUCT;
  index: number;
  onDeletePress: () => void;
}

const CartItemComponent = (props: Props) => {
  const {item, onDeletePress} = props;
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.productImage}
        resizeMode="cover"
        source={item.image}
      />
      <View style={styles.centerContainer}>
        <Components.TextComponent numberOfLines={1} style={styles.title}>
          {item.title}
        </Components.TextComponent>
        <Components.TextComponent
          numberOfLines={1}
          style={styles.productContidion}>
          {getProductCondtionFromRandomNumber(item.productCondition)}
        </Components.TextComponent>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          onDeletePress();
        }}
        style={styles.deleteContainer}>
        <Icon
          name="delete-outline"
          size={28}
          color={config.colors.COLOR_BLACK}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartItemComponent;

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: 15,
  },

  productContidion: {
    fontSize: 14,
    marginTop: 2,
    color: config.colors.COLOR_APP_LIGHT_GRAY,
  },

  productImage: {
    width: 60,
    height: '100%',
    borderRadius: 10,
  },
  centerContainer: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: 15,
    flex: 1,
  },
  deleteContainer: {
    height: '100%',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: 60,
    backgroundColor: config.colors.COLOR_WHITE,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: config.colors.COLOR_APP_BROWN,
    borderRadius: 10,
  },
});
