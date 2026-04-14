import {
  ImageStyle,
  StyleProp,
  View,
  ActivityIndicator,
  Animated,
  StyleSheet,
} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';
import React, {useState} from 'react';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style = {}}: Props) => {
  const {opacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = () => {
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, style]}>
      {isLoading && (
        <ActivityIndicator
          style={styles.loader}
          color="grey"
          size={30}
        />
      )}
      <Animated.Image
        source={{uri}}
        onError={onError}
        onLoad={finishLoading}
        style={[style, {opacity}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
  },
});
