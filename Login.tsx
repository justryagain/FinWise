import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image, TouchableOpacity } from 'react-native';
import {Text, TextInput, Button, Card, TouchableRipple} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from './supabaseClient';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = () => {
  /*
  // Sign In State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert('Welcome!', `Logged in as ${data.user.email}`);
      // Navigate to your main screen here
    }
  };

  // Handle OAuth sign in for Apple and Google
  const handleOAuthLogin = async (provider: 'apple' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      Alert.alert('OAuth Error', error.message);
    }
  };*/
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Your sign-in logic here
  };

  const handleAppleSignIn = () => {
    // Your Apple sign-in logic here
  };

  const handleGoogleSignIn = () => {
    // Your Google sign-in logic here
  };

  const handleForgotPassword = () => {
    // Your forgot password logic here
  };

  const handleCreateAccount = () => {
    // Your create account logic here
  };

  
  return (
    <LinearGradient colors={['#1E3A5F', '#136F63']} style={styles.background}>
      <View style={styles.container}>
        {/* Logo Container: Positioned absolutely to overlap the card */}
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
            placeholder="Login"
            mode="outlined"
            style={styles.input}
            value={login}
            onChangeText={setLogin}
            underlineColor="transparent"
            placeholderTextColor="#888"
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
          />
          {/*
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>*/}
          <Button mode="contained" onPress={handleSignIn} style={styles.signInButton}>
            Sign In
          </Button>
          {/* Google and Apple auth buttons */}
          <View style={styles.oauthContainer}>
  <View style={styles.oauthButtonWrapper}>
    <Button
      mode="contained"
      onPress={handleAppleSignIn}
      style={[styles.oauthButton, { borderRadius: 3 }]}
      contentStyle={[styles.buttonContent, { borderRadius: 3 }]}
      labelStyle={styles.buttonLabel}
      icon={() => <MaterialCommunityIcons name="apple" size={25} color="#fff" />}
    >
      Apple
    </Button>
  </View>
  <View style={styles.oauthButtonWrapper}>
    <Button
      mode="contained"
      onPress={handleGoogleSignIn}
      style={[styles.oauthButton, { borderRadius: 3 }]}
      contentStyle={[styles.buttonContent, { borderRadius: 3 }]}
      labelStyle={styles.buttonLabel}
      icon={() => <MaterialCommunityIcons name="google" size={20} color="#fff" />}
    >
      Google
    </Button>
  </View>
</View>   
          {/* Separator */}
          <View style={styles.separator} />
          {/* Account Creation Prompt */}
          <View style={styles.accountPrompt}>
            <Text style={styles.promptText}>Don't have an account?</Text>
          </View>
          <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.linkText}> Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '70%',
    maxWidth: 280,
    backgroundColor: 'rgba(30, 30, 30, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 15,
  },
  logoContainer: {
    position: 'absolute',
    top: '23%',
    zIndex: 1,
    alignItems: 'center',
    paddingLeft: 20
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotText: {
    color: '#fff',
    fontSize: 12,
    textDecorationLine: 'underline',

  },
  signInButton: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#1DB954',
    marginTop: 10,
  },
  oauthContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  oauthButtonWrapper: {
    width: '48%',
    height: 40,
    borderRadius: 3,
    overflow: 'hidden',
  },
  oauthButton: {
    flex: 1,
    backgroundColor: '#000',
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  accountPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptText: {
    color: '#fff',
    fontSize: 14,
  },
  linkText: {
    color: '#1DB954',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;