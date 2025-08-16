import Button from '@/components/Button';
import { GenderSwitch } from '@/components/GenderSwitch';
import InputText from '@/components/InputText';
import Loader from '@/components/Loader';
import Section from '@/components/Section';
import UniversalSelect from '@/components/UniversalSelect';
import WeaponNominationSelect from '@/components/WeaponNominationSelect';
import { BG, FG } from '@/constants';
import { useContractCache } from '@/hooks/useContractCache';
import { Gender, userDataAtom } from '@/store';
import { Rating } from '@/typings';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

export default function ProfileScreen() {
  const [, setUserData] = useAtom(userDataAtom)
  const { useContractQuery: useUserQuery, mutateData: mutateUserData, address } = useContractCache("user");
  const { useContractQuery: tournamentQuery } = useContractCache("tournament");

  /* --- Состояния --- */
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [clubId, setClubId] = useState<number|null>(null);
  const [cityId, setCityId] = useState<number|null>(null);
  const [countryId, setCountryId] = useState<number|null>(null);
  const [weaponId, setWeaponId] = useState<number>(0);
  const [nominationId, setNominationId] = useState<number>(0);
  const [pending, setPending] = useState(false);

  /* --- Запросы данных --- */
  const { data: user } = useUserQuery<{name: string, rating: number, cityId: number, countryId: number, clubId: number}>('getUser', [address]);
  const [nominations, setNominations] = useState<string[][]>([])
  const { data: ratingData } = useUserQuery<Rating>("getRating", [weaponId, nominationId, address])
  /* --- Обновление состояния --- */
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setCityId(user.cityId || null);
      setCountryId(user.countryId || null);
      setClubId(user.clubId || null);
    }
    setUserData(state=>({...state, wallet: address}))
  }, [user]);

  /* --- Обработчики действий --- */
const handleSave = async () => {
  if (!name.trim()) {
    Toast.show({ type: "error", text1: 'Введите имя' })
    return
  }
  setPending(true);
  try {
    await mutateUserData(
      'addUser',
      [name, cityId, countryId, clubId, gender],
      'getUser'
    );

    Toast.show({
      type: "success",
      text1: user?.name ? 'Сохранено!' : 'Профиль создан!'
    })
  } catch (error: any) {
    console.error('Save error:', error);
    Toast.show({
      type: "error",
      text1: 'Не удалось сохранить данные',
      text2: String(error.message)
    })
  } finally {
    setPending(false);
  }
};

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraHeight={250}
    >
      <Text style={styles.title}>Профиль бойца</Text>
      <Section title='База'>
        <Text style={styles.label}>
          Кошелёк: {address?.slice(0, 6)}…{address?.slice(-4)}
        </Text>
        <InputText
          placeholder="Имя"
          value={name}
          setValue={setName}
        />
        <GenderSwitch gender={gender} setGender={setGender} />
      </Section>

      <UniversalSelect pending={pending} setPending={setPending} id={clubId} setId={setClubId} group="club" />
      <UniversalSelect pending={pending} setPending={setPending} id={countryId} setId={setCountryId} group="country" />
      <UniversalSelect pending={pending} setPending={setPending} id={cityId} setId={setCityId} group="city" />
      {user?.name ?
        <>
              <WeaponNominationSelect
              weaponId={weaponId}
              setWeaponId={setWeaponId}
              nominationId={nominationId}
              setNominationId={setNominationId}
              setNominations={setNominations}
              />
              {ratingData && nominations.length ?
              <Section title={`Рейтинг ${nominations[weaponId][nominationId]}`}>
                <Text style={{ alignSelf: "center", fontSize: 28, color: FG, fontWeight: "bold" }}>{ratingData.rating}</Text>
              </Section>
              :
              <Loader />
              }
        </>
      :
      <></>
      }

      <Section title='Создать профиль'>
        <View style={styles.actions}>
          <Button
            title={pending ? 'Сохраняется…' : (user?.name ? 'Сохранить' : 'Создать' )}
            onPress={handleSave}
            disabled={pending}
          />
        </View>
      </Section>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 16, overflow: 'hidden', backgroundColor: BG, padding: 20 },
  title: { color: FG, fontSize: 22, fontWeight: 'bold' },
  label: { color: FG, fontWeight: '500' },
  actions: { gap: 8, marginTop: 16 },
});