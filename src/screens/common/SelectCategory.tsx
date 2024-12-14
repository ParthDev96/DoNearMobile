import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import config from '../../config';
import Components from '../../components';
import {SelectCategoryNavigationProps} from '../../types/navigation';
import images from '../../config/images';
import colors from '../../config/colors';

const SelectCategory = ({navigation}: SelectCategoryNavigationProps) => {
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
      <TouchableOpacity
        onPress={() => onCategoryPress(item)}
        activeOpacity={0.7}
        style={styles.itemContainer}>
        <Image source={item.icon} style={styles.icon} />
        <Components.TextComponent style={styles.labelText}>
          {item.label}
        </Components.TextComponent>
      </TouchableOpacity>
    ),
    [onCategoryPress],
  );

  //   const renderItemSep = useCallback(() => {
  //     return (
  //       <View
  //         style={{
  //           height: 20,
  //         }}
  //       />
  //     );
  //   }, []);
  return (
    <View style={styles.container}>
      <Components.CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        title={config.strings.Category}
      />

      <FlatList
        data={DATA}
        keyExtractor={item => item.id + ''}
        numColumns={2} // Set the number of columns to 2
        renderItem={renderItem}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContainer}
        // ItemSeparatorComponent={renderItemSep}
      />
    </View>
  );
};

export default SelectCategory;

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Space between columns
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: colors.COLOR_WHITE, // Light background for items
  },
  icon: {
    width: 70, // Adjust icon size as needed
    height: 70,
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
});
