import React, { useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from './supabaseClient';
import { RootStackParamList } from './routes';
import styles from './styles/style';

type ResetPasswordRouteParams = {
  email?: string;
};

// Explicitly type the navigation prop using your RootStackParamList for ResetPasswordScreen.
type ResetPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ResetPasswordScreen'
>;

const ResetPasswordScreen = () => {
  // Cast route.params to our defined type. If no email is passed, default to an empty string.
  const { email: preFilledEmail = '' } = useRoute().params as ResetPasswordRouteParams;
  const [email, setEmail] = useState<string>(preFilledEmail);
  const navigation = useNavigation<ResetPasswordNavigationProp>();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    
    // Set your redirect URL as needed for your app configuration.
    const redirectUrl = 'https://yourapp.com/reset-password';
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
    
    if (error) {
      Alert.alert('Reset Error', error.message);
    } else {
      Alert.alert('Success', 'Password reset instructions have been sent to your email.');
    }
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#136F63']} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Reset Password</Text>
          <TextInput
            placeholder="Email"
            mode="outlined"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            underlineColor="transparent"
            placeholderTextColor="#888"
            activeOutlineColor="#777"
            textContentType="none"
          />
          <Button mode="contained" onPress={handleResetPassword} style={styles.signInButton}>
            Reset
          </Button>
          {/* Separator */}
          <View style={styles.separator} />
        <View style={styles.accountPrompt}>
            <Text style={styles.promptText}>Remember your password?</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen', params: undefined }],
              })
            }
          >
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ResetPasswordScreen;
