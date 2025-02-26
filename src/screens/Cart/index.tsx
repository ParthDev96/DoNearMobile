import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import Components from 'src/components';
import CartItemComponent from 'src/components/ListItems/CartItemComponent';
import config from 'src/config';
import {removeProductFromCart} from 'src/redux/slices/cartSlice';
import {RootState, useAppDispatch} from 'src/redux/store';
import {StackPropsType} from 'src/types/navigation';
import {PRODUCT} from 'src/types/Products';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import utils from 'src/utils';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';

const Cart = ({navigation}: StackPropsType<'Cart'>) => {
  const [cartItems, setCartItems] = useState<PRODUCT[]>([]);
  const storeProducts = useSelector(
    (state: RootState) => state.cartSlice.products,
  );
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  useEffect(() => {
    setCartItems(storeProducts);
  }, [storeProducts]);

  const onPressCheckout = useCallback(() => {}, []);

  const onDeleteItem = useCallback(
    (index: number) => {
      const items = [...cartItems];
      dispatch(removeProductFromCart(items[index]));
      items.splice(index, 1);
      setCartItems(items);
    },
    [cartItems, dispatch],
  );

  const renderItem = useCallback(
    ({item, index}: {item: PRODUCT; index: number}) => {
      return (
        <CartItemComponent
          onDeletePress={() => {
            onDeleteItem(index);
          }}
          item={item}
          index={index}
        />
      );
    },
    [onDeleteItem],
  );

  const renderItemSep = useCallback(() => {
    return <View style={styles.itemSep} />;
  }, []);

  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <FastImage
          source={config.images.ic_cart_empty}
          resizeMode="contain"
          style={styles.imagePlaceholder}
        />
        <Components.CustomText style={styles.emptyCartText}>
          {t('YourCartIsEmpty')}
        </Components.CustomText>
      </View>
    );
  }, [t]);

  const renderViews = useMemo(() => {
    return (
      <FlatList
        keyExtractor={(item, index) => index + ''}
        ItemSeparatorComponent={renderItemSep}
        renderItem={renderItem}
        data={cartItems}
        contentContainerStyle={[
          styles.flatListContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            flex: cartItems.length > 0 ? undefined : 1,
          },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
      />
    );
  }, [cartItems, renderEmptyComponent, renderItem, renderItemSep]);

  return (
    <View style={styles.container}>
      <Components.NavigationBar
        onBackPress={() => {
          navigation.goBack();
        }}
        showBack
        backgroundColor={config.colors.COLOR_TRANSPARENT}
      />
      {renderViews}
      {cartItems.length > 0 && (
        <View
          style={[
            styles.bottomContainer,
            {paddingBottom: insets.bottom + utils.normalize(15)},
          ]}>
          <Components.AppButton
            text={t('Checkout')}
            onPress={onPressCheckout}
            style={styles.submitButtonStyle}
          />
        </View>
      )}
    </View>
  );
};

export default Cart;
