import { View, Text, Button } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles/style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from './supabaseClient';
import { RootStackParamList } from './routes';

// Correctly type navigation
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainScreen'>;

const MainScreen = () => {
    const route = useRoute();
    const navigation = useNavigation<NavigationProp>();

    // Ensure route.params exists and has an email
    const email = (route.params as { email?: string })?.email || 'Guest';

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error);
        } else {
            console.log("User logged out");
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' } as never],
            });
        }
    };

    return (
        <LinearGradient colors={['#1E3A5F', '#136F63']} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.header}>Welcome {email}</Text>
                </View>
                <View>
                    <Button title="Log out" onPress={handleLogout} />
                </View>
            </View>
        </LinearGradient>
    );
};

export default MainScreen;
