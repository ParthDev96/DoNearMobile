import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {StackPropsType} from 'src/types/navigation';
import {Asset} from 'react-native-image-picker';
import styles from './styles';
import {AppAlertDialog} from 'src/components/AppAlertDialog';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from 'src/components/CustomText';
import config from 'src/config';
import Components from 'src/components';
import {useTranslation} from 'react-i18next';
import utils from 'src/utils';
import {ProductCondition} from 'src/config/enums';
import {successToast} from 'src/config/toastConfig';
import AppMediaOptions from 'src/components/AppMediaOptions/AppMediaOptionsManager';
import {IMediaOptions} from 'src/components/AppMediaOptions/AppMediaOptions';
import useSelectImage from 'src/hooks/useSelectImage';

const AddDonateProduct = ({navigation}: StackPropsType<'AddDonateProduct'>) => {
  const {t} = useTranslation();
  const [images, setImages] = useState<Asset[]>([]);
  const [selectedCondition, setSelectedCondition] = useState(
    ProductCondition.NEW,
  );
  const {chooseFromCamera, chooseFromGallery} = useSelectImage();

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState('');

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState('');

  const renderCustomInfoView = useMemo(() => {
    return (
      <View style={styles.messageContainer}>
        <Components.CustomText style={styles.boldText}>
          {t('New') + ': '}
          <Components.CustomText style={styles.regularText}>
            {t('NewProductConditionMessage') + '\n'}
          </Components.CustomText>
        </Components.CustomText>
        <Components.CustomText style={styles.boldText}>
          {t('Good') + ': '}
          <Components.CustomText style={styles.regularText}>
            {t('GoodProductConditionMessage') + '\n'}
          </Components.CustomText>
        </Components.CustomText>
        <Components.CustomText style={styles.boldText}>
          {t('Poor') + ' '}
          <Components.CustomText style={styles.regularText}>
            {t('PoorProductConditionMessage')}
          </Components.CustomText>
        </Components.CustomText>
      </View>
    );
  }, [t]);

  const onInfoProductConditionPress = useCallback(() => {
    AppAlertDialog.show({
      title: t('ProductConditions'),
      customMessageView: renderCustomInfoView,
      onPositiveButtonPress: () => {},
    });
  }, [renderCustomInfoView, t]);

  const onPressAdd = useCallback(() => {
    successToast({
      text1: t('ProductAddedSuccessully'),
    });
    navigation.popToTop();
  }, [t, navigation]);

  const onPressSelectImage = useCallback(() => {
    AppMediaOptions.show({
      onSelectOption: async (option: string) => {
        if (option === IMediaOptions.camera) {
          chooseFromCamera();
        } else if (option === IMediaOptions.gallery) {
          const s_image: any = await chooseFromGallery({
            freeStyleCropEnabled: false,
            height: 300,
            width: 300,
          });
          if (s_image && s_image.path) {
            const t_image = [...images];
            t_image.push(s_image.path);
            setImages(t_image);
          }
        }
      },
    });
  }, [chooseFromCamera, chooseFromGallery, images]);

  const renderSelectedItem = useMemo(() => {
    if (images) {
      return (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContentContainer}
            style={styles.scrollView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressSelectImage}
              style={styles.selectImageContainer}>
              <AntDesign name="plus" size={utils.normalize(30)} color="black" />
              <CustomText style={styles.selectImageText}>
                {t('SelectImage')}
              </CustomText>
            </TouchableOpacity>
            {images.map((asset, index) => {
              return (
                <View key={'' + index} style={styles.itemContainer}>
                  <Image
                    source={{uri: asset.uri}}
                    resizeMode="cover"
                    style={styles.itemImage}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }, [images, onPressSelectImage, t]);

  const renderRadioButtonIcon = useCallback((isSelected: boolean) => {
    return (
      <FontistoIcon
        name={isSelected ? 'radio-btn-active' : 'radio-btn-passive'}
        size={utils.normalize(20)}
        color={config.colors.COLOR_BLACK}
        style={styles.radioButtonIcon}
      />
    );
  }, []);

  const renderProductConditionOptions = useMemo(() => {
    return (
      <View style={styles.radioButtonMainContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setSelectedCondition(ProductCondition.NEW);
          }}
          style={styles.radioButtonContainer}>
          {renderRadioButtonIcon(selectedCondition === ProductCondition.NEW)}
          <CustomText style={styles.title}>{t('New')}</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setSelectedCondition(ProductCondition.GOOD);
          }}
          style={styles.radioButtonContainer}>
          {renderRadioButtonIcon(selectedCondition === ProductCondition.GOOD)}
          <CustomText style={styles.title}>{t('Good')}</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setSelectedCondition(ProductCondition.POOR);
          }}
          style={styles.radioButtonContainer}>
          {renderRadioButtonIcon(selectedCondition === ProductCondition.POOR)}
          <CustomText style={styles.title}>{t('Poor')}</CustomText>
        </TouchableOpacity>
      </View>
    );
  }, [renderRadioButtonIcon, t, selectedCondition]);
  return (
    <View style={styles.container}>
      <Components.NavigationBar
        onBackPress={() => {
          navigation.goBack();
        }}
        showBack
        title={t('AddProduct')}
      />
      <ScrollView>
        <View style={styles.innerContainer}>
          {renderSelectedItem}
          <Components.CustomTextInput
            error={titleError}
            onChangeText={(text: string) => {
              setTitle(text);
              setTitleError('');
            }}
            value={title}
            placeholder={t('Title')}
            containerStyle={styles.inputContainer}
            onSubmitEditing={() => {
              // passwordRef!.current?.focus();
            }}
            returnKeyType="next"
          />
          <Components.CustomTextInput
            error={descriptionError}
            onChangeText={(text: string) => {
              setDescription(text);
              setDescriptionError('');
            }}
            value={description}
            placeholder={t('Description')}
            rowContainerStyle={styles.descInputStyle}
            onSubmitEditing={() => {}}
            returnKeyType="next"
            multiline
          />
          <View style={styles.productConditonMainContainer}>
            <CustomText style={styles.productConditonText}>
              {t('ProductCondition')}
            </CustomText>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onInfoProductConditionPress}
              style={styles.infoButton}>
              <AntDesign
                name="infocirlceo"
                size={utils.normalize(20)}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {renderProductConditionOptions}
          <Components.AppButton
            text={t('AddProduct')}
            onPress={onPressAdd}
            style={styles.addProductButtonStyle}
          />
          <SafeAreaView />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddDonateProduct;
