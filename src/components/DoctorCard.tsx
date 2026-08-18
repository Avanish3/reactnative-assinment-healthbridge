import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Doctor } from '../types';
import { colors } from '../theme/colors';

export function DoctorCard({ doctor, onPress }: { doctor: Doctor; onPress: () => void }) {
  const outOfNetwork = doctor.networkStatus.includes('Out');

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`View ${doctor.name}`} onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.mainRow}>
        <Image source={{ uri: doctor.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.nameRow}>
            <View style={styles.nameBlock}>
              <Text numberOfLines={1} style={styles.name}>
                {doctor.name}, {doctor.degree}
              </Text>
              <Text numberOfLines={1} style={styles.specialty}>{doctor.role}</Text>
            </View>
            <View style={[styles.badge, outOfNetwork && styles.badgeWarning]}>
              <Text style={[styles.badgeText, outOfNetwork && styles.badgeWarningText]}>{doctor.networkStatus}</Text>
            </View>
          </View>
          <Text numberOfLines={1} style={styles.tagLine}>{doctor.careTags.slice(0, 2).join(' | ')}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.rating}>★ {doctor.rating.toFixed(1)}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.meta}>{doctor.distance}</Text>
          </View>
        </View>
      </View>
      <View style={styles.slot}>
        <View>
          <Text style={styles.slotLabel}>NEXT SLOT</Text>
          <Text style={styles.slotText}>{doctor.nextSlot}</Text>
        </View>
        <Text style={styles.bookText}>View Profile & Book ›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 11,
    shadowColor: '#2C214D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: { opacity: 0.82 },
  mainRow: { flexDirection: 'row' },
  image: { backgroundColor: colors.primarySoft, borderRadius: 6, height: 58, width: 48 },
  content: { flex: 1, paddingLeft: 10 },
  nameRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 8 },
  nameBlock: { flex: 1 },
  name: { color: colors.text, fontSize: 13, fontWeight: '800' },
  specialty: { color: colors.muted, fontSize: 10, marginTop: 2 },
  badge: { backgroundColor: '#E8F8EF', borderRadius: 4, paddingHorizontal: 7, paddingVertical: 3 },
  badgeWarning: { backgroundColor: '#FFF3D4' },
  badgeText: { color: colors.success, fontSize: 8, fontWeight: '900' },
  badgeWarningText: { color: '#B56B00' },
  tagLine: { color: colors.primary, fontSize: 9, fontWeight: '700', marginTop: 6 },
  metaRow: { alignItems: 'center', flexDirection: 'row', marginTop: 7 },
  rating: { color: '#B28400', fontSize: 10, fontWeight: '800' },
  dot: { color: colors.muted, fontSize: 10, marginHorizontal: 5 },
  meta: { color: colors.muted, fontSize: 10 },
  slot: {
    alignItems: 'center',
    backgroundColor: colors.lavender,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  slotLabel: { color: colors.muted, fontSize: 8, fontWeight: '900' },
  slotText: { color: colors.primaryDark, fontSize: 10, fontWeight: '800', marginTop: 2 },
  bookText: { color: colors.primary, fontSize: 10, fontWeight: '800' },
});
