import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {DeviceEventEmitter, FlatList, View} from 'react-native';
import {StackPropsType} from '../../../types/navigation';
import styles from './styles';
import {PRODUCT} from 'src/types/Products';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StaticData from 'src/utils/StaticData';
import Components from 'src/components';
import CollectProductItemComponent from 'src/components/ListItems/CollectProductItemComponent';
import utils from 'src/utils';
import config from 'src/config';
import {useTranslation} from 'react-i18next';
import {successToast} from 'src/config/toastConfig';
import {useAppDispatch} from 'src/redux/store';
import {addProductToCart} from 'src/redux/slices/cartSlice';
import {EVENT_EMITTER_KEYS} from 'src/config/constant-variables';
import CartButton from 'src/components/CartButton';

const NGOScreen = ({navigation}: StackPropsType<'NGOScreen'>) => {
  const [data, setData] = useState<PRODUCT[]>([]);
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const dataRef = useRef<PRODUCT[]>([]);

  const generateProductList = useCallback(() => {
    setData(StaticData.getStaticProductList());
  }, []);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      EVENT_EMITTER_KEYS.REMOVE_PRODUCT,
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

  useEffect(() => {
    generateProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressCollect = useCallback(
    (item: PRODUCT, index: number) => {
      successToast({
        text1: t('ProductAddedToTheCart'),
      });
      dispatch(addProductToCart(item));
      const t_data = [...data];
      t_data.splice(index, 1);
      setData(t_data);
    },
    [data, dispatch, t],
  );

  const renderItem = useCallback(
    ({item, index}: {item: PRODUCT; index: number}) => {
      return (
        <CollectProductItemComponent
          onPressItem={() => {
            navigation.navigate('ProductDetails', {
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

  const renderList = useMemo(() => {
    return (
      <FlatList
        keyExtractor={item => item.product_id + ''}
        renderItem={renderItem}
        data={data}
        ItemSeparatorComponent={renderItemSep}
        numColumns={utils.dimension.isPad ? 3 : 2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.flatListContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            paddingBottom:
              insets.bottom +
              config.ConstantVariables.TAB_BAR_TOTAL_HEIGHT +
              utils.normalize(25),
            flex: data.length === 0 ? 1 : undefined,
          },
        ]}
      />
    );
  }, [data, insets.bottom, renderItem, renderItemSep]);

  const customHeaderRightView = useMemo(() => {
    return <CartButton />;
  }, []);

  return (
    <View style={styles.container}>
      <Components.NavigationBar
        customRightView={customHeaderRightView}
        title={t('NGO')}
        mainContainerStyle={styles.headerContainer}
      />
      {renderList}
    </View>
  );
};

export default NGOScreen;
