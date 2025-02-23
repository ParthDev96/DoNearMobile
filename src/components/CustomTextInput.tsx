import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ReturnKeyTypeOptions,
  ImageSourcePropType,
  KeyboardTypeOptions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import theme from 'src/config';
import utils from 'src/utils';
import AnimatedButton from './AnimatedButton';
import CustomText from './CustomText';
import {default as Ionicons} from 'react-native-vector-icons/Ionicons';
import config from 'src/config';

type Props = {
  error?: string;
  infoText?: string;
  placeholder: string;
  placeholderColor?: string;
  focusedBorderColor?: string;
  unFocusedBorderColor?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  password?: boolean;
  containerStyle?: ViewStyle;
  leftImage?: any;
  leftImageStyle?: ImageStyle;
  keyboardType?: KeyboardTypeOptions;
  textInputStyle?: TextStyle;
  multiline?: boolean;
  value: string;
  defaultValue?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength?: number;
  editable?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  description?: string;
  descriptionStyle?: TextStyle;
  autoCorrect?: boolean;
  customLeftView?: any;
  customRightView?: any;
  showEye?: boolean;
  eyeImageContainerStyle?: ViewStyle;
  inputFocusColor?: string;
  inputUnFocusColor?: string;
  rowContainerStyle?: ViewStyle;
  titleRightImageStyle?: ImageStyle;
  titleRightImage?: ImageSourcePropType;
  rightImage?: ImageSourcePropType;
  rightImageStyle?: ImageStyle;
  rightImageContainer?: ViewStyle;
  // mask?: Mask;
  onChangeText?: (text: string) => void;
  onChangeMaskText?: (
    masked: string,
    unmasked: string,
    obfuscated: string,
  ) => void;
  onPressRightIc?: () => void;
  onTitleRightImage?: () => void;
  onSubmitEditing?: () => void;
  onCreateRef?: (ref: TextInput) => void;
  onSelectionChange?: (e: any) => void;
  selection?: {start: number; end?: number | undefined};
  onBlur?: () => void;
};
const CustomTextInput = (props: Props) => {
  const {
    error,
    infoText,
    placeholder,
    autoCapitalize,
    password,
    containerStyle,
    leftImage,
    leftImageStyle,
    onChangeText,
    keyboardType,
    textInputStyle,
    multiline,
    value,
    defaultValue,
    returnKeyType,
    onSubmitEditing,
    onCreateRef,
    maxLength,
    editable = true,
    title,
    titleStyle,
    description,
    descriptionStyle,
    autoCorrect = false,
    customLeftView,
    customRightView,
    showEye = false,
    eyeImageContainerStyle,
    inputFocusColor,
    inputUnFocusColor,
    placeholderColor,
    rowContainerStyle,
    titleRightImageStyle,
    titleRightImage,
    onTitleRightImage,
    rightImage,
    rightImageStyle,
    rightImageContainer,
    // mask,
    // onChangeMaskText,
    onPressRightIc,
    onSelectionChange,
    selection,
    focusedBorderColor,
    unFocusedBorderColor,
    onBlur,
  } = props;

  const [focused, setFocused] = useState(false);
  const [securePassword, setSecurePassword] = useState(password);

  return (
    <View style={containerStyle}>
      {!!title && (
        <View style={styles.flexRow}>
          <CustomText
            style={StyleSheet.flatten([styles.titleStyle, titleStyle])}>
            {title}
          </CustomText>
          {titleRightImage && (
            <AnimatedButton
              activeOpacity={0.99}
              onPress={() => {
                if (onTitleRightImage) {
                  onTitleRightImage();
                }
              }}>
              <Image
                resizeMode="contain"
                source={titleRightImage}
                style={[styles.titleRightImage, titleRightImageStyle]}
              />
            </AnimatedButton>
          )}
        </View>
      )}
      {description && (
        <CustomText
          style={StyleSheet.flatten([
            styles.descriptionStyle,
            descriptionStyle,
          ])}>
          {description}
        </CustomText>
      )}
      <View
        style={[
          styles.rowContainer,
          focused
            ? {
                backgroundColor: inputFocusColor
                  ? inputFocusColor
                  : theme.colors.COLOR_WHITE,
                borderColor: focusedBorderColor
                  ? focusedBorderColor
                  : theme.colors.COLOR_APP_TEXT,
              }
            : {
                backgroundColor: inputUnFocusColor
                  ? inputUnFocusColor
                  : theme.colors.COLOR_WHITE,
                borderColor: unFocusedBorderColor
                  ? unFocusedBorderColor
                  : theme.colors.COLOR_APP_TEXT + '50',
              },
          styles.shadowContainer,
          rowContainerStyle,
        ]}>
        {!!leftImage && (
          <Image
            source={leftImage}
            style={[
              styles.imageStyle,
              !editable && styles.disableImageStyle,
              leftImageStyle,
            ]}
            resizeMode="contain"
          />
        )}
        {customLeftView && customLeftView()}
        {/* {!mask && ( */}
        <TextInput
          style={[
            styles.inputStyle,
            multiline && styles.multilineTextInput,
            !editable && styles.disableStyle,
            textInputStyle,
          ]}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
            if (onBlur) {
              onBlur();
            }
          }}
          textContentType="oneTimeCode"
          ref={input => {
            if (onCreateRef && input) {
              onCreateRef(input);
            }
          }}
          multiline={multiline}
          maxLength={maxLength}
          editable={editable}
          selectTextOnFocus={editable}
          value={value}
          defaultValue={defaultValue}
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={
            securePassword != null && securePassword !== undefined
              ? securePassword
              : password
          }
          onChangeText={text => {
            if (onChangeText) {
              onChangeText(text);
            }
          }}
          placeholderTextColor={
            placeholderColor
              ? placeholderColor
              : theme.colors.COLOR_APP_LIGHT_GRAY
          }
          autoCorrect={autoCorrect}
          numberOfLines={1}
          onSelectionChange={onSelectionChange}
          selection={selection}
        />
        {/* )} */}
        {/* {mask && (
          <MaskInput
            defaultValue={defaultValue}
            keyboardType={keyboardType ? keyboardType : 'default'}
            style={[
              styles.inputStyle,
              multiline && styles.multilineTextInput,
              {
                fontSize:
                  value && value.length > 0
                    ? theme.fontSize.fontSize_extra_medium
                    : theme.fontSize.fontSize_small,
              },
              textInputStyle,
            ]}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            ref={input => {
              if (onCreateRef && input) {
                onCreateRef(input);
              }
            }}
            value={value}
            onChangeText={(masked, unmasked, obfuscated) => {
              if (onChangeMaskText) {
                onChangeMaskText(masked, unmasked, obfuscated);
              }
            }}
            placeholderTextColor={
              placeholderColor ? placeholderColor : theme.colors.gray_DDDDDD
            }
            mask={mask}
            secureTextEntry={
              securePassword != null && securePassword != undefined
                ? securePassword
                : password
            }
          />
        )} */}
        {showEye && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setSecurePassword(!securePassword)}
            style={[styles.eyeBtn, eyeImageContainerStyle]}>
            <Ionicons
              name={!securePassword ? 'eye-off-outline' : 'eye-outline'}
              size={utils.normalize(17)}
              color={config.colors.COLOR_APP_TEXT}
            />
          </TouchableOpacity>
        )}
        {customRightView && customRightView()}
        {!!rightImage && (
          <AnimatedButton
            onPress={() => {
              if (onPressRightIc) {
                onPressRightIc();
              }
            }}
            activeOpacity={0.99}
            style={[styles.rightImageContainer, rightImageContainer]}>
            <Image
              style={[styles.rightImage, rightImageStyle]}
              source={rightImage}
              resizeMode={'contain'}
            />
          </AnimatedButton>
        )}
      </View>
      {!!error && <CustomText style={styles.errorText}>{error}</CustomText>}
      {!!infoText && (
        <CustomText style={styles.infoText}>{infoText}</CustomText>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  disableStyle: {
    color: theme.colors.COLOR_APP_DARK_GRAY,
  },
  infoText: {
    color: theme.colors.COLOR_APP_TEXT,
    fontSize: utils.normalize(12),
    lineHeight: utils.normalize(15),
    marginLeft: utils.normalize(10),
    marginTop: utils.normalize(5),
  },
  errorText: {
    color: theme.colors.COLOR_APP_RED,
    fontSize: utils.normalize(12),
    lineHeight: utils.normalize(15),
    marginLeft: utils.normalize(10),
  },
  rightImageContainer: {
    height: '100%',
    width: utils.normalize(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightImage: {
    width: utils.normalize(16),
    height: utils.normalize(16),
  },
  titleRightImage: {
    width: utils.normalize(15),
    height: utils.normalize(15),
    marginHorizontal: utils.normalize(8),
    marginVertical: utils.normalize(4),
  },
  flexRow: {
    flexDirection: 'row',
    marginBottom: utils.normalize(7),
    alignItems: 'center',
    position: 'absolute',
    top: utils.normalize(-8),
    left: utils.normalize(10),
    paddingHorizontal: utils.normalize(5),
    backgroundColor: theme.colors.COLOR_WHITE,
    zIndex: 100,
  },
  multilineTextInput: {
    lineHeight: utils.normalize(16),
    textAlignVertical: 'top',
    paddingVertical: utils.normalize(13),
  },
  eyeBtn: {
    width: utils.normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: utils.normalize(5),
  },
  eyeImg: {
    width: utils.normalize(18),
    height: utils.normalize(18),
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    height: utils.normalize(50),
    backgroundColor: theme.colors.COLOR_APP_TEXT + '60',
    borderRadius: utils.normalize(25),
    borderWidth: 1,
    alignItems: 'center',
  },
  shadowContainer:
    Platform.OS === 'android'
      ? {
          backgroundColor: theme.colors.COLOR_WHITE,
          elevation: 4,
        }
      : {
          backgroundColor: theme.colors.COLOR_WHITE,
          shadowColor: theme.colors.COLOR_APP_TEXT + '80',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          zIndex: 100,
        },
  titleStyle: {
    fontFamily: theme.font.NotoSansRegular,
    fontSize: utils.normalize(11),
    color: theme.colors.COLOR_APP_TEXT,
    opacity: 0.6,
    lineHeight: utils.normalize(20),
  },
  descriptionStyle: {
    marginTop: 3,
    marginBottom: 7,
    fontSize: utils.normalize(12),
    lineHeight: utils.normalize(14),
    color: theme.colors.COLOR_APP_TEXT,
    fontFamily: theme.font.NotoSansRegular,
  },
  secondContainer: {
    flexDirection: 'row',
    width: '100%',
    height: utils.normalize(70),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.COLOR_APP_TEXT + '60',
  },
  inputStyle: {
    flex: 1,
    fontSize: utils.normalize(14),
    fontFamily: theme.font.NotoSansRegular,
    lineHeight: utils.normalize(18),
    paddingVertical: 0,
    paddingHorizontal: utils.normalize(15),
    color: theme.colors.COLOR_BLACK,
    height: '100%',
  },
  imageStyle: {
    height: utils.normalize(45),
    width: utils.normalize(15),
    marginLeft: utils.normalize(20),
    marginRight: utils.normalize(0),
  },
  disableImageStyle: {
    tintColor: theme.colors.COLOR_APP_DARK_GRAY,
  },
});
