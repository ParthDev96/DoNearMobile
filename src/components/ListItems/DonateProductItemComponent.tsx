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

interface Props {
  item: PRODUCT;
  index: number;
  onPressItem: () => void;
  onPressCollect?: () => void;
}
const DonateProductItemComponent = (props: Props) => {
  const {item, onPressItem, onPressCollect} = props;

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
        <Components.TextComponent numberOfLines={1} style={styles.expiryDate}>
          {item.expiryDate}
        </Components.TextComponent>
      </View>
    );
  }, [item]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPressItem()}
      style={[styles.container, styles.containerShadow]}>
      {renderImage}
      <Components.TextComponent style={styles.title}>
        {item.title}
      </Components.TextComponent>
      <Components.TextComponent numberOfLines={2} style={styles.description}>
        {item.description}
      </Components.TextComponent>
      {onPressCollect && (
        <Components.TouchableComponent
          text={config.strings.Collect}
          onPress={onPressCollect}
          style={styles.collectButtonStyle}
          textStyle={styles.collectTextStyle}
        />
      )}
    </TouchableOpacity>
  );
};

export default DonateProductItemComponent;

const styles = StyleSheet.create({
  collectButtonStyle: {
    marginHorizontal: 15,
    borderRadius: 15,
    marginTop: 15,
    height: 40,
  },
  collectTextStyle: {
    fontSize: 15,
  },
  expiryDate: {
    fontSize: 14,
    marginHorizontal: 10,
    right: 10,
    bottom: 15,
    color: config.colors.COLOR_WHITE,
    position: 'absolute',
  },
  description: {
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productImageContainer: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productImageGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    backgroundColor: config.colors.COLOR_WHITE,
    borderRadius: 10,
    paddingBottom: 15,
  },
  containerShadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: config.colors.COLOR_APP_DARK_GRAY + '50',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 5,
          shadowOpacity: 0.2,
        }
      : {
          elevation: 7,
        },
});
