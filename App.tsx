// index.js or App.js
import 'react-native-url-polyfill/auto';
import React, { useState } from 'react';
import { View, Button, Image, TextInput, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { supabase } from './supabaseClient';
import { decode } from 'base64-arraybuffer';

const App = () => {
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error signing in:', error.message);
    } else {
      console.log('Signed in:', data.user);
    }
  };


  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true, 
    });

    if (!result.didCancel && !result.errorCode) {
      const avatarFile = result.assets![0];
      uploadAvatar(avatarFile);
    }
  };

  const uploadAvatar = async (file: any) => {
    const { base64, fileName } = file;
    const { uri, name } = file;
    if (!base64) {
      console.error('Base64 data is missing');
      return;
    }

    try {
      const decodedFile = decode(base64);

      console.log('Decoded file:', decodedFile);

      const { data, error } = await supabase
        .storage
        .from('avatars')
        .upload(`${fileName}`, decodedFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/png', 
        });

      if (error) {
        console.error('Error uploading file:', error);
      } else {
        console.log('File uploaded successfully:', data);
        setAvatar(uri);
      }
    } catch (error) {
      console.error('Error decoding or uploading file:', error);
    }
  };


  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 10, padding: 5, borderColor: 'gray', borderWidth: 1 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ marginBottom: 10, padding: 5, borderColor: 'gray', borderWidth: 1 }}
        />
        <Button title="Sign In" onPress={signIn} />
        <Button title="Pick an image" onPress={pickImage} />
        {avatar && <Image source={{ uri: avatar }} style={{ width: 100, height: 100 }} />}
      </View>
    </SafeAreaView>
  );
};


export default App;






