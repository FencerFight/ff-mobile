import Button from '@/components/Button';
import { ACCENT, FG, SURFACE } from '@/constants';
import { useContractCache } from '@/hooks/useContractCache';
import { Gender, userDataAtom } from '@/store';
import { TournamentMetadata } from '@/typings';
import { dateToUint256, encodeBase64 } from '@/utils/helpers';
import { ethers } from 'ethers';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { useAtomValue } from 'jotai';
import { LogIn, Plus, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker';
import Toast from 'react-native-toast-message';
import { GenderSwitch } from './GenderSwitch';
import HorizontalSelect from './HorizontalSelect';
import InputText from './InputText';
import Section from './Section';
import UniversalSelect from './UniversalSelect';

interface TournamentForm {
  date: Date;
  setDateShow: React.Dispatch<React.SetStateAction<boolean>>;
  refreshCallback: ()=>Promise<any>
}

export default function TournamentForm({ date, setDateShow, refreshCallback }:TournamentForm ) {
  const { mutateData } = useContractCache("tournament")
  const { useContractQuery } = useContractCache("user")
  const { data: weaponTypes = [] } =  useContractQuery<string[]>("getWeaponTypes")
  const [name, setName] = useState('');
  const [cityId, setCityId] = useState<number| null>(null);
  const [countryId, setCountryId] = useState<number| null>(null);
  const [desc, setDesc] = useState('');
  const [coverURL, setCoverURL] = useState('');
  const [socialLinks, setSocialLinks] = useState<string[]>(['']);
  type Nomination = { name: string; count: number, weaponId: number, gender: Gender }
  const [nominations, setNominations] = useState<Nomination[]>([{ name: '', count: 8, weaponId: -1, gender: Gender.Male }]);
  const [startTime, setStartTime] = useState(180)
  const [startTimeShow, setStartTimeShow] = useState(false)
  const [image, setImage] = useState<{ uri: string, width: number, height: number } | null>(null);
  const [pending, setPending] = useState(false);
  const userData = useAtomValue(userDataAtom)
  const addSocial = () => setSocialLinks(prev => [...prev, '']);
  const updateSocial = (index: number, text: string) => {
    const updated = [...socialLinks];
    updated[index] = text;
    setSocialLinks(updated.filter(l => l.trim()));
  };
  const removeSocial = (index: number) => setSocialLinks(prev => prev.filter((_, i) => i !== index));

  const addNomination = () => setNominations(prev => [...prev, { name: '', count: 0, weaponId: -1, gender: Gender.Male }]);
  const updateNomination = (index: number, field: keyof Nomination, value: string | number | Gender) => {
    const updated = [...nominations];
    updated[index] = { ...updated[index], [field]: value };
    setNominations(updated);
  };
  const removeNomination = (index: number) => setNominations(prev => prev.filter((_, i) => i !== index));
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri, width: result.assets[0].width, height: result.assets[0].height });
    }
  };

const handleCreate = async () => {
  // 1. Базовые поля
  if (!name.trim()) {
    Toast.show({ type: 'error', text1: 'Укажите название турнира' });
    return;
  }
  if (!desc.trim()) {
    Toast.show({ type: 'error', text1: 'Добавьте описание' });
    return;
  }
  if (cityId === null) {
    Toast.show({ type: 'error', text1: 'Выберите город' });
    return;
  }
  if (countryId === null) {
    Toast.show({ type: 'error', text1: 'Выберите страну' });
    return;
  }

  // 2. Обложка
  if (!coverURL.trim()) {
    Toast.show({ type: 'error', text1: 'Укажите ссылку на обложку' });
    return;
  }
  // простая проверка валидности URL
  if (!/^https?:\/\//.test(coverURL)) {
    Toast.show({ type: 'error', text1: 'Ссылка должна начинаться с http/https' });
    return;
  }

  // 3. Номинации
  if (nominations.length === 0) {
    Toast.show({ type: 'error', text1: 'Добавьте хотя бы одну номинацию' });
    return;
  }
  for (let i = 0; i < nominations.length; i++) {
    const n = nominations[i];
    if (!n.name.trim()) {
      Toast.show({ type: 'error', text1: `Номинация ${i + 1} без названия` });
      return;
    }
    if (n.count <= 0) {
      Toast.show({ type: 'error', text1: `В номинации ${i + 1} задайте количество участников > 0` });
      return;
    }
    if (n.weaponId < 0) {
      Toast.show({ type: 'error', text1: `В номинации ${i + 1} выберите оружие` });
      return;
    }
  }

  // 4. Соцсети (опционально валидировать при наличии)
  const validSocial = socialLinks.filter(l => l.trim());
  for (const link of validSocial) {
    if (!/^https?:\/\//.test(link)) {
      Toast.show({ type: 'error', text1: 'Соцсеть должна быть ссылкой' });
      return;
    }
  }

  // 5. Готовы к транзакции
  setPending(true);
  try {
    const metadata = {
      description: desc,
      image: coverURL,
      socialLinks: validSocial,
    } as TournamentMetadata;
    const cid = encodeBase64(metadata);
    const abiCoder = new ethers.AbiCoder();

    await mutateData('createTournament', [
      name.trim(),
      cid,
      cityId,
      countryId,
      dateToUint256(date),
      startTime,
      abiCoder.encode(
        ["tuple(string,uint256,uint256,uint256,uint8)[]"],
        [nominations.map(nom=>[nom.name, nom.count, 0, nom.weaponId, nom.gender])]
      )
    ]);

    Toast.show({ type: 'success', text1: 'Турнир создан!' });
    await refreshCallback()
  } catch (e: any) {
    Toast.show({ type: 'error', text1: e?.message || 'Ошибка транзакции' });
    console.log(e?.message)
  } finally {
    setPending(false);
  }
};

  return !userData.wallet ?
  (
    <View style={styles.container}>
      <Link href="/(tabs)/profile" asChild>
      <Button>
        <LogIn size={20} color={FG} />
      </Button>
      </Link>
    </View>
  )
  :
  (
    <View style={styles.container}>
      <InputText placeholder="Название" value={name} setValue={setName} />
      <InputText placeholder="Описание" value={desc} setValue={setDesc} multiline />
      <Section title='Соцсети'>
        {socialLinks.map((link, idx) => (
          <View key={idx} style={styles.row}>
            <InputText
              placeholder="Ссылка"
              value={link}
              setValue={text => updateSocial(idx, text)}
            />
            {idx !== 0 && <Button onPress={() => removeSocial(idx)}><Trash2 size={18} color={FG} /></Button>}
          </View>
        ))}
        <Button onPress={addSocial}><Plus size={18} color={FG} /></Button>
      </Section>

      <Section title='Номинации'>
        {nominations.map((nom, index) => (
          <View key={index} style={styles.col}>
            <InputText
              placeholder="Номинация"
              value={nom.name}
              setValue={text => updateNomination(index, 'name', text)}
              style={{ width: "100%" }}
            />
            <InputText
              placeholder="Кол-во"
              value={nom.count.toString()}
              setValue={val => updateNomination(index, 'count', val)}
              keyboardType="numeric"
              style={styles.countInput}
            />
            <HorizontalSelect id={nom.weaponId} setId={(idx)=>updateNomination(index, "weaponId", idx)} items={weaponTypes} />
            <GenderSwitch gender={nom.gender} setGender={(g: Gender)=>updateNomination(index, "gender", g)} />
            <Button onPress={() => removeNomination(index)}>
              <Trash2 size={20} color={FG} />
            </Button>
          </View>
        ))}
        <Button onPress={addNomination}>
          <Plus size={20} color={FG} />
        </Button>
      </Section>

      <Button title='Выбрать дату' onPress={()=>setDateShow(true)} />
      <Button title='Выбрать время' onPress={()=>setStartTimeShow(true)} />
      <TimerPickerModal
      hideSeconds
      visible={startTimeShow}
      setIsVisible={setStartTimeShow}
      onConfirm={({ hours , minutes }) => {
          setStartTime(hours * 3600 + minutes * 60);
          setStartTimeShow(false)
      }}
      modalTitle={"Время начала"}
      closeOnOverlayPress
      confirmButtonText='OK'
      buttonContainerProps={{ style: { backgroundColor: ACCENT } }}
      initialValue={{
        minutes: Math.floor((startTime % 3600) / 60),
        hours: Math.floor(startTime / 3600)
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

      <UniversalSelect pending={pending} setPending={setPending} id={countryId} setId={setCountryId} group="country" />
      <UniversalSelect pending={pending} setPending={setPending} id={cityId} setId={setCityId} group="city" />

      <Section title='Обложка'>
        <InputText placeholder='https://to/your/cover.png' value={coverURL} setValue={setCoverURL} />
      </Section>
      {coverURL && <Image source={{ uri: coverURL }} style={{ width: "100%", height: 250, borderRadius: 8 }} />}
      <Button title="Создать турнир" onPress={handleCreate} disabled={pending} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  countInput: { width: 60, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  col: { flexDirection: 'column', alignItems: 'center', gap: 8 },
});