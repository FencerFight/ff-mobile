import Button from '@/components/Button';
import { ACCENT, FG, PRIVATE_KEY, SURFACE } from '@/constants';
import { TOURNAMENT_ABI, TOURNAMENT_ADDRESS } from '@/constants/tournamentContract';
import { useContractCache } from '@/hooks/useContractCache';
import { walletAddressAtom } from '@/store';
import { dateToUint256, encodeBase64, imageToBase64 } from '@/utils/helpers';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { useAtomValue } from 'jotai';
import { LogIn, Plus, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker';
import Toast from 'react-native-toast-message';
import InputText from './InputText';
import Section from './Section';
import SwitchFF from './SwitchFF';
import UniversalSelect from './UniversalSelect';

interface TournamentForm {
  date: Date;
  setDateShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TournamentForm({ date, setDateShow }:TournamentForm ) {
  const { mutateData } = useContractCache(TOURNAMENT_ADDRESS, TOURNAMENT_ABI, PRIVATE_KEY)
  const [name, setName] = useState('');
  const [cityId, setCityId] = useState<number| null>(null);
  const [countryId, setCountryId] = useState<number| null>(null);
  const [desc, setDesc] = useState('');
  const [coverURL, setCoverURL] = useState('');
  const [socialLinks, setSocialLinks] = useState<string[]>(['']);
  const [nominations, setNominations] = useState<{ name: string; count: number }[]>([{ name: '', count: 8 }]);
  const [startTime, setStartTime] = useState(180)
  const [startTimeShow, setStartTimeShow] = useState(false)
  const [image, setImage] = useState<{ uri: string, width: number, height: number } | null>(null);
  const [isCoverURL, setIsCoverURL] = useState(false);
  const [pending, setPending] = useState(false);
  const walletAddress = useAtomValue(walletAddressAtom)

  const addSocial = () => setSocialLinks(prev => [...prev, '']);
  const updateSocial = (index: number, text: string) => {
    const updated = [...socialLinks];
    updated[index] = text;
    setSocialLinks(updated.filter(l => l.trim()));
  };
  const removeSocial = (index: number) => setSocialLinks(prev => prev.filter((_, i) => i !== index));

  const addNomination = () => setNominations(prev => [...prev, { name: '', count: 0 }]);
  const updateNomination = (index: number, field: keyof { name: string; count: number }, value: string | number) => {
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

    console.log(result);

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri, width: result.assets[0].width, height: result.assets[0].height });
    }
  };

  const handleCreate = async () => {
    if (!name.trim() || nominations.some(n => !n.name.trim())) return;
    const metadata = { description: desc, image: coverURL || imageToBase64(image!.uri, image!.width, image!.height) , socialLinks }
    const cid = encodeBase64(metadata);
    await mutateData("createTournament", [name, cid, cityId, countryId, dateToUint256(date), startTime, nominations.map(n=>n.name), nominations.map(n=>n.count)])
    Toast.show({
      type: "success",
      text1: "Турнир создан!"
    })
  };

  return !walletAddress ?
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
          <View key={index} style={styles.row}>
            <InputText
              placeholder="Номинация"
              value={nom.name}
              setValue={text => updateNomination(index, 'name', text)}
            />
            <InputText
              placeholder="Кол-во"
              value={nom.count.toString()}
              setValue={val => updateNomination(index, 'count', val)}
              keyboardType="numeric"
              style={styles.countInput}
            />
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
      hideHours
      visible={startTimeShow}
      setIsVisible={setStartTimeShow}
      onConfirm={({ minutes, seconds }) => {
          setStartTime(minutes * 60 + seconds);
          setStartTimeShow(false)
      }}
      modalTitle={"Время начала"}
      closeOnOverlayPress
      confirmButtonText='OK'
      buttonContainerProps={{ style: { backgroundColor: ACCENT } }}
      initialValue={{
        minutes: Math.floor(startTime / 60),
        seconds: startTime % 60,
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

      <Button title="Добавить обложку" onPress={pickImage} />
      <SwitchFF title='Ссылка на обложку' value={isCoverURL} setValue={setIsCoverURL} />
      {isCoverURL && <InputText placeholder='https://to/your/cover.png' value={coverURL} setValue={setCoverURL} />}
      {image && <Image source={{ uri: isCoverURL ? coverURL : image.uri }} style={{ width: "100%", height: 250, borderRadius: 8 }} />}
      <Button title="Создать турнир" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12, paddingBottom: 70 },
  countInput: { width: 60, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});