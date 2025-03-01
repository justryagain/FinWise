import React, { useEffect, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login.tsx';
import SignupScreen from './Signup.tsx';
import MainScreen from './Main.tsx';
import { supabase } from './supabaseClient';

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && navigationRef.current) {
        // Navigate to MainScreen when a session is detected
        navigationRef.current.navigate('MainScreen', { email: session.user.email });
      }
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}