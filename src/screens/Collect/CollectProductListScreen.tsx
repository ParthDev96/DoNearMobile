import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  DeviceEventEmitter,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import config from '../../config';
import {CollectProductListNavigationProps} from '../../types/navigation';
import Components from '../../components';
import {PRODUCT} from '../../types/Products';
import StaticData from '../../utils/StaticData';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {AppAlertDialogManager} from '../../components/AppAlertDialog';
import Toast from 'react-native-toast-message';
import CollectProductItemComponent from '../../components/ListItems/CollectProductItemComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {RootState, useAppDispatch} from '../../redux/store';
import {addProductToCart} from '../../redux/slices/cartSlice';
import {useSelector} from 'react-redux';

const CollectProductListScreen = ({
  navigation,
}: CollectProductListNavigationProps) => {
  const [data, setData] = useState<PRODUCT[]>([]);
  const insets = useSafeAreaInsets();
  const dataRef = useRef<PRODUCT[]>([]);

  const dispatch = useAppDispatch();
  const storeProducts = useSelector(
    (state: RootState) => state.cartSlice.products,
  );

  const generateProductList = useCallback(() => {
    setData(StaticData.getStaticProductList());
  }, []);

  useEffect(() => {
    generateProductList();
  }, []);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'REMOVE_PRODUCT',
      (p_data: PRODUCT) => {
        var index = dataRef.current.findIndex(
          item => item.product_id === p_data.product_id,
        );
        if (index >= 0) {
          const t_data = [...dataRef.current];
          t_data.splice(index, 1);
          setData(t_data);
        }
      },
    );
    return () => {
      listener.remove();
    };
  }, []);

  const onPressCollect = useCallback(
    (item: PRODUCT, index: number) => {
      Toast.show({
        type: 'customToast',
        props: {
          message: 'Product added to the cart.',
        },
      });
      dispatch(addProductToCart(item));
      const t_data = [...data];
      t_data.splice(index, 1);
      setData(t_data);
      // AppAlertDialogManager.show({
      //   title: 'Collect Product',
      //   message: `Are you sure you want to collect ${item.title} product?`,
      //   negativeButtonText: config.strings.No,
      //   positiveButtonText: config.strings.Yes,
      //   onPositiveButtonPress: () => {

      //   },
      // });
    },
    [data, dispatch],
  );

  const renderItem = useCallback(
    ({item, index}: {item: PRODUCT; index: number}) => {
      return (
        <CollectProductItemComponent
          onPressItem={() => {
            navigation.navigate('ProductDetailsScreen', {
              product: item,
              isCollect: true,
            });
          }}
          onPressCollect={() => {
            onPressCollect(item, index);
          }}
          item={item}
          index={index}
        />
      );
    },
    [navigation, onPressCollect],
  );

  const renderItemSep = useCallback(() => {
    return <View style={styles.itemSep} />;
  }, []);

  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={config.images.ic_package_placeholder}
          resizeMode="contain"
          style={styles.imagePlaceholder}
        />
        <Components.TextComponent>Products are empty.</Components.TextComponent>
      </View>
    );
  }, []);

  const customHeaderRightView = useMemo(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CartScreen', {});
        }}
        activeOpacity={0.7}
        style={styles.cartButton}>
        <Icon name="cart-variant" size={25} color={config.colors.COLOR_BLACK} />
        {storeProducts.length > 0 && (
          <View style={styles.badgeContainer}>
            <Components.TextComponent style={styles.badgeCount}>
              {storeProducts.length + ''}
            </Components.TextComponent>
          </View>
        )}
      </TouchableOpacity>
    );
  }, [navigation, storeProducts]);

  return (
    <View style={styles.container}>
      <Components.CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        title={config.strings.Products}
        customRightView={customHeaderRightView}
        containerStyle={styles.headerContainer}
      />
      <TouchableOpacity activeOpacity={0.7} style={styles.filterButton}>
        <Components.TextComponent style={styles.filterText}>
          {'Filter'}
        </Components.TextComponent>
        <IoniconsIcon
          name="filter"
          size={20}
          color={config.colors.COLOR_BLACK}
        />
      </TouchableOpacity>
      <FlatList
        keyExtractor={item => item.product_id + ''}
        renderItem={renderItem}
        data={data}
        numColumns={2}
        ItemSeparatorComponent={renderItemSep}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={[
          styles.flatListContainer,
          {
            paddingBottom: insets.bottom + 20,
            flex: data.length > 0 ? undefined : 1,
          },
        ]}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export default CollectProductListScreen;

const styles = StyleSheet.create({
  filterText: {
    fontSize: 15,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: config.colors.COLOR_WHITE,
    borderColor: config.colors.COLOR_APP_BROWN,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    height: 35,
    marginVertical: 20,
    paddingHorizontal: 10,
    marginRight: 20,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCount: {
    fontSize: 10,
    color: config.colors.COLOR_WHITE,
  },
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 3,
    top: 3,
    borderRadius: 10,
    height: 15,
    minWidth: 15,
    paddingHorizontal: 5,
    backgroundColor: config.colors.COLOR_APP_RED,
  },
  cartButton: {
    width: 45,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 20,
  },
  imagePlaceholder: {
    height: 100,
    width: 100,
    marginBottom: 15,
  },
  headerContainer: {
    zIndex: 1000,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSep: {
    height: 20,
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
});
