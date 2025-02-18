import React, {useCallback, useMemo, useRef} from 'react';
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
import utils from '../../utils';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {getProductCondtionFromRandomNumber} from '../../utils/StaticData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  item: PRODUCT;
  index: number;
  onPressItem: () => void;
  onPressCollect?: () => void;
}

const CollectProductItemComponent = (props: Props) => {
  const {item, onPressItem, onPressCollect} = props;
  const addToCartTapped = useRef<boolean>(false);

  const renderImage = useMemo(() => {
    var conditionBGColor = config.colors.COLOR_PRIMARY;
    if (item.productCondition === 1) {
      conditionBGColor = config.colors.COLOR_APP_RED;
    } else if (item.productCondition === 2) {
      conditionBGColor = config.colors.COLOR_PRIMARY;
    }
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
            config.colors.COLOR_APP_DARK_GRAY,
            config.colors.COLOR_TRANSPARENT,
            config.colors.COLOR_TRANSPARENT,
          ]}
        />
        <View
          style={[
            styles.productConditionContainer,
            {backgroundColor: conditionBGColor},
          ]}>
          <Components.CustomText numberOfLines={1} style={styles.badgeText}>
            {getProductCondtionFromRandomNumber(item.productCondition)}
          </Components.CustomText>
        </View>
      </View>
    );
  }, [item]);

  const singleTap = Gesture.Tap()
    .maxDuration(150)
    .onStart(() => {
      console.log('Single tap!');
      if (addToCartTapped.current) {
        addToCartTapped.current = false;
      } else {
        onPressItem();
      }
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      console.log('Double tap!');
      if (addToCartTapped.current) {
        addToCartTapped.current = false;
      } else {
        if (onPressCollect) {
          onPressCollect();
        }
      }
    });

  const onAddToCartPress = useCallback(() => {
    addToCartTapped.current = true;
    if (onPressCollect) {
      onPressCollect();
    }
  }, [onPressCollect]);

  return (
    <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
      <View style={[styles.container, styles.containerShadow]}>
        {renderImage}
        <View style={styles.bottomContainer}>
          <Components.CustomText numberOfLines={1} style={styles.title}>
            {item.title}
          </Components.CustomText>
          {onPressCollect && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onAddToCartPress}
              style={styles.collectContainer}>
              <Icon
                name="cart-plus"
                size={utils.normalize(20)}
                color={config.colors.COLOR_BLACK}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </GestureDetector>
  );
};

export default CollectProductItemComponent;

const styles = StyleSheet.create({
  collectContainer: {
    width: utils.normalize(30),
    height: utils.normalize(30),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: utils.normalize(10),
    marginTop: utils.normalize(10),
  },
  productConditionContainer: {
    right: 0,
    paddingHorizontal: utils.normalize(10),
    paddingVertical: utils.normalize(5),
    borderTopLeftRadius: utils.normalize(20),
    borderBottomLeftRadius: utils.normalize(20),
    top: utils.normalize(10),
    position: 'absolute',
  },
  badgeText: {
    fontSize: utils.normalize(14),
    color: config.colors.COLOR_WHITE,
  },
  title: {
    fontSize: utils.normalize(15),
    fontFamily: config.font.NotoSansMedium,
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: utils.normalize(10),
    borderTopRightRadius: utils.normalize(10),
  },
  productImageContainer: {
    width: '100%',
    height: utils.normalize(150),
    borderTopLeftRadius: utils.normalize(10),
    borderTopRightRadius: utils.normalize(10),
  },
  productImageGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderTopLeftRadius: utils.normalize(10),
    borderTopRightRadius: utils.normalize(10),
  },
  container: {
    backgroundColor: config.colors.COLOR_WHITE,
    borderRadius: utils.normalize(10),
    paddingBottom: utils.normalize(10),
    marginRight: utils.normalize(15),
    width:
      (utils.dimension.SCREEN_WIDTH -
        utils.normalize(utils.dimension.isPad ? 60 : 45)) /
      (utils.dimension.isPad ? 3 : 2),
  },
  containerShadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: config.colors.COLOR_APP_DARK_GRAY + '50',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: utils.normalize(5),
          shadowOpacity: 0.2,
        }
      : {
          elevation: 7,
        },
});
