import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import doctors from '../data/doctors.json';
import { RootStackParamList } from '../types';
import { colors } from '../theme/colors';
import { DoctorCard } from '../components/DoctorCard';
import { AppHeader, BottomTabs } from '../components/AppChrome';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <AppHeader />
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeHeader />}
        renderItem={({ item, index }) => (
          <>
            {index === 3 ? <UrgentCareCard /> : null}
            <DoctorCard doctor={item} onPress={() => navigation.navigate('DoctorDetails', { doctor: item })} />
          </>
        )}
      />
      <BottomTabs active="Assist" />
    </View>
  );
}

function HomeHeader() {
  return (
    <>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput placeholder="Search by doctor or specialty" placeholderTextColor="#9B93AE" style={styles.searchInput} />
        </View>
        <Pressable style={styles.aiPill}>
          <Text style={styles.aiText}>AI Symptoms Lab</Text>
        </Pressable>
      </View>
      <View style={styles.chipRow}>
        {['Primary Care', '15-minute Lab', 'Near me'].map((chip) => (
          <View key={chip} style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
          </View>
        ))}
      </View>
      <View style={styles.sectionRow}>
        <View>
          <Text style={styles.resultTitle}>448 Results for</Text>
          <Text style={styles.resultType}>Specialists</Text>
        </View>
        <Text style={styles.sortText}>SORT BY RELEVANCE</Text>
      </View>
    </>
  );
}

function UrgentCareCard() {
  return (
    <View style={styles.urgent}>
      <Text style={styles.urgentLabel}>QUICK CARE</Text>
      <Text style={styles.urgentTitle}>Urgent Care Wait Times</Text>
      <Text style={styles.urgentCopy}>Nearby verified clinics currently have 8-15 minute availability.</Text>
      <Pressable style={styles.urgentButton}>
        <Text style={styles.urgentButtonText}>Get Directions</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 18 },
  searchRow: { alignItems: 'center', flexDirection: 'row', gap: 8, paddingTop: 6 },
  searchBox: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 38,
    paddingHorizontal: 10,
  },
  searchIcon: { color: colors.primary, fontSize: 19, marginRight: 6 },
  searchInput: { color: colors.text, flex: 1, fontSize: 11, paddingVertical: 0 },
  aiPill: { backgroundColor: colors.primarySoft, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 11 },
  aiText: { color: colors.primaryDark, fontSize: 10, fontWeight: '900' },
  chipRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  chip: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 16, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 7 },
  chipText: { color: colors.muted, fontSize: 10, fontWeight: '700' },
  sectionRow: { alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginTop: 18 },
  resultTitle: { color: colors.text, fontSize: 12, fontWeight: '900' },
  resultType: { color: colors.text, fontSize: 12, fontWeight: '900', marginTop: 2 },
  sortText: { color: colors.muted, fontSize: 8, fontWeight: '900' },
  urgent: { backgroundColor: colors.primary, borderRadius: 8, marginBottom: 12, padding: 14 },
  urgentLabel: { color: '#D8CCFF', fontSize: 8, fontWeight: '900' },
  urgentTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '900', marginTop: 6 },
  urgentCopy: { color: '#E9E3FF', fontSize: 11, lineHeight: 16, marginTop: 4 },
  urgentButton: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 13, marginTop: 12, paddingHorizontal: 13, paddingVertical: 7 },
  urgentButtonText: { color: colors.primaryDark, fontSize: 10, fontWeight: '900' },
});
