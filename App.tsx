// index.js or App.js
import 'react-native-url-polyfill/auto';
import React, { useState } from 'react';
import { View, Button, Image, TextInput, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { supabase } from './supabaseClient';

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
      includeBase64: false,
    });

    if (!result.didCancel && !result.errorCode) {
      const avatarFile = result.assets![0];
      uploadAvatar(avatarFile);
    }
  };

  const uploadAvatar = async (file:any) => {
    const { uri, fileName } = file;
    const blob = await fetch(uri).then((response) => response.blob());
    console.log('file',uri);
    const { data, error } = await supabase
      .storage
     
      .from('avatars')
      .upload(`${fileName}`, uri, {
        cacheControl: '3600',
        upsert: false,
      }
    );

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
