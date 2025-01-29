import React, {useMemo, useState} from 'react';
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import config from 'src/config';
import utils from 'src/utils';

type Props = {
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  imageStyle?: FastImageProps['style'];
  thumbImageUri: string;
  originalImageUri?: string | null;
  placeholderImage?: string | null;
  placeholderStyle?: ImageStyle;
};

const ProgressiveImage = (props: Props) => {
  const {
    containerStyle,
    imageStyle,
    thumbImageUri,
    placeholderImage = config.images.ic_user,
    placeholderStyle,
    originalImageUri,
  } = props;
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [originalLoaded, setOriginalLoaded] = useState(false);

  // Handlers for image loading
  const handleThumbLoad = () => setThumbLoaded(true);
  const handleThumbError = () => setThumbLoaded(false);

  const handleOriginalLoad = () => setOriginalLoaded(true);
  const handleOriginalError = () => setOriginalLoaded(false);

  const renderPlaceholderImage = useMemo(() => {
    return (
      <Image
        source={placeholderImage}
        resizeMode="contain"
        style={[styles.placeholderImage, placeholderStyle]}
      />
    );
  }, [placeholderImage, placeholderStyle]);

  return (
    <View style={[styles.container, containerStyle]}>
      {!thumbLoaded && renderPlaceholderImage}

      {!originalLoaded && (
        <FastImage
          style={[styles.uriImage, imageStyle, !thumbLoaded && styles.opacity0]}
          resizeMode="cover"
          source={{uri: thumbImageUri}}
          onLoad={handleThumbLoad}
          onError={handleThumbError}
        />
      )}

      {originalImageUri && (
        <FastImage
          style={[
            styles.uriImage,
            imageStyle,
            !originalLoaded && styles.opacity0,
          ]}
          resizeMode="cover"
          source={{uri: originalImageUri}}
          onLoad={handleOriginalLoad}
          onError={handleOriginalError}
        />
      )}
    </View>
  );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
  opacity0: {
    opacity: 0,
  },
  image: {
    height: '60%',
    width: '60%',
  },
  placeholderImage: {
    height: '60%',
    width: '60%',
    tintColor: config.colors.COLOR_APP_LIGHT_GRAY,
  },
  uriImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: config.colors.COLOR_APP_LIGHT_GRAY,
    borderRadius: utils.normalize(60),
  },
});
