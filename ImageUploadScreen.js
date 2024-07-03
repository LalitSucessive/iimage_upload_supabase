import React, { useState } from 'react';
import { View, Button, Image, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { supabase } from './supabaseClient';

const ImageUploadScreen = () => {
  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (!result.didCancel && !result.errorCode) {
      const avatarFile = result.assets[0];
      uploadAvatar(avatarFile);
    }
  };

  const uploadAvatar = async (file) => {
    const { uri, fileName } = file;
    const blob = await fetch(uri).then((response) => response.blob());
    console.log('file', uri);
    const { data, error } = await supabase
      .storage
      .from('avatars')
      .upload(`${fileName}`, blob, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading avatar:', error.message);
    } else {
      console.log('Avatar uploaded successfully:', data);
      setAvatar(uri);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Button title="Pick an image" onPress={pickImage} />
        {avatar && <Image source={{ uri: avatar }} style={{ width: 100, height: 100 }} />}
      </View>
    </SafeAreaView>
  );
};

export default ImageUploadScreen;
