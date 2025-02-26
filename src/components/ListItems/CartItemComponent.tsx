import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {PRODUCT} from '../../types/Products';
import config from '../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getProductCondtionFromRandomNumber} from '../../utils/StaticData';
import CustomText from '../CustomText';
import utils from 'src/utils';

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
        <CustomText numberOfLines={2} style={styles.title}>
          {item.title}
        </CustomText>
        <CustomText numberOfLines={1} style={styles.productContidion}>
          {getProductCondtionFromRandomNumber(item.productCondition)}
        </CustomText>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          onDeletePress();
        }}
        style={styles.deleteContainer}>
        <Icon
          name="delete-outline"
          size={utils.normalize(28)}
          color={config.colors.COLOR_BLACK}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartItemComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: utils.normalize(15),
    lineHeight: utils.normalize(20),
  },

  productContidion: {
    fontSize: utils.normalize(14),
    marginTop: utils.normalize(2),
    color: config.colors.COLOR_APP_LIGHT_GRAY,
  },

  productImage: {
    width: utils.normalize(100),
    height: '100%',
    borderRadius: utils.normalize(10),
  },
  centerContainer: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: utils.normalize(15),
    flex: 1,
  },
  deleteContainer: {
    height: '100%',
    width: utils.normalize(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: utils.normalize(100),
    backgroundColor: config.colors.COLOR_WHITE,
    flexDirection: 'row',
    borderWidth: utils.normalize(1),
    borderColor: config.colors.COLOR_APP_BROWN,
    borderRadius: utils.normalize(10),
  },
});
