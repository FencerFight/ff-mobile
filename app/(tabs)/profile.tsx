import Button from '@/components/Button';
import { GenderSwitch } from '@/components/GenderSwitch';
import InputText from '@/components/InputText';
import Section from '@/components/Section';
import UniversalSelect from '@/components/UniversalSelect';
import { FG, PRIVATE_KEY } from '@/constants';
import { USER_ABI, USER_ADDRESS } from '@/constants/userContract';
import { useContractCache } from '@/hooks/useContractCache';
import { Gender, walletAddressAtom } from '@/store';
import { useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function ProfileScreen() {
  const { useContractQuery: useUserQuery, mutateData: mutateUserData, address } = useContractCache(USER_ADDRESS, USER_ABI, PRIVATE_KEY);

  /* --- Состояния --- */
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [clubId, setClubId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const setWalletAddress = useSetAtom(walletAddressAtom)

  /* --- Запросы данных --- */
  const { data: userData } = useUserQuery<{name: string, rating: number, cityId: number, countryId: number, clubId: number}>('getUser', [address]);

  /* --- Обновление состояния --- */
  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setCityId(userData.cityId || 0);
      setCountryId(userData.countryId || 0);
      setClubId(userData.clubId || 0);
    }
    setWalletAddress(address)
  }, [userData]);

  /* --- Обработчики действий --- */
const handleSave = async () => {
  if (!name.trim()) return Alert.alert('Введите имя');
  setPending(true);
  try {
    await mutateUserData(
      'addUser',
      [name, cityId, countryId],
      'getUser'
    );

    Alert.alert('Сохранено!');
  } catch (error) {
    console.error('Save error:', error);
    Alert.alert('Ошибка', 'Не удалось сохранить данные');
  } finally {
    setPending(false);
  }
};

  /* --- Рендер --- */
  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <Section title='Создать профиль'>
        <View style={styles.actions}>
          <Button
            title={pending ? 'Сохраняется…' : 'Сохранить'}
            onPress={handleSave}
            disabled={pending}
          />
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  title: { color: FG, fontSize: 22, fontWeight: 'bold' },
  label: { color: FG, fontWeight: '500' },
  actions: { gap: 8, marginTop: 16 },
});