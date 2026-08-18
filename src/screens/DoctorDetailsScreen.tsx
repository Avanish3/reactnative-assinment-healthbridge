import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, SelectedSlot } from '../types';
import { colors } from '../theme/colors';
import { AppButton } from '../components/AppButton';
import { AppHeader, BottomTabs } from '../components/AppChrome';

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorDetails'>;

export function DoctorDetailsScreen({ navigation, route }: Props) {
  const { doctor } = route.params;
  const firstSlot = useMemo<SelectedSlot>(() => {
    const day = doctor.appointmentDays[0];
    return { day: day.day, date: day.date, time: day.times[0] };
  }, [doctor]);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot>(firstSlot);

  return (
    <View style={styles.screen}>
      <AppHeader onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Image source={{ uri: doctor.image }} style={styles.profileImage} />
          <Text style={styles.name}>{doctor.name}, {doctor.degree}</Text>
          <Text style={styles.role}>{doctor.specialty}</Text>
          <Text style={styles.about}>{doctor.about}</Text>
          <View style={styles.tagWrap}>
            {doctor.careTags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Appointments</Text>
        <Text style={styles.sectionHint}>Select a time to book instantly.</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
          {doctor.appointmentDays.map((day) => (
            <View key={`${day.day}-${day.date}`} style={styles.dayColumn}>
              <Text style={styles.dayName}>{day.day}</Text>
              <Text style={styles.dateText}>{day.date}</Text>
              {day.times.map((time) => {
                const active = selectedSlot.date === day.date && selectedSlot.time === time;
                return (
                  <Pressable key={time} onPress={() => setSelectedSlot({ day: day.day, date: day.date, time })} style={[styles.timeChip, active && styles.timeChipActive]}>
                    <Text style={[styles.timeText, active && styles.timeTextActive]}>{time}</Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </ScrollView>

        <View style={styles.phoneCard}>
          <View style={styles.phoneIcon}>
            <Text style={styles.phoneIconText}>☎</Text>
          </View>
          <View style={styles.phoneCopy}>
            <Text style={styles.phoneTitle}>Prefer to book over the phone?</Text>
            <Text style={styles.phoneText}>Call the Rx Front Desk directly at 415-555-0148. They can help confirm insurance before arrival.</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Office Location</Text>
          <Text style={styles.address}>{doctor.address}</Text>
          <View style={styles.map}>
            <View style={styles.mapRoad} />
            <View style={[styles.mapRoad, styles.mapRoadTwo]} />
            <View style={styles.pin}><Text style={styles.pinText}>•</Text></View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Verified Care</Text>
          <Detail icon="★" value={`${doctor.rating.toFixed(1)} / 5 patient rating`} />
          <Detail icon="▣" value={`${doctor.reviews} recommended reviews`} />
          <Detail icon="○" value={doctor.waitTime} />
          <Detail icon="$" value={`${doctor.totalDue} estimated due after insurance`} />
        </View>
      </ScrollView>
      <View style={styles.bookingBar}>
        <View>
          <Text style={styles.bookingLabel}>Selected</Text>
          <Text style={styles.bookingTime}>{selectedSlot.date} at {selectedSlot.time}</Text>
        </View>
        <View style={styles.bookingButton}>
          <AppButton label="Book Appointment" style={styles.compactButton} onPress={() => navigation.navigate('AppointmentConfirmation', { doctor, selectedSlot })} />
        </View>
      </View>
      <BottomTabs active="Assist" />
    </View>
  );
}

function Detail({ icon, value }: { icon: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <Text style={styles.detailText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 98 },
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  profileImage: { backgroundColor: colors.primarySoft, borderRadius: 6, height: 104, width: 84 },
  name: { color: colors.primaryDark, fontSize: 16, fontWeight: '900', marginTop: 13 },
  role: { color: colors.muted, fontSize: 11, fontWeight: '800', marginTop: 3 },
  about: { color: '#5E566F', fontSize: 11, lineHeight: 17, marginTop: 10, textAlign: 'center' },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 12 },
  tag: { backgroundColor: '#E8F8EF', borderRadius: 4, paddingHorizontal: 7, paddingVertical: 4 },
  tagText: { color: colors.success, fontSize: 8, fontWeight: '900' },
  sectionTitle: { color: colors.text, fontSize: 14, fontWeight: '900', marginTop: 17 },
  sectionHint: { color: colors.muted, fontSize: 9, marginTop: 2 },
  daysRow: { gap: 8, paddingVertical: 11 },
  dayColumn: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 8, borderWidth: 1, padding: 8, width: 86 },
  dayName: { color: colors.primaryDark, fontSize: 10, fontWeight: '900', textAlign: 'center' },
  dateText: { color: colors.muted, fontSize: 9, marginBottom: 7, marginTop: 2, textAlign: 'center' },
  timeChip: { alignItems: 'center', borderColor: colors.border, borderRadius: 6, borderWidth: 1, marginTop: 6, paddingVertical: 7 },
  timeChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  timeText: { color: colors.primaryDark, fontSize: 9, fontWeight: '800' },
  timeTextActive: { color: '#FFFFFF' },
  phoneCard: { backgroundColor: colors.primarySoft, borderRadius: 8, flexDirection: 'row', gap: 10, marginTop: 5, padding: 13 },
  phoneIcon: { alignItems: 'center', backgroundColor: '#E3D8FF', borderRadius: 15, height: 30, justifyContent: 'center', width: 30 },
  phoneIconText: { color: colors.primary, fontSize: 14 },
  phoneCopy: { flex: 1 },
  phoneTitle: { color: colors.primaryDark, fontSize: 11, fontWeight: '900' },
  phoneText: { color: '#6B6180', fontSize: 10, lineHeight: 15, marginTop: 4 },
  infoCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 8, borderWidth: 1, marginTop: 12, padding: 13 },
  cardTitle: { color: colors.primaryDark, fontSize: 12, fontWeight: '900' },
  address: { color: '#5E566F', fontSize: 10, lineHeight: 15, marginTop: 7 },
  map: { backgroundColor: '#DDF0EF', borderRadius: 7, height: 92, marginTop: 10, overflow: 'hidden' },
  mapRoad: { backgroundColor: '#FFFFFF', height: 12, left: -12, opacity: 0.9, position: 'absolute', top: 38, transform: [{ rotate: '-18deg' }], width: 180 },
  mapRoadTwo: { left: 70, top: 22, transform: [{ rotate: '38deg' }] },
  pin: { alignItems: 'center', backgroundColor: colors.primary, borderColor: '#FFFFFF', borderRadius: 15, borderWidth: 3, height: 30, justifyContent: 'center', left: 122, position: 'absolute', top: 48, width: 30 },
  pinText: { color: '#FFFFFF', fontSize: 16, lineHeight: 18 },
  detailRow: { alignItems: 'center', flexDirection: 'row', gap: 9, marginTop: 10 },
  detailIcon: { color: colors.gold, fontSize: 11, fontWeight: '900', width: 14 },
  detailText: { color: '#5E566F', flex: 1, fontSize: 10, lineHeight: 14 },
  bookingBar: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    bottom: 53,
    flexDirection: 'row',
    gap: 12,
    left: 0,
    padding: 12,
    position: 'absolute',
    right: 0,
  },
  bookingLabel: { color: colors.muted, fontSize: 9, fontWeight: '900' },
  bookingTime: { color: colors.primaryDark, fontSize: 11, fontWeight: '900', marginTop: 2 },
  bookingButton: { flex: 1 },
  compactButton: { borderRadius: 6, minHeight: 42 },
});
