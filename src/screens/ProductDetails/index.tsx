import React, {useCallback, useMemo} from 'react';
import {DeviceEventEmitter, Image, ScrollView, View} from 'react-native';
import Components from '../../components';
import {StackPropsType} from '../../types/navigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import AppPopup from 'src/components/AppPopup/AppPopup';
import utils from 'src/utils';
import {useTranslation} from 'react-i18next';
import {successToast} from 'src/config/toastConfig';
import {EVENT_EMITTER_KEYS} from 'src/config/constant-variables';

const ProductDetails = ({
  navigation,
  route,
}: StackPropsType<'ProductDetails'>) => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const productDetails = route.params.product;
  const isCollect = route.params.isCollect;

  const onPressCollect = useCallback(() => {
    AppPopup.show({
      title: t('CollectProduct'),
      message: t('CollectProductMessage', {
        title: productDetails.title,
      }),
      submitText: t('Yes'),
      cancelText: t('No'),
      onSubmit: () => {
        successToast({
          text1: t('ProductCollectedSuccessully'),
        });
        DeviceEventEmitter.emit(
          EVENT_EMITTER_KEYS.REMOVE_PRODUCT,
          productDetails,
        );
        navigation.goBack();
      },
    });
  }, [productDetails, t, navigation]);

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
      <Components.NavigationBar
        onBackPress={() => {
          navigation.goBack();
        }}
        showBack
        title={productDetails.title}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContentContainer,
          {
            paddingBottom: insets.bottom + utils.normalize(20),
          },
        ]}>
        <View style={styles.innerView}>
          {renderImage}
          <Components.CustomText style={styles.title}>
            {productDetails.title}
          </Components.CustomText>
          <Components.NestedTextComponent
            valueText={productDetails.expiryDate}
            titleText={t('ExpiryDate') + ': '}
            titleTextStyle={styles.expiryDate}
            valueTextStyle={styles.expiryDateValue}
          />
          {isCollect && (
            <Components.AppButton
              containerStyle={styles.collectButtonStyle}
              text={t('Collect')}
              onPress={onPressCollect}
            />
          )}
          <Components.CustomText style={styles.description}>
            {productDetails.description}
          </Components.CustomText>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetails;
