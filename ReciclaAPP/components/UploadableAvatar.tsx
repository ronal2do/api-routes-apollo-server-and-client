import React, { PureComponent } from 'react'
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { RNS3 } from 'react-native-aws3';
import { client } from '../services/apollo';
import { PROFILE_QUERY } from '../graphql/queries';
import { CHANGE_PICTURE } from '../graphql/mutations';
import { theme } from '../constants/Colors';
import Typography from './Typography';
import { generateInitials } from '../utils';

type UploadableAvatarProps = {
  image: string | null,
  userId: string,
  name: string
};

type UploadableAvatarState = { image: string | null, isLoading: boolean}

type PostResponse = {
  status: number;
  body: PostResponseBody;
}

type PostResponseBody = {
  bucket: string;
  etag: string;
  key: string;
  location: string;
}
interface IImage {
  cancelled: boolean;
  height:  number;
  type: string;
  uri: string;
  width:  number;
}

export default class UploadableAvatar extends PureComponent<UploadableAvatarProps, UploadableAvatarState> {
  state: UploadableAvatarState = {
    image: this.props.image,
    isLoading: false
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        // @ts-ignore
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1
    });
    
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.upload(result)
    }
  };

  upload = async (image: any) => {
    this.setState({ isLoading: true })
    const rand = `${Math.random().toString(36)}00000000000000000`.slice(2,10);

    const file = {
      uri: image.uri,
      name: `${this.props.userId}/${rand}.png`,
      type: "image/png"
    }
    
    const options = {
      keyPrefix: "avatars/",
      bucket: "gamesassets",
      region: "us-west-2",
      accessKey: "AKIAJ5GPD5DMZNUJOI6A",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(file, options).then((response: PostResponse) => {
      if (response.status !== 201) throw new Error("Failed to upload image to S3");
      client
        .mutate({
          mutation: CHANGE_PICTURE,
          variables: {
            picture: `https://gamesassets.s3.amazonaws.com/avatars%2F${this.props.userId}%2F${rand}.png`,
          },
          refetchQueries: () => [{ query: PROFILE_QUERY }]
        }).then(() => this.setState({ isLoading: false }) )
    });
  }

  render() { 
    const { image, isLoading } = this.state;

    return (
      <View style={styles.placeholder}>
        {image ? 
         <ImageBackground 
          style={styles.bg} 
          imageStyle={{ marginLeft: 15, height: 200, width: 200, borderRadius: 100 }}
          source={{uri: image}}
          resizeMode="cover"
        >
          <TouchableOpacity onPress={this._pickImage}>
            {!isLoading ? 
              <Image source={require('../assets/images/cam.png')} />: 
              <View style={styles.loader}>
                <ActivityIndicator color="white"/>
              </View>
            }
          </TouchableOpacity>
        </ImageBackground> 
        :
        <View style={[
          styles.bg, 
          styles.initials,
        ]}>
          <Typography kind="max" color={theme.BLUE} style={styles.testStyles}>{generateInitials(this.props.name)}</Typography>
          <TouchableOpacity onPress={this._pickImage}>
            {!isLoading ? 
              <Image source={require('../assets/images/cam.png')} />: 
              <View style={styles.loader}>
                <ActivityIndicator color="white"/>
              </View>
            }
          </TouchableOpacity>
        </View>}
        {isLoading && <Typography kind="instructions" color={theme.BLUE} style={{ 
            padding: 0, 
            marginTop: 3, 
            fontWeight: "600" }}>Enviando a imagem, aguarde</Typography>}
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  bg: {
    width: 230, 
    height: 200, 
    alignItems: 'flex-end', 
    justifyContent: 'center'
  },
  placeholder: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: { width: 37, 
    height: 37, 
    backgroundColor: theme.BLUE, 
    borderRadius: 8, 
    alignItems: 'center', 
  justifyContent: 'center' },
  initials: {
    marginLeft: 15, 
    height: 200, 
    width: 200, 
    borderRadius: 100, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: theme.GREEN 
  },
  testStyles: {
    padding: 0, 
    marginTop: 3, 
    fontWeight: "600"
  }
})
