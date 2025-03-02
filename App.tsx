import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login.tsx';
import SignupScreen from './Signup.tsx';
import MainScreen from './Main.tsx';
import { supabase } from './supabaseClient';
import { RootStackParamList } from './routes';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user.email) {
        navigationRef.current?.navigate('MainScreen', { email: session.user.email });
      } else {
        navigationRef.current?.navigate('LoginScreen');
      }
      setLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user.email) {
        navigationRef.current?.navigate('MainScreen', { email: session.user.email });
      } else {
        navigationRef.current?.navigate('LoginScreen');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer ref={navigationRef as any}> 
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};