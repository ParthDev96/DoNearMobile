import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import Components from '../../components';
import config from '../../config';
import {CartScreenNavigationProps} from '../../types/navigation';
import CartItemComponent from '../../components/ListItems/CartItemComponent';
import {PRODUCT} from '../../types/Products';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {removeProductFromCart} from '../../redux/slices/cartSlice';

const CartScreen = ({navigation}: CartScreenNavigationProps) => {
  const [cartItems, setCartItems] = useState<PRODUCT[]>([]);
  const insets = useSafeAreaInsets();
  const storeProducts = useSelector(
    (state: RootState) => state.cartSlice.products,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCartItems(storeProducts);
  }, []);

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
        <Image
          source={config.images.ic_cart_empty}
          resizeMode="contain"
          style={styles.imagePlaceholder}
        />
        <Components.TextComponent style={styles.emptyCartText}>
          Your cart is empty.
        </Components.TextComponent>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Components.CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        containerStyle={{
          backgroundColor: config.colors.COLOR_TRANSPARENT,
        }}
      />
      <FlatList
        keyExtractor={(item, index) => index + ''}
        ItemSeparatorComponent={renderItemSep}
        renderItem={renderItem}
        data={cartItems}
        contentContainerStyle={[
          styles.flatListContainer,
          {
            flex: cartItems.length > 0 ? undefined : 1,
          },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
      />
      {cartItems.length > 0 && (
        <Components.TouchableComponent
          text={'Checkout'}
          onPress={onPressCheckout}
          style={styles.submitButtonStyle}
        />
      )}
      <SafeAreaView />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  submitButtonStyle: {
    marginHorizontal: 20,
    marginBottom: 20,
  },

  emptyCartText: {
    fontSize: 20,
    fontWeight: '500',
  },
  flatListContainer: {
    padding: 20,
  },
  imagePlaceholder: {
    height: 230,
    width: 230,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
  },
  itemSep: {
    height: 20,
  },
});
