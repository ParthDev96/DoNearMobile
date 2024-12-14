import React, {useCallback, useMemo} from 'react';
import {
  DeviceEventEmitter,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import config from '../../config';
import Components from '../../components';
import {ProductDetailsScreenNavigationProps} from '../../types/navigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppAlertDialogManager} from '../../components/AppAlertDialog';
import Toast from 'react-native-toast-message';

const ProductDetailsScreen = ({
  navigation,
  route,
}: ProductDetailsScreenNavigationProps) => {
  const insets = useSafeAreaInsets();
  const productDetails = route.params.product;
  const isCollect = route.params.isCollect;

  const onPressCollect = useCallback(() => {
    AppAlertDialogManager.show({
      title: 'Collect Product',
      message: `Are you sure you want to collect ${productDetails.title} product?`,
      negativeButtonText: config.strings.No,
      positiveButtonText: config.strings.Yes,
      onPositiveButtonPress: () => {
        Toast.show({
          type: 'customToast',
          props: {
            message: 'Product collected successully.',
          },
        });
        DeviceEventEmitter.emit('REMOVE_PRODUCT', productDetails);
        navigation.goBack();
      },
    });
  }, [productDetails, navigation]);

  const renderTopNavHeader = useMemo(() => {
    return (
      <Components.CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        title={productDetails.title}
      />
    );
  }, [navigation, productDetails]);

  const renderImage = useMemo(() => {
    return (
      <View style={styles.productImageShadow}>
        <Image
          resizeMode="cover"
          style={styles.productImage}
          source={productDetails.image}
        />
      </View>
    );
  }, [productDetails]);

  return (
    <View style={styles.container}>
      {renderTopNavHeader}
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContentContainer,
          {
            paddingBottom: insets.bottom + 20,
          },
        ]}>
        {renderImage}
        <Components.TextComponent style={styles.title}>
          {productDetails.title}
        </Components.TextComponent>
        <Components.NestedTextComponent
          valueText={productDetails.expiryDate}
          titleText="Expiry date: "
          titleTextStyle={styles.expiryDate}
          valueTextStyle={styles.expiryDateValue}
        />
        {isCollect && (
          <Components.TouchableComponent
            text={config.strings.Collect}
            onPress={onPressCollect}
            style={styles.collectButtonStyle}
          />
        )}
        <Components.TextComponent style={styles.description}>
          {productDetails.description}
        </Components.TextComponent>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  collectButtonStyle: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  scrollViewContentContainer: {
    paddingTop: 15,
  },
  scrollView: {
    zIndex: -100,
  },
  productImage: {
    height: 200,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 15,
  },
  productImageShadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: config.colors.COLOR_APP_DARK_GRAY + '50',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 5,
          shadowOpacity: 0.7,
        }
      : {
          elevation: 5,
        },
  expiryDate: {
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    color: config.colors.COLOR_APP_DARK_GRAY,
  },
  expiryDateValue: {
    color: config.colors.COLOR_BLACK,
    fontSize: 15,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 20,
  },
  expandedContainer: {
    backgroundColor: config.colors.COLOR_BLACK + '20',
  },
  expandedTitle: {
    color: config.colors.COLOR_WHITE,
  },
  expandedBackButton: {
    // backgroundColor: config.colors.COLOR_BLACK + '20',
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
});
