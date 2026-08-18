import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from './src/types';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { DoctorDetailsScreen } from './src/screens/DoctorDetailsScreen';
import { AppointmentConfirmationScreen } from './src/screens/AppointmentConfirmationScreen';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();
const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.background } };

export default function App() { return <NavigationContainer theme={theme}><StatusBar style="dark" /><Stack.Navigator screenOptions={{ headerShown: false, headerShadowVisible: false, headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text, headerTitleStyle: { fontWeight: '700' }, contentStyle: { backgroundColor: colors.background } }}><Stack.Screen name="Login" component={LoginScreen} /><Stack.Screen name="Home" component={HomeScreen} /><Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} /><Stack.Screen name="AppointmentConfirmation" component={AppointmentConfirmationScreen} /></Stack.Navigator></NavigationContainer>; }
