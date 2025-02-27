import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {StackPropsType} from '../../../types/navigation';
import styles from './styles';
import {PRODUCT} from 'src/types/Products';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StaticData from 'src/utils/StaticData';
import Components from 'src/components';
import config from 'src/config';
import utils from 'src/utils';
import {useTranslation} from 'react-i18next';

const HomeScreen = ({navigation}: StackPropsType<'HomeScreen'>) => {
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

  const onDonatePress = useCallback(() => {
    navigation.navigate('SelectDonateCategory', {});
  }, [navigation]);
  const renderItem = useCallback(
    ({item, index}: {item: PRODUCT; index: number}) => {
      return (
        <Components.DonateProductItemComponent
          onPressItem={() => {
            navigation.navigate('ProductDetails', {product: item});
          }}
          item={item}
          index={index}
        />
      );
    },
    [navigation],
  );

  const renderItemSep = useCallback(() => {
    return <View style={styles.itemSep} />;
  }, []);

  const renderDonateIcon = useMemo(() => {
    return (
      <TouchableOpacity onPress={() => onDonatePress()} activeOpacity={0.7}>
        <Image
          source={config.images.ic_donate_add}
          resizeMode="contain"
          style={styles.donateImage}
        />
      </TouchableOpacity>
    );
  }, [onDonatePress]);

  return (
    <View style={styles.container}>
      <Components.NavigationBar
        onBackPress={() => {
          navigation.goBack();
        }}
        customRightView={renderDonateIcon}
        title={t('Home')}
      />
      <FlatList
        keyExtractor={item => item.product_id + ''}
        renderItem={renderItem}
        data={data}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderItemSep}
        numColumns={utils.dimension.isPad ? 2 : 1}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom:
              insets.bottom +
              config.ConstantVariables.TAB_BAR_TOTAL_HEIGHT +
              utils.normalize(40),
          },
        ]}
      />
    </View>
  );
};

export default HomeScreen;
