// src/screens/SignUpScreen.js
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { BACKEND_URL } from '../utils/config';

const SignUpScreen = () => {
  const router = useRouter();

  const [form1, setForm1] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  const [form2, setForm2] = useState({
    birthDate: new Date(),
    gender: '',
    city: '',
    cin: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    if (form1.password !== form1.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
  
    try {
      const response = await fetch(`${BACKEND_URL}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form1.email,
          nomComplet: form1.fullName,
          motDePasse: form1.password,
          dateNaissance: form2.birthDate.toISOString().split('T')[0],
          sexe: form2.gender,
          ville: form2.city,
          cin: form2.cin,
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        Alert.alert('Succès', 'Compte créé !');
        router.push('/login');
      } else {
        Alert.alert('Erreur', data.message || 'Une erreur est survenue.');
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
    }}
    >
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={text => setForm1({ ...form1, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom complet"
        placeholderTextColor="#999"
        onChangeText={text => setForm1({ ...form1, fullName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={text => setForm1({ ...form1, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmation mot de passe"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={text => setForm1({ ...form1, confirmPassword: text })}
      />

<View style={styles.datesContainer}>
  <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
    <Text style={styles.dateLabel}>DATE DE NAISSANCE</Text>
    <Text style={styles.dateValue}>{form2.birthDate.toLocaleDateString('fr-FR')}</Text>
  </TouchableOpacity>
</View>

{showDatePicker && (
  <DateTimePicker
    value={form2.birthDate}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
        setForm2({ ...form2, birthDate: selectedDate });
      }
    }}
  />
)}

      <Text style={styles.label}>Sexe</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form2.gender}
          onValueChange={value => setForm2({ ...form2, gender: value })}
          style={styles.picker}
        >
          <Picker.Item label="Choisir..." value="" />
          <Picker.Item label="Féminin" value="F" />
          <Picker.Item label="Masculin" value="H" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Ville / Quartier"
        placeholderTextColor="#999"
        onChangeText={text => setForm2({ ...form2, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro CIN"
        placeholderTextColor="#999"
        onChangeText={text => setForm2({ ...form2, cin: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Créer le compte</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Vous avez déjà un compte ? Se connecter</Text>
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
  label: {
    fontWeight: '500',
    marginTop: 1,
    marginBottom: 8,
    color: '#69140E', // Couleur secondaire pour différencier
    fontSize: 10,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#A44200',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 11,
  },
  picker: {
    color: '#3C1518',
    fontSize: 11,
  },
  datesContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    padding: 5,
  },
  dateLabel: {
    fontSize: 11,
    color: '#767676',
    fontWeight: '600',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
  },
  button: {
    backgroundColor: '#69140E', // Bouton primaire
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  link: {
    color: '#D58936', // Accent orange doré
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 10,
  },
});


export default SignUpScreen;
