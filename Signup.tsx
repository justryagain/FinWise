import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import {Text, TextInput, Button, Card} from 'react-native-paper';
import { supabase } from './supabaseClient';

const SignupScreen = () => {
  // Sign In State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Handle Sign In
  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert('Welcome!', `Logged in as ${data.user.email}`);
      // Navigate to the main app screen here
    }
  };

  // Handle Google Sign In
  const handleOAuthLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });

    if (error) {
      Alert.alert('OAuth Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.authContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              style={[
                styles.input,
                focusedInput === 'email' && styles.inputFocused, // Changes border on focus
              ]}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              style={[
                styles.input,
                focusedInput === 'password' && styles.inputFocused, // Changes border on focus
              ]}
            />
            {/* Normal Sign In Button */}
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
              Sign In
            </Button>

            {/* Google Sign In Button */}
            <Button
              mode="outlined"
              icon="google"
              onPress={handleOAuthLogin}
              style={styles.oauthButton}
              textColor="#fff"
            >
              Sign in with Google
            </Button>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c', // 🔹 Modern Grey Background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authContainer: {
    width: '25%', // 🔹 Smaller width for compact layout
    minWidth: 280, // 🔹 Minimum width for smaller screens
  },
  card: {
    backgroundColor: '#1e1e1e', // 🔹 Dark panel like Netflix
    paddingVertical: 30,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#f4f4f4', // 🔹 Light grey input field for contrast
    borderColor: '#ccc', // Default border
  },
  inputFocused: {
    borderColor: '#E50914', // 🔹 Netflix Red border on focus
    borderWidth: 2,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#E50914', // 🔹 Netflix Red
    borderRadius: 5, // 🔹 Matches Google button
  },
  oauthButton: {
    marginTop: 10,
    borderRadius: 5,
    borderColor: '#fff',
  },
});

export default SignupScreen;