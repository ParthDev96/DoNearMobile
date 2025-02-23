import React, {useMemo} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {PRODUCT} from '../../types/Products';
import config from '../../config';
import Components from '..';
import LinearGradient from 'react-native-linear-gradient';
import utils from 'src/utils';

interface Props {
  item: PRODUCT;
  index: number;
  onPressItem: () => void;
}
const DonateProductItemComponent = (props: Props) => {
  const {item, onPressItem} = props;

  const renderImage = useMemo(() => {
    return (
      <View style={styles.productImageContainer}>
        <Image
          style={styles.productImage}
          resizeMode="cover"
          source={item.image}
        />
        <LinearGradient
          style={styles.productImageGradient}
          colors={[
            config.colors.COLOR_TRANSPARENT,
            config.colors.COLOR_TRANSPARENT,
            config.colors.COLOR_APP_DARK_GRAY,
          ]}
        />
        <Components.CustomText numberOfLines={1} style={styles.expiryDate}>
          {item.expiryDate}
        </Components.CustomText>
      </View>
    );
  }, [item]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPressItem()}
      style={[styles.container, styles.containerShadow]}>
      {renderImage}
      <Components.CustomText style={styles.title}>
        {item.title}
      </Components.CustomText>
      <Components.CustomText numberOfLines={2} style={styles.description}>
        {item.description}
      </Components.CustomText>
    </TouchableOpacity>
  );
};

export default DonateProductItemComponent;

const styles = StyleSheet.create({
  expiryDate: {
    fontSize: utils.normalize(14),
    marginHorizontal: utils.normalize(10),
    right: utils.normalize(10),
    bottom: utils.normalize(15),
    color: config.colors.COLOR_WHITE,
    position: 'absolute',
  },
  description: {
    fontSize: utils.normalize(13),
    lineHeight: utils.normalize(17),
    marginHorizontal: utils.normalize(10),
    marginTop: utils.normalize(5),
    fontFamily: config.font.NotoSansRegular,
  },
  title: {
    fontSize: utils.normalize(15),
    marginHorizontal: utils.normalize(10),
    marginTop: utils.normalize(10),
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: utils.normalize(10),
    borderTopRightRadius: utils.normalize(10),
  },
  productImageContainer: {
    width: '100%',
    height: utils.normalize(170),
    borderTopLeftRadius: utils.normalize(10),
    borderTopRightRadius: utils.normalize(10),
  },
  productImageGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    backgroundColor: config.colors.COLOR_WHITE,
    borderRadius: utils.normalize(10),
    paddingBottom: utils.normalize(15),
    marginRight: utils.normalize(15),
    width:
      (utils.dimension.SCREEN_WIDTH -
        utils.normalize(utils.dimension.isPad ? 45 : 30)) /
      (utils.dimension.isPad ? 2 : 1),
  },
  containerShadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: config.colors.COLOR_APP_DARK_GRAY + '50',
          shadowOffset: {width: 0, height: utils.normalize(5)},
          shadowRadius: utils.normalize(5),
          shadowOpacity: 0.2,
        }
      : {
          elevation: utils.normalize(7),
        },
});
