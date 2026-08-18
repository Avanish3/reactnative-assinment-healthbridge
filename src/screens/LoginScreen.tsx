import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import users from '../data/users.json';
import { RootStackParamList } from '../types';
import { colors } from '../theme/colors';
import { AppButton } from '../components/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
export function LoginScreen({ navigation }: Props) {
  const [identifier, setIdentifier] = useState('patient@healthbridge.com');
  const [password, setPassword] = useState('Health@123');
  const [error, setError] = useState('');
  const login = () => {
    const user = users.find(item => (item.email.toLowerCase() === identifier.trim().toLowerCase() || item.username.toLowerCase() === identifier.trim().toLowerCase()) && item.password === password);
    if (!user) { setError('We could not verify those credentials. Please try again.'); return; }
    setError(''); navigation.replace('Home', { patientName: user.name });
  };
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
    <View style={styles.hero}><View style={styles.mark}><Text style={styles.markText}>+</Text></View><Text style={styles.brand}>HealthBridge</Text><Text style={styles.tagline}>Your care, connected.</Text></View>
    <View style={styles.form}><Text style={styles.title}>Welcome back</Text><Text style={styles.subtitle}>Sign in to find the care you need.</Text>
      <Text style={styles.label}>EMAIL OR USERNAME</Text><TextInput autoCapitalize="none" autoComplete="username" keyboardType="email-address" onChangeText={setIdentifier} placeholder="Enter your email or username" placeholderTextColor="#92A4A6" style={styles.input} value={identifier} />
      <Text style={styles.label}>PASSWORD</Text><TextInput autoComplete="password" onChangeText={setPassword} placeholder="Enter your password" placeholderTextColor="#92A4A6" secureTextEntry style={styles.input} value={password} />
      {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
      <AppButton label="Sign in" onPress={login} style={styles.button} />
      <View style={styles.demo}><Text style={styles.demoTitle}>Demo credentials</Text><Text style={styles.demoText}>patient@healthbridge.com  •  Health@123</Text></View>
    </View>
  </KeyboardAvoidingView>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 24 }, hero: { alignItems: 'center', marginBottom: 42 }, mark: { width: 68, height: 68, borderRadius: 23, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }, markText: { color: '#fff', fontSize: 43, fontWeight: '300', marginTop: -3 }, brand: { fontSize: 29, fontWeight: '800', color: colors.text }, tagline: { color: colors.muted, fontSize: 15, marginTop: 5 }, form: { backgroundColor: '#fff', borderRadius: 24, padding: 22, shadowColor: '#1A5154', shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 3 }, title: { color: colors.text, fontSize: 23, fontWeight: '800' }, subtitle: { color: colors.muted, marginTop: 7, marginBottom: 26 }, label: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 0.8, marginBottom: 8 }, input: { height: 54, borderWidth: 1, borderColor: colors.border, borderRadius: 13, paddingHorizontal: 14, color: colors.text, fontSize: 15, marginBottom: 18 }, error: { color: colors.danger, fontSize: 13, marginTop: -7, marginBottom: 14 }, button: { marginTop: 3 }, demo: { marginTop: 20, backgroundColor: colors.primarySoft, borderRadius: 12, padding: 12 }, demoTitle: { color: colors.primaryDark, fontWeight: '700', fontSize: 12 }, demoText: { color: colors.primaryDark, fontSize: 12, marginTop: 3 } });
