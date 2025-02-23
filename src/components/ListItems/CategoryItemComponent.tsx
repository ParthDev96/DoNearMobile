import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import config from 'src/config';
import utils from 'src/utils';

type Props = {
  onCategoryPress: (item: any) => void;
  item: any;
};
const CategoryItemComponent = ({item, onCategoryPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onCategoryPress(item)}
      activeOpacity={0.7}
      style={styles.itemContainer}>
      <Image source={item.icon} resizeMode="contain" style={styles.icon} />
      <CustomText style={styles.labelText}>{item.label}</CustomText>
    </TouchableOpacity>
  );
};

export default CategoryItemComponent;

const styles = StyleSheet.create({
  labelText: {
    fontSize: utils.normalize(16),
    lineHeight: utils.normalize(20),
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: utils.normalize(10),
    paddingVertical: utils.normalize(20),
    margin: utils.normalize(10),
    borderRadius: utils.normalize(20),
    backgroundColor: config.colors.COLOR_WHITE,
  },
  icon: {
    width: utils.normalize(70),
    height: utils.normalize(70),
    marginBottom: utils.normalize(20),
  },
});
