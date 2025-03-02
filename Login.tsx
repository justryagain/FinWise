import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Alert, Image, TouchableOpacity } from 'react-native';
import {Text, TextInput, Button, Card, TouchableRipple} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from './supabaseClient'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles/style';

const LoginScreen = () => {
  const navigation = useNavigation<any>(); 
  const [email, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert('Welcome!', `Logged in as ${data.user.email}`);
      navigation.navigate('MainScreen', { email });
    }
  };

  const handleOAuthLogin = async (provider: 'apple' | 'google') => {
    console.log(`Attempting OAuth sign in with ${provider}`);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      console.error('OAuth Error:', error);
      Alert.alert('OAuth Error', error.message);
    }
  };

  const handleCreateAccount = () => {
    // Your create account logic here
  };

  const handleForgotPassword = () => {
    // Your forgot password logic here
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
            value={email}
            onChangeText={setLogin}
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
              onPress={() => handleOAuthLogin('apple')}
              style={[styles.oauthButton]}
              labelStyle={styles.buttonLabel}
              icon={() => <MaterialCommunityIcons name="apple" size={25} color="#fff" />}
            >
              Apple
            </Button>
          </View>
          <View style={styles.oauthButtonWrapper}>
            <Button
              mode="contained"
              onPress={() => handleOAuthLogin('google')}
              style={[styles.oauthButton]}
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

export default LoginScreen;