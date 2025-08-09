// app/(drawer)/rating.tsx
import TabSwitcher from '@/components/TabSwitcher';
import { ACCENT, FG, PRIVATE_KEY } from '@/constants';
import { ACHIEVEMENT_ABI, ACHIEVEMENT_ADDRESS } from '@/constants/achievementContract';
import { useContractCache } from '@/hooks/useContractCache';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function RatingScreen() {
  const tabs = ["Achievements", "Rating"]
  const { useContractQuery } = useContractCache(ACHIEVEMENT_ADDRESS, ACHIEVEMENT_ABI, PRIVATE_KEY);
  const [activeWeaponId, setActiveWeaponId] = useState(0); // 0 = «All»

  /* ---------- Достяжения ---------- */
  const { data: weaponTabs } = useContractQuery<any[]>('getWeaponTypes');

  /* ---------- Рейтинг ---------- */
  // const { data: ratingList = [] } = useContractQuery<any[]>('getRatingByWeapon', [
  //   weaponTabs[activeWeaponId].label === 'All' ? 0 : activeWeaponId,
  // ]);

  /* ---------- Рендер достижений ---------- */
  const renderAchievement = ({ item }: { item: any }) => (
    <View style={styles.badgeCard}>
      <Text style={styles.badgeText}>{item.badge}</Text>
    </View>
  );

  /* ---------- Рендер рейтинга ---------- */
  const renderRating = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.ratingRow}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.rating}</Text>
    </View>
  );

  const Achievements = ()=>{
    return (
      <>
      {/* <Text style={styles.sectionTitle}>Achievements</Text>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={renderAchievement}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.achievements}
      /> */}
      </>
    )
  }

  const Rating = ()=>{
    return (
      <>
      {/* <Text style={styles.sectionTitle}>Rating</Text>
      <FlatList
        data={ratingList}
        keyExtractor={(item) => item.address}
        renderItem={renderRating}
        style={styles.ratingList}
      /> */}
      </>
    )
  }

  return (
    <TabSwitcher
      tabs={tabs}
      containerStyle={styles.switcher}
    >
      <Achievements />
      <Rating />
    </TabSwitcher>
  );
}

const styles = StyleSheet.create({
  switcher: { margin: 12, borderRadius: 16, overflow: 'hidden' },
  container: { padding: 12, backgroundColor: '#111' },
  sectionTitle: { color: ACCENT, fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  achievements: { marginBottom: 16 },
  badgeCard: { backgroundColor: ACCENT + '33', padding: 8, marginRight: 8, borderRadius: 8 },
  badgeText: { color: FG, fontWeight: '600' },
  ratingList: { marginTop: 8 },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomColor: FG + '22',
    borderBottomWidth: 1,
  },
  rank: { color: FG, width: 30, fontWeight: 'bold' },
  name: { color: FG, flex: 1 },
  score: { color: ACCENT, fontWeight: 'bold', textAlign: 'right' },
});