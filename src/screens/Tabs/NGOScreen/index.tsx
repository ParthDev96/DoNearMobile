import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
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

const NGOScreen = ({navigation}: StackPropsType<'NGOScreen'>) => {
  const [data, setData] = useState<PRODUCT[]>([]);
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  const generateProductList = useCallback(() => {
    setData(StaticData.getStaticProductList());
  }, []);

  useEffect(() => {
    generateProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressCollect = useCallback(() => {
    successToast({
      text1: t('ProductAddedToTheCart'),
    });
    // dispatch(addProductToCart(item));
    // const t_data = [...data];
    // t_data.splice(index, 1);
    // setData(t_data);
    // AppAlertDialogManager.show({
    //   title: 'Collect Product',
    //   message: `Are you sure you want to collect ${item.title} product?`,
    //   negativeButtonText: config.strings.No,
    //   positiveButtonText: config.strings.Yes,
    //   onPositiveButtonPress: () => {

    //   },
    // });
  }, [t]);

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
            onPressCollect();
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
  return (
    <View style={styles.container}>
      <Components.NavigationBar title={t('NGO')} />
      {renderList}
    </View>
  );
};

export default NGOScreen;
