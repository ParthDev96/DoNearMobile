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
      conditionBGColor = config.colors.COLOR_APP_ORANGE;
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
          <Components.TextComponent numberOfLines={1} style={styles.expiryDate}>
            {getProductCondtionFromRandomNumber(item.productCondition)}
          </Components.TextComponent>
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
      <View
        // activeOpacity={0.9}
        // onPress={() => onPressItem()}
        style={[styles.container, styles.containerShadow]}>
        {renderImage}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 10,
          }}>
          <Components.TextComponent numberOfLines={1} style={styles.title}>
            {item.title}
          </Components.TextComponent>
          {onPressCollect && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onAddToCartPress}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Icon
                name="cart-plus"
                size={20}
                color={config.colors.COLOR_BLACK}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* <Components.TextComponent numberOfLines={2} style={styles.description}>
        {item.description}
      </Components.TextComponent> */}
        {/* {onPressCollect && (
          <Components.TouchableComponent
            text={config.strings.Collect}
            onPress={onAddToCartPress}
            style={styles.collectButtonStyle}
            textStyle={styles.collectTextStyle}
          />
        )} */}
      </View>
    </GestureDetector>
  );
};

export default CollectProductItemComponent;

const styles = StyleSheet.create({
  collectButtonStyle: {
    marginHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
    height: 40,
  },
  collectTextStyle: {
    fontSize: 15,
  },
  productConditionContainer: {
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    top: 10,
    position: 'absolute',
  },
  expiryDate: {
    fontSize: 14,
    color: config.colors.COLOR_WHITE,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    backgroundColor: config.colors.COLOR_WHITE,
    borderRadius: 10,
    paddingBottom: 15,
    width: (utils.Dimen.SCREEN_WIDTH - 60) / 2,
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
