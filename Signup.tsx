import React, { useState } from 'react';
import { View, Alert, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from './supabaseClient';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/style';

const SignupScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleCreateAccount = async () => {
    // Check if passwords match
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    // Create the account with Supabase
    const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (signUpError) {
      Alert.alert('Sign Up Error', 'Email and password missing or invalid.');
      return;
    }
    
    // Optionally, you can automatically sign the user in if the account is confirmed
    // Supabase may automatically create a session if email confirmation is disabled.
    const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (signInError) {
      Alert.alert('Login Error', signInError.message);
    } else {
      Alert.alert('Welcome!', `Signed in as ${signInData.user?.email}`);
      navigation.navigate('MainScreen', { email });
    }
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#136F63']} style={styles.background}>
      <View style={styles.container}>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')} // Update with your logo path
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.header}> </Text>
          <TextInput
            placeholder="Email"
            mode="outlined"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            underlineColor="transparent"
            placeholderTextColor="#888"
            activeOutlineColor="#777"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            mode="outlined"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            underlineColor="transparent"
            placeholderTextColor="#888"
            activeOutlineColor="#777"
          />
          <TextInput
            placeholder="Repeat Password"
            secureTextEntry
            mode="outlined"
            style={styles.input}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            underlineColor="transparent"
            placeholderTextColor="#888"
            activeOutlineColor="#777"
          />
          <Button mode="contained" onPress={handleCreateAccount} style={styles.signInButton}>
            Create Account
          </Button>
          {/* Separator */}
          <View style={styles.separator} />
          {/* Already have an account prompt */}
          <View style={styles.accountPrompt}>
            <Text style={styles.promptText}>Already have an account?</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.linkText}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignupScreen;
