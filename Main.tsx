import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles/style';
import { useNavigation, useRoute } from '@react-navigation/native';

const MainScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { email } = route.params as { email: string };

    return (
        <LinearGradient colors={['#1E3A5F', '#136F63']} style={styles.background}>
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>Welcome {email} </Text>
            </View>
        </View>
        </LinearGradient>
    )
}

export default MainScreen;