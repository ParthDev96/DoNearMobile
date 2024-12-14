import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import config from '../../config';
import {AddProductNavigationProps} from '../../types/navigation';
import Components from '../../components';
import useImagePicker from '../../hooks/useImagePicker';
import {Asset} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-toast-message';
import colors from '../../config/colors';
import {AppAlertDialogManager} from '../../components/AppAlertDialog';

const AddProductScreen = ({navigation}: AddProductNavigationProps) => {
  const [images, setImages] = useState<Asset[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCondition, setSelectedCondition] = useState('new');

  const {pickImageFromCamera, pickImageFromGallery} = useImagePicker();

  const handlePickImageFromCamera = async () => {
    try {
      const result: any = await pickImageFromCamera();
      if (result) {
        const t_image = [...images];
        t_image.push(result);
        setImages(t_image);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePickImageFromGallery = async () => {
    try {
      const result: any = await pickImageFromGallery();
      const t_image = [...images];
      t_image.push(result);
      setImages(t_image);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCustomInfoView = useMemo(() => {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.boldText}>
          New:{' '}
          <Text style={styles.regularText}>
            {'Perfect condition! Ready to make someone happy.\n'}
          </Text>
        </Text>
        <Text style={styles.boldText}>
          Good:{' '}
          <Text style={styles.regularText}>
            {'Good! Still, lots of life left in this.\n'}
          </Text>
        </Text>
        <Text style={styles.boldText}>
          Poor:{' '}
          <Text style={styles.regularText}>
            {'Needs repairs or may be unfit for use.'}
          </Text>
        </Text>
      </View>
    );
  }, []);

  const onInfoProductConditionPress = useCallback(() => {
    AppAlertDialogManager.show({
      title: 'Product Conditions',
      customMessageView: renderCustomInfoView,
      positiveButtonText: config.strings.Ok,
      onPositiveButtonPress: () => {},
    });
  }, [renderCustomInfoView]);

  const onPressAdd = useCallback(() => {
    Toast.show({
      type: 'customToast',
      props: {
        message: 'Product added successully.',
      },
    });
    navigation.replace('DonateProductListScreen', {});
  }, [navigation]);

  const onPressSelectImage = useCallback(() => {
    setModalVisible(true);
  }, []);

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
              <Icon name="plus" size={30} color="black" />
              <Components.TextComponent style={styles.selectImageText}>
                {config.strings.SelectImage}
              </Components.TextComponent>
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
  }, [images, onPressSelectImage]);

  const renderRadioButtonIcon = useCallback((isSelected: boolean) => {
    return (
      <FontistoIcon
        name={isSelected ? 'radio-btn-active' : 'radio-btn-passive'}
        size={20}
        color={colors.COLOR_BLACK}
      />
    );
  }, []);

  const renderProductConditionOptions = useMemo(() => {
    return (
      <View style={styles.radioButtonMainContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setSelectedCondition('new');
          }}
          style={styles.radioButtonContainer}>
          {renderRadioButtonIcon(selectedCondition === 'new')}
          <Components.TextComponent style={styles.title}>
            {'New'}
          </Components.TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setSelectedCondition('good');
          }}
          style={styles.radioButtonContainer}>
          {renderRadioButtonIcon(selectedCondition === 'good')}
          <Components.TextComponent style={styles.title}>
            {'Good'}
          </Components.TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setSelectedCondition('poor');
          }}
          style={styles.radioButtonContainer}>
          {renderRadioButtonIcon(selectedCondition === 'poor')}
          <Components.TextComponent style={styles.title}>
            {'Poor'}
          </Components.TextComponent>
        </TouchableOpacity>
      </View>
    );
  }, [renderRadioButtonIcon, selectedCondition]);
  return (
    <View style={styles.container}>
      <Components.CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        title={config.strings.AddProduct}
      />
      <View style={styles.innerContainer}>
        {renderSelectedItem}
        <Components.TextInputComponent
          inputStyle={styles.titleInputStyle}
          placeholder={config.strings.Title}
        />
        <Components.TextInputComponent
          inputStyle={styles.descInputStyle}
          placeholder={config.strings.Description}
          multiline
        />
        <View style={styles.productConditonMainContainer}>
          <Components.TextComponent style={styles.productConditonText}>
            {config.strings.ProductCondition}
          </Components.TextComponent>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onInfoProductConditionPress}
            style={styles.infoButton}>
            <Icon name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        {renderProductConditionOptions}
      </View>
      <Components.TouchableComponent
        text={config.strings.AddProduct}
        onPress={onPressAdd}
        style={styles.submitButtonStyle}
      />
      <SafeAreaView />
      <Components.ImagePickerModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectGallery={() => {
          setModalVisible(false);
          setTimeout(() => {
            handlePickImageFromGallery();
          }, 500);
        }}
        onSelectCamera={() => {
          setModalVisible(false);
          setTimeout(() => {
            handlePickImageFromCamera();
          }, 500);
        }}
      />
    </View>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  messageContainer: {
    marginTop: 25,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8, // Adds space between lines
  },
  regularText: {
    fontWeight: 'normal',
    fontSize: 16,
  },

  infoButton: {
    paddingHorizontal: 10,
    // backgroundColor: 'red',
    height: 35,
  },
  productConditonMainContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  productConditonText: {
    fontSize: 17,
    fontWeight: '700',
  },

  radioButtonMainContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 5,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
  },
  selectImageText: {
    fontSize: 12,
    marginTop: 10,
  },
  titleInputStyle: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  descInputStyle: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 130,
  },
  itemImage: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  submitButtonStyle: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  scrollViewContentContainer: {
    paddingHorizontal: 20,
  },
  scrollView: {
    height: 130,
    width: '100%',
    marginTop: 20,
  },
  itemContainer: {
    height: 130,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#00000050',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  selectImageContainer: {
    height: 130,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#00000050',
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    margin: 4,
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
  innerContainer: {
    flex: 1,
  },
});
