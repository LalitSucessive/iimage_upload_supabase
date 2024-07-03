import React, { useState } from 'react';
import { View, Button, TextInput, SafeAreaView } from 'react-native';
import { supabase } from './supabaseClient';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error signing in:', error.message);
    } else {
      console.log('Signed in:', data.user);
      navigation.navigate('ImageUpload');
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
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
