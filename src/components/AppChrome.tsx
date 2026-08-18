import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function AppHeader({ onBack, showAvatar = true }: { onBack?: () => void; showAvatar?: boolean }) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {onBack ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} style={styles.iconButton}>
            <Text style={styles.iconText}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.logo}>
            <Text style={styles.logoText}>HB</Text>
          </View>
        )}
        <Text style={styles.brand}>HealthBridge</Text>
      </View>
      <View style={styles.right}>
        <Pressable accessibilityRole="button" accessibilityLabel="Share" style={styles.smallIcon}>
          <Text style={styles.smallIconText}>↗</Text>
        </Pressable>
        {showAvatar ? (
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' }}
            style={styles.avatar}
          />
        ) : null}
      </View>
    </View>
  );
}

export function BottomTabs({ active = 'Assist' }: { active?: 'Timeline' | 'Coverage' | 'Assist' | 'Profile' }) {
  const tabs = [
    { label: 'Timeline', icon: '▦' },
    { label: 'Coverage', icon: '◇' },
    { label: 'Assist', icon: '✦' },
    { label: 'Profile', icon: '○' },
  ] as const;

  return (
    <View style={styles.tabs}>
      {tabs.map((tab) => {
        const isActive = tab.label === active;
        return (
          <View key={tab.label} style={styles.tabItem}>
            <View style={[styles.tabIcon, isActive && styles.tabIconActive]}>
              <Text style={[styles.tabIconText, isActive && styles.tabIconTextActive]}>{tab.icon}</Text>
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  left: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  right: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  brand: { color: colors.primaryDark, fontSize: 13, fontWeight: '800' },
  logo: {
    alignItems: 'center',
    backgroundColor: '#E9F5F1',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  logoText: { color: colors.primaryDark, fontSize: 9, fontWeight: '900' },
  iconButton: { alignItems: 'center', height: 28, justifyContent: 'center', width: 28 },
  iconText: { color: colors.primary, fontSize: 26, lineHeight: 26 },
  smallIcon: { alignItems: 'center', height: 26, justifyContent: 'center', width: 26 },
  smallIconText: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  avatar: { borderRadius: 13, height: 26, width: 26 },
  tabs: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingTop: 7,
  },
  tabItem: { alignItems: 'center', minWidth: 56 },
  tabIcon: { alignItems: 'center', height: 22, justifyContent: 'center', width: 22 },
  tabIconActive: { backgroundColor: colors.primarySoft, borderRadius: 11 },
  tabIconText: { color: colors.muted, fontSize: 12 },
  tabIconTextActive: { color: colors.primary, fontWeight: '900' },
  tabLabel: { color: colors.muted, fontSize: 9, marginTop: 2 },
  tabLabelActive: { color: colors.primary, fontWeight: '800' },
});
