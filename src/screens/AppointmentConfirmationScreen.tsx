import { Image, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors } from '../theme/colors';
import { AppHeader, BottomTabs } from '../components/AppChrome';

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentConfirmation'>;

export function AppointmentConfirmationScreen({ navigation, route }: Props) {
  const { doctor, selectedSlot } = route.params;
  const [calendarSync, setCalendarSync] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <View style={styles.screen}>
      <AppHeader showAvatar={false} />
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.successText}>✓</Text>
        </View>
        <Text style={styles.title}>Booking Confirmed</Text>
        <Text style={styles.subtitle}>Your appointment has been successfully scheduled.</Text>

        <View style={styles.card}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.name}>{doctor.name}</Text>
              <Text style={styles.role}>{doctor.role}</Text>
            </View>
            <Image source={{ uri: doctor.image }} style={styles.image} />
          </View>
          <Summary icon="▦" title={doctor.appointmentType} value={`${selectedSlot.date} at ${selectedSlot.time}`} />
          <Summary icon="⌖" title={doctor.location} value={doctor.address} />
          <View style={styles.divider} />
          <Fee label="Consultation Fee" value={doctor.consultationFee} />
          <Fee label="Insurance Coverage" value={doctor.insuranceCoverage} muted />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Due</Text>
            <View style={styles.totalBlock}>
              <Text style={styles.total}>{doctor.totalDue}</Text>
              <Text style={styles.covered}>PAID/COVERED</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.automationTitle}>Automation</Text>
          <Setting label="Automatically sync to my Google Calendar" value={calendarSync} onValueChange={setCalendarSync} />
          <Setting label="Turn off duplicate SMS alerts" value={smsAlerts} onValueChange={setSmsAlerts} />
          <View style={styles.familyCard}>
            <Text style={styles.familyIcon}>✉</Text>
            <Text style={styles.familyText}>Send appointment receipt details to family or caregiver via text message.</Text>
          </View>
        </View>

        <Pressable style={styles.doneButton} onPress={() => navigation.popToTop()}>
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </View>
      <BottomTabs active="Assist" />
    </View>
  );
}

function Summary({ icon, title, value }: { icon: string; title: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryIcon}>{icon}</Text>
      <View style={styles.summaryCopy}>
        <Text style={styles.summaryTitle}>{title}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
      </View>
    </View>
  );
}

function Fee({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <View style={styles.feeRow}>
      <Text style={styles.feeLabel}>{label}</Text>
      <Text style={[styles.feeValue, muted && styles.feeMuted]}>{value}</Text>
    </View>
  );
}

function Setting({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (value: boolean) => void }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingText}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: '#D9D4E4', true: colors.primary }} thumbColor="#FFFFFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  successIcon: { alignItems: 'center', alignSelf: 'center', backgroundColor: '#E7D99E', borderRadius: 19, height: 38, justifyContent: 'center', marginTop: 10, width: 38 },
  successText: { color: colors.gold, fontSize: 21, fontWeight: '900' },
  title: { color: colors.text, fontSize: 17, fontWeight: '900', marginTop: 12, textAlign: 'center' },
  subtitle: { color: colors.muted, fontSize: 10, marginTop: 4, textAlign: 'center' },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 8, borderWidth: 1, marginTop: 16, padding: 14 },
  summaryTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: colors.text, fontSize: 13, fontWeight: '900' },
  role: { color: colors.muted, fontSize: 10, marginTop: 3 },
  image: { borderRadius: 5, height: 42, width: 36 },
  summaryRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  summaryIcon: { color: colors.primary, fontSize: 13, width: 16 },
  summaryCopy: { flex: 1 },
  summaryTitle: { color: colors.text, fontSize: 10, fontWeight: '900' },
  summaryValue: { color: '#675E78', fontSize: 10, lineHeight: 14, marginTop: 2 },
  divider: { backgroundColor: colors.border, height: 1, marginVertical: 13 },
  feeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  feeLabel: { color: colors.muted, fontSize: 10 },
  feeValue: { color: colors.text, fontSize: 10, fontWeight: '800' },
  feeMuted: { color: colors.muted },
  totalRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 11 },
  totalLabel: { color: colors.text, fontSize: 11, fontWeight: '900' },
  totalBlock: { alignItems: 'flex-end' },
  total: { color: colors.primary, fontSize: 16, fontWeight: '900' },
  covered: { color: colors.success, fontSize: 7, fontWeight: '900', marginTop: 2 },
  automationTitle: { color: colors.text, fontSize: 12, fontWeight: '900', marginBottom: 5 },
  settingRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', minHeight: 36 },
  settingText: { color: '#5E566F', flex: 1, fontSize: 10, lineHeight: 14, paddingRight: 10 },
  familyCard: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 7, flexDirection: 'row', gap: 8, marginTop: 9, padding: 11 },
  familyIcon: { color: colors.primary, fontSize: 13 },
  familyText: { color: colors.primaryDark, flex: 1, fontSize: 10, lineHeight: 14 },
  doneButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 6, marginTop: 16, paddingVertical: 13 },
  doneText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
});
