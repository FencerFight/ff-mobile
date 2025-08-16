import Button from '@/components/Button';
import DataTable from '@/components/DataTable';
import { FG } from '@/constants';
import { useContractCache } from '@/hooks/useContractCache';
import { currentNominationIdAtom, currentPairIndexAtom, currentTournamentIdAtom, duelsAtom, fighterPairsAtom, ParticipantType, sameGenderOnlyAtom } from "@/store";
import { exportExcel } from '@/utils/exportExcel';
import { generatePairs } from '@/utils/generatePairs';
import { getTopThreeFighters } from '@/utils/getTopThreeFighters';
import { truncate } from '@/utils/helpers';
import I18n from '@utils/i18n';
import { useAtom } from 'jotai';
import { Share2 } from 'lucide-react-native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function TournamentGridScreen() {
  const { mutateData } = useContractCache("tournament")
  const [fighterPairs, setFighterPairs] = useAtom(fighterPairsAtom);
  const [currentTournamentId] = useAtom(currentTournamentIdAtom)
  const [currentNominationId] = useAtom(currentNominationIdAtom)
  const [sameGenderOnly] = useAtom(sameGenderOnlyAtom);
  const [, setCurrentPairIndex] = useAtom(currentPairIndexAtom);
  const [duels, setDuels] = useAtom(duelsAtom);
  const headers = [I18n.t('name'), I18n.t('win'), I18n.t('win'), I18n.t('name')];

  const genPairs = async () => {
    if (fighterPairs[0][0].address !== "") {
      for (let pair of fighterPairs) {
        if (pair[0].name !== "—" || pair[1].name !== "—")
          try {
            await mutateData("confirmFight", [
              currentNominationId.weaponId,
              currentNominationId.id,
              pair[0].address,
              pair[1].address,
              pair[0].wins,
              pair[1].wins,
              currentTournamentId
            ])
          } catch(e) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: e.message
            })
          }
      }
    }
    const newFighters = fighterPairs.map(pair=>{
      if (pair[0].name === "—") {
        return pair[1]
      } else if (pair[1].name === "—") {
        return pair[0]
      } else {
        return pair[0].wins > pair[1].wins ? { ...pair[0], wins: 0 } : { ...pair[1], wins: 0 }
      }
    })
    setDuels(prev=>[...prev, fighterPairs])
    if (newFighters.length > 1) {
      generatePairs(newFighters, sameGenderOnly, setFighterPairs, setCurrentPairIndex)
    } else {
      const winners = getTopThreeFighters([...duels, fighterPairs])
      setFighterPairs([[]])

      await mutateData("finishTournament", [
        currentTournamentId,
        currentNominationId.id,
        winners
      ])
    }
  }

  const getDataTable = (data: ParticipantType[][]) => data.map(([f1, f2]) => [truncate(f1.name), f1.wins.toString(), f2.wins.toString(), truncate(f2.name)])

    /* собираем все секции в массив для FlatList */
  const sections = [
    /* текущий этап */
    ...(fighterPairs.filter(p => p.length).length
      ? [
          { key: 'current', title: I18n.t('currentStage'), data: getDataTable(fighterPairs) },
        ]
      : []),
    /* исторические этапы */
    ...duels.map((duel, i) => ({
      key: `duel-${i}`,
      title: `${i + 1} ${I18n.t('stage')}`,
      data: getDataTable(duel),
    })),
  ];

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
      renderItem={({ item, index }) => (
        <View style={styles.duelWrap}>
          <Text style={styles.duelTitle}>{item.title}</Text>
          <DataTable data={item.data} headers={headers} />
          {index === 0 ?
          (fighterPairs.filter(p => p.length).length ? (
            <Button
              title={I18n.t('stageEnd')}
              onPress={genPairs}
              disabled={
                currentNominationId.id < 0 || fighterPairs.length !== fighterPairs.filter(pairs=>pairs.filter(pair=>pair.wins || pair.name !== "—").length).length
              }
            />
          ) : <></>)
          :
          <></>
          }
        </View>
      )}
      ListFooterComponent={
        <Button onPress={() => exportExcel(duels)}>
          <Share2 color={FG} size={28} />
        </Button>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 50 },
  duelWrap: { flexDirection: "column", rowGap: 10, marginBottom: 20 },
  duelTitle: { color: FG, textAlign: "center", fontFamily: "IBMPlexSansBold", fontSize: 28 }
});