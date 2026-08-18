import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type Props = { label: string; onPress: () => void; loading?: boolean; style?: ViewStyle };

export function AppButton({ label, onPress, loading = false, style }: Props) {
  return <Pressable accessibilityRole="button" disabled={loading} onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{label}</Text>}
  </Pressable>;
}

const styles = StyleSheet.create({
  button: { backgroundColor: colors.primary, minHeight: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  pressed: { backgroundColor: colors.primaryDark },
  text: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
