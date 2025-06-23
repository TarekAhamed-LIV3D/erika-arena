import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { supabase } from '../lib/supabase';



type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginPage: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const {error} = await supabase.auth.signInWithPassword({email, password});
    if (error) {
      Alert.alert('Login Failed', error.message);
    } 
    else{
      navigation.navigate('Home');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animatable.Text animation="fadeInDown" style={styles.logo}>AutoCurate</Animatable.Text>
      <Animatable.Text animation="fadeInLeft" delay={200} style={styles.title}>Welcome Back</Animatable.Text>
      <Animatable.View animation="fadeInUp" delay={400} style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Home')}>
          <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.primaryButtonText}>Login</Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', padding: 24 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#2563EB', marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 24, color: '#1e293b' },
  form: { width: '100%', alignItems: 'center' },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#2563EB', fontSize: 15, marginTop: 4 },
});

export default LoginPage;