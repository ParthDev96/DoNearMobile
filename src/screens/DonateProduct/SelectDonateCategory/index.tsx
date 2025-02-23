import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import Components from '../../../components';
import images from '../../../config/images';
import {StackPropsType} from 'src/types/navigation';
import styles from './styles';
import utils from 'src/utils';

const SelectDonateCategory = ({
  navigation,
}: StackPropsType<'SelectDonateCategory'>) => {
  const DATA = [
    {
      id: 1,
      icon: images.ic_money, // Replace with your actual icon path
      label: 'Money',
    },
    {
      id: 2,
      icon: images.ic_food,
      label: 'Food',
    },
    {
      id: 3,
      icon: images.ic_cloths,
      label: 'Cloths',
    },
    {
      id: 4,
      icon: images.ic_footwear,
      label: 'Footwear',
    },
    {
      id: 5,
      icon: images.ic_electronic,
      label: 'Electronic',
    },
    {
      id: 6,
      icon: images.ic_toys,
      label: 'Toys',
    },
    // Add more items as needed
  ];

  const onCategoryPress = useCallback(
    (item: any) => {
      if (item.id !== 1) {
        navigation.navigate('AddProductScreen', {});
      }
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: any; index: number}) => (
      <Components.CategoryItemComponent
        item={item}
        onCategoryPress={onCategoryPress}
      />
    ),
    [onCategoryPress],
  );

  return (
    <View style={styles.container}>
      <Components.NavigationBar
        onBackPress={() => {
          navigation.goBack();
        }}
        showBack
        title={'Category'}
      />
      <FlatList
        data={DATA}
        keyExtractor={item => item.id + ''}
        numColumns={utils.dimension.isPad ? 3 : 2}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default SelectDonateCategory;
