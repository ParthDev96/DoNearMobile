import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import config from '../../config';
import {DonateProductListNavigationProps} from '../../types/navigation';
import Components from '../../components';
import {PRODUCT} from '../../types/Products';
import StaticData from '../../utils/StaticData';
import DonateProductItemComponent from '../../components/ListItems/DonateProductItemComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const DonateProductListScreen = ({
  navigation,
}: DonateProductListNavigationProps) => {
  const [data, setData] = useState<PRODUCT[]>([]);
  const insets = useSafeAreaInsets();

  const generateProductList = useCallback(() => {
    setData(StaticData.getStaticProductList());
  }, []);

  useEffect(() => {
    generateProductList();
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: PRODUCT; index: number}) => {
      return (
        <DonateProductItemComponent
          onPressItem={() => {
            navigation.navigate('ProductDetailsScreen', {product: item});
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

  return (
    <View style={styles.container}>
      <Components.CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        title={config.strings.MyProducts}
        containerStyle={styles.headerContainer}
      />
      <FlatList
        keyExtractor={item => item.product_id + ''}
        renderItem={renderItem}
        data={data}
        ItemSeparatorComponent={renderItemSep}
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: insets.bottom + 15},
        ]}
      />
    </View>
  );
};

export default DonateProductListScreen;

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1000,
  },
  contentContainer: {
    padding: 15,
  },
  itemSep: {
    height: 20,
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
});
