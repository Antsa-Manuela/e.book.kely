// src/screens/LoginScreen.js
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { BACKEND_URL } from '../utils/config';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse: password }),
      });

      const data = await response.json();
      if (data.success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Erreur', data.message || 'Email ou mot de passe incorrect');
      }
    } catch (error) {
      Alert.alert('Erreur serveur', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{
      ...styles.container,
      flexGrow: 1,
      justifyContent: 'center',
    }}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Mot de passe" placeholderTextColor="#999" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.link}>Pas encore inscrit ? Créer un compte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },  
  title: {
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: '#3C1518', // Couleur principale
  },
  input: {
    borderWidth: 1,
    borderColor: '#A44200', // Accent tertiaire
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 10,
    color: '#3C1518',
  },
  button: {
    backgroundColor: '#69140E', // Bouton primaire
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  link: {
    marginTop: 5,
    color: '#D58936', // Accent orange doré
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 10,
  },
});

export default LoginScreen;
