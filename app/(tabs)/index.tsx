import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useAtom } from 'jotai';
import { CloudDownload, Mars, Plus, RefreshCw, Save, Trash2, Venus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker';
import Toast from 'react-native-toast-message';

import Button from '@/components/Button';
import { GenderSwitch } from '@/components/GenderSwitch';
import HorizontalSelect from '@/components/HorizontalSelect';
import InputText from '@/components/InputText';
import Section from '@/components/Section';
import Switch from '@/components/Switch';
import { ACCENT, ACCENT_TRANSPARENT, BG, FG, langLabels, STORAGE_PREFIX, SURFACE } from '@/constants';
import { useAppUpdate } from '@/hooks/useAppUpdate';
import { useContractCache } from '@/hooks/useContractCache';
import {
  currentNominationIdAtom,
  currentPairIndexAtom,
  currentTournamentIdAtom,
  duelsAtom,
  fighterPairsAtom,
  fightTimeAtom,
  fightTimeDefault,
  Gender,
  hitZonesAtom,
  hitZonesDefault,
  languageAtom,
  ParticipantType,
  sameGenderOnlyAtom,
  soundsUpdateAtom
} from '@/store';
import { TournamentInfo } from '@/typings';
import { generatePairs } from '@/utils/generatePairs';
import { onlySurname } from '@/utils/helpers';
import I18n from '@utils/i18n';

export default function SettingsScreen() {
  const [currentTournamentId, setCurrentTournamentId] = useAtom(currentTournamentIdAtom);
  const [currentNominationId, setCurrentNominationId] = useAtom(currentNominationIdAtom);
  const { useContractQuery: tournamentQuery } = useContractCache("tournament")
  const { useContractQuery: userQuery } = useContractCache("user")
  const { data: tournamentInfo } = tournamentQuery<{ tournaments: TournamentInfo[], ids: bigint[]}>("getTournaments")
  const getTournamentIndex = () => tournamentInfo?.ids.findIndex(id=>Number(id) === currentTournamentId)!
  const tournaments = tournamentInfo?.tournaments[getTournamentIndex()]
  const nomination = tournaments?.nominations[currentNominationId.id < 0 ? 0 : currentNominationId.id]
  const { data: nominationsNames } = tournamentQuery<string[][]>("getNominations", [tournaments?.nominations.map(n=>n.weaponId)])
  const { data: names, mutate: mutateNames } = userQuery<string[]>("getNames", [nomination?.participants])
  /* ---------- атомы ---------- */
  const [fightTime, setFightTime] = useAtom(fightTimeAtom);
  const [hitZones, setHitZones] = useAtom(hitZonesAtom);
  const [fighterPairs, setFighterPairs] = useAtom(fighterPairsAtom);
  const [currentPairIndex, setCurrentPairIndex] = useAtom(currentPairIndexAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const [sameGenderOnly, setSameGenderOnly] = useAtom(sameGenderOnlyAtom);
  const [, setUpdateSounds] = useAtom(soundsUpdateAtom);
  const [, setDuels] = useAtom(duelsAtom);
  const { showUpdateBtn, applyUpdate } = useAppUpdate()


  /* ---------- состояние ---------- */
  const [newName, setNewName] = useState('');
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [showPicker, setShowPicker] = useState(false);

  /* ---------- загрузка ---------- */
  useEffect(() => {
    (async () => {
      const [t, z, p] = await Promise.all([
        AsyncStorage.getItem(STORAGE_PREFIX + 'fightTime'),
        AsyncStorage.getItem(STORAGE_PREFIX + 'hitZones'),
        AsyncStorage.getItem(STORAGE_PREFIX + 'participants'),
      ]);

      if (t) setFightTime(Number(t));
      if (z) setHitZones(JSON.parse(z));
      if (p) setParticipants(JSON.parse(p));
    })();
  }, []);

  /* ---------- сохранение ---------- */
  const saveAll = async () => {
    await AsyncStorage.setItem(STORAGE_PREFIX + 'fightTime', fightTime.toString());
    await AsyncStorage.setItem(STORAGE_PREFIX + 'hitZones', JSON.stringify(hitZones));
    await AsyncStorage.setItem(STORAGE_PREFIX + 'participants', JSON.stringify(participants));
    Toast.show({
      type: "success",
      text1: '✓',
      text2: I18n.t('settingsSaved'),
    })
  };

    const selectPair = (idx: number) => {
      if (idx < 0 || idx >= fighterPairs.length) return;
      setCurrentPairIndex(idx);
    };

  /* ---------- участники ---------- */
  const addParticipant = () => {
    const name = newName.trim();
    if (!name) return;
    setParticipants([...participants, { name, gender, wins: 0, address: "" }]);
    setNewName('');
  };
  const removeParticipant = (idx: number) =>
    setParticipants(participants.filter((_, i) => i !== idx));

  const genPairs = () => {
    let newParticipants = participants

    if (nomination && names) {
      newParticipants = nomination.participants.map((addr, idx)=>({ name: names[idx], wins: 0, gender: Number(nomination.gender) as Gender, address: addr }))
    }

    if (newParticipants.length < 2) {
      Toast.show({
        type: 'error',
        text1: I18n.t('addTwoFighters'),
      });
      return;
    }

    setDuels([])
    generatePairs(newParticipants, sameGenderOnly, setFighterPairs, setCurrentPairIndex)

  };

  /* ---------- звуки ---------- */
  const pickSound = async (type: 'bell' | 'warning') => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
      if (!res.canceled) {
        await deleteCustomSounds(type)
        const fileType = res.assets[0].name.split(".")[1]
        const target = `${FileSystem.documentDirectory}${type}_custom.${fileType}`;
        await FileSystem.copyAsync({ from: res.assets[0].uri, to: target });
        await AsyncStorage.setItem(STORAGE_PREFIX + type + 'Sound', target);
        Toast.show({
          type: "success",
          text1: "✓",
          text2: `${type} ${I18n.t("updated")}`,
        })
        setUpdateSounds(true)
      }
    } catch (e) {
        Toast.show({
          type: "error",
          text1: "X",
          text2: `${e}`,
        })
    }
  };

  const changeLang = () => {
    const langs = Object.keys(langLabels);
    const currentIndex = langs.indexOf(language);
    const newIndex = currentIndex + 1
    const newLang = langs[newIndex === langs.length ? 0 : newIndex];

    I18n.locale = newLang;
    AsyncStorage.setItem(STORAGE_PREFIX + 'language', newLang);
    setLanguage(newLang);
  };

  async function deleteCustomSounds(type: 'bell' | 'warning' | 'all') {
    if (type === "bell" || type === "all") {
      const customBellPath = await AsyncStorage.getItem(STORAGE_PREFIX + 'bellSound')
      if (customBellPath)
        await FileSystem.deleteAsync(customBellPath);
    }

    if (type === "warning" || type === "all") {
      const customWarningPath = await AsyncStorage.getItem(STORAGE_PREFIX + 'warningSound')
      if (customWarningPath)
        await FileSystem.deleteAsync(customWarningPath);
    }
  }

  const resetAll = async () => {
    setFightTime(fightTimeDefault)
    setHitZones(hitZonesDefault)
    await deleteCustomSounds("all")
    await AsyncStorage.clear();

    Toast.show({
      type: "success",
      text1: I18n.t('reset')
    })
  }

  const getName = (name: string) => name.length <= 14 ? name : onlySurname(name, 14)

  useEffect(()=>{
    if (showUpdateBtn) {
      Toast.show({
        type: "info",
        text1: I18n.t('newVersion'),
        text2: I18n.t('updateBtn'),
      })
    }
  }, [showUpdateBtn])

  useEffect(() => {
  (async () => {
    const savedLang = await AsyncStorage.getItem(STORAGE_PREFIX + 'language');
    if (savedLang) {
      setLanguage(savedLang);
      I18n.locale = savedLang;
    }
  })();
  }, []);

  const ParticipantsRows = ({ items }: {items: ParticipantType[] | Omit<ParticipantType, "wins"|"address">[]}) => {
    return items.map((p, idx) => (
          <View key={idx} style={styles.participantRow}>
            <Text style={styles.participantTxt}>{p.name}</Text>
            {p.gender === Gender.MALE ?
              <Mars size={15} color={FG} style={{ marginLeft: -125}} /> :
              <Venus size={15} color={FG} style={{ marginLeft: -125}} />
            }
            <TouchableOpacity onPress={() => removeParticipant(idx)}>
              <Trash2 size={22} color={FG} />
            </TouchableOpacity>
          </View>
        ))
  }

  return (
    <ScrollView key={language}style={styles.container} contentContainerStyle={styles.content}>
      {/* Кнопка смены языка */}
      <View style={styles.langRow}>
        <TouchableOpacity onPress={changeLang}>
          <Text style={styles.langBtn}>{langLabels[language]}</Text>
        </TouchableOpacity>
      </View>

      {tournamentInfo?.tournaments.length ?
      <Section title='Турниры'>
        <HorizontalSelect id={currentTournamentId} ids={tournamentInfo.ids} setId={(idx)=>{setCurrentTournamentId(Number(tournamentInfo.ids[idx])); mutateNames()}} items={tournamentInfo.tournaments.map(t=>t.name)} />
        {tournaments?.nominations.length && nominationsNames ?
        <HorizontalSelect id={currentNominationId.id} ids={tournaments.nominations.map(nom=>nom.nameId)} setId={(idx)=>{setCurrentNominationId({ id: idx, weaponId: Number(tournaments!.nominations[idx].weaponId) }); mutateNames()}} items={tournaments.nominations.map(n=>nominationsNames![Number(n.weaponId)][Number(n.nameId)])} />
        :
        <></>
        }
      </Section>
      :
      <></>
      }

      {/* --- 1. Участники --- */}
      <Section title={I18n.t('participants')}>
        {currentTournamentId < 0 ?
        <>
        <InputText
          placeholder={I18n.t('name')}
          value={newName}
          setValue={setNewName}
        />

        <GenderSwitch gender={gender} setGender={setGender} />

        <Button style={styles.addBtn} onPress={addParticipant}>
          <Plus size={28} color={FG} />
        </Button>

        <ParticipantsRows items={participants} />

        <View style={styles.genderRow}>
          <View style={[styles.genderRow, { marginVertical: 0 }]}>
            <Mars size={28} color={FG} />
            <Text style={styles.countTxt}>{participants.filter(p => p.gender === Gender.MALE).length}</Text>
          </View>
          <View style={[styles.genderRow, { marginVertical: 0, marginLeft: 30 }]}>
            <Venus size={28} color={FG} />
            <Text style={styles.countTxt}>{participants.filter(p => p.gender === Gender.FEMALE).length}</Text>
          </View>
        </View>

        <Switch title={I18n.t('sameGenderPairs')} value={sameGenderOnly} setValue={setSameGenderOnly} />
        </>
        :
        <>
        {names && <ParticipantsRows
                  items={names.map(name=>({ name, gender: Number(nomination!.gender) as Gender }))}
                  />
        }
        </>
        }

        <Button style={{ marginTop: 10 }} onPress={genPairs} title={I18n.t('randomizePairs')} stroke />
      </Section>

      {fighterPairs[0][0] ?
        <Section title={I18n.t('pairs')}>
          {fighterPairs.map((pair, idx) => (
            <Button
            key={idx}
            style={currentPairIndex === idx ? {...styles.pairItem, backgroundColor: ACCENT} : styles.pairItem}
            title={`${getName(pair[0].name)} VS ${getName(pair[1].name)}`}
            onPress={() => selectPair(idx)}
            />
          ))}
        </Section>
        :
        <></>
      }

      {/* --- 2. Длительность --- */}
      <Section title={I18n.t('fightDuration')}>
        <Button
          title={I18n.t('editTime')}
          onPress={() => setShowPicker(true)}
        />
          <TimerPickerModal
          hideHours
          visible={showPicker}
          setIsVisible={setShowPicker}
          onConfirm={({ minutes, seconds }) => {
              setFightTime(minutes * 60 + seconds);
              setShowPicker(false)
          }}
          modalTitle={I18n.t('fightDuration')}
          closeOnOverlayPress
          confirmButtonText='OK'
          buttonContainerProps={{ style: { backgroundColor: ACCENT } }}
          initialValue={{
            minutes: Math.floor(fightTime / 60),
            seconds: fightTime % 60,
          }}
          LinearGradient={null}
          styles={{
            theme: 'dark',
            backgroundColor: SURFACE,
            pickerContainer: {
              justifyContent: "center",
            },
            pickerItem: {
              color: FG,
              fontSize: 22,
              fontFamily: "IBMPlexSansRegular"
            },
            pickerLabel: {
              color: FG,
              fontSize: 16,
              fontFamily: "IBMPlexSansRegular"
            },
            button: {
              backgroundColor: ACCENT
            },
            confirmButton: {
              fontFamily: "IBMPlexSansSemiBold",
              backgroundColor: ACCENT,
              borderWidth: 0
            },
            cancelButton: {
              fontFamily: "IBMPlexSansSemiBold",
              borderColor: ACCENT,
              backgroundColor: SURFACE
            }
          }}
        />
      </Section>

      {/* --- 3. Зоны поражения --- */}
      <Section title={I18n.t('hitZones')}>
        {Object.entries(hitZones).map(([zone, pts]) => (
          <View key={zone} style={styles.zoneRow}>
            <Text style={styles.zoneLabel}>{I18n.t(zone)}</Text>
            <TextInput
              value={pts.toString()}
              keyboardType="numeric"
              onChangeText={(v) => setHitZones({ ...hitZones, [zone]: Number(v) || 0 })}
              style={styles.zoneInput}
            />
          </View>
        ))}
      </Section>

      {/* --- 4. Системные звуки --- */}
      <Section title={I18n.t('sounds')}>
        <Button onPress={() => pickSound('bell')} title={I18n.t('changeBellSound')} />
        <Button style={{ marginTop: 10 }} onPress={() => pickSound('warning')} title={I18n.t('changeWarningSound')} stroke />
      </Section>

      {/* --- 5. Сохранить --- */}
      <Section>
        <Button onPress={saveAll}>
          <Save size={28} color={FG} />
        </Button>
        <Button onPress={resetAll} style={{ marginTop: 10 }} stroke>
          <RefreshCw size={28} color={FG} />
        </Button>
        {showUpdateBtn ?
          <Button style={{ marginTop: 10 }} onPress={applyUpdate}>
            <CloudDownload size={28} color={FG} />
          </Button>
          :<></>
        }
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG, paddingTop: 30 },
  content:   { padding: 20 },

  langRow: { alignItems: 'flex-end', marginBottom: 12 },
  langBtn: { color: ACCENT, fontSize: 16, fontFamily: "IBMPlexSansSemiBold" },

  section: { backgroundColor: SURFACE, borderRadius: 16, padding: 16, marginBottom: 24 },

  input:      { backgroundColor: SURFACE, color: FG, borderRadius: 8, padding: 12, marginBottom: 8, fontFamily: "IBMPlexSansRegular" },
  addBtn:     { marginBottom: 12 },

  participantRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  participantTxt: { color: FG, fontSize: 16, width: 150, fontFamily: "IBMPlexSansMedium" },

  pairItem: { backgroundColor: ACCENT_TRANSPARENT, borderRadius: 8, padding: 12, marginBottom: 6 },

  row:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  zoneRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  zoneLabel:   { color: FG, fontSize: 16, fontFamily: "IBMPlexSansRegular" },
  zoneInput:   { width: 48, backgroundColor: SURFACE, color: FG, textAlign: 'center', borderRadius: 8, paddingVertical: 4, fontFamily: "IBMPlexSansRegular" },

  genderRow: { flexDirection: 'row', marginVertical: 8, justifyContent: 'center', alignItems: "center" },
  genderBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginRight: 8 },
  genderActive: { backgroundColor: ACCENT },



  countTxt: { color: FG, fontSize: 16, marginLeft: 10, fontFamily: "IBMPlexSansBold" },
});