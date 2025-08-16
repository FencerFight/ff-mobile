import { useContractCache } from "@/hooks/useContractCache";
import { useState } from "react";
import Toast from "react-native-toast-message";
import Button from "./Button";
import HorizontalSelect from "./HorizontalSelect";
import InputText from "./InputText";
import Section from "./Section";

interface CountrySelectProps {
    setId: React.Dispatch<React.SetStateAction<number | null>>;
    id: number | null;
    pending: boolean;
    setPending: React.Dispatch<React.SetStateAction<boolean>>;
    group: "country" | "city" | "club"
}

export default function UniversalSelect({ setId, id, pending, setPending, group }:CountrySelectProps) {
    const { useContractQuery, mutateData } = useContractCache("user")

    const keyData = {
        "country": {
            getter: "getCountries",
            setter: "addCountry",
            message: "Введите название страны",
            title: "Страна",
            create: "Добавить страну",
            placeholder: "Название страны"
        },
        "city": {
            getter: "getCities",
            setter: "addCity",
            message: "Введите название города",
            title: "Город",
            create: "Добавить город",
            placeholder: "Название города"
        },
        "club": {
            getter: "getClubs",
            setter: "addClub",
            message: "Введите название клуба",
            title: "Клуб",
            create: "Добавить клуб",
            placeholder: "Название клуба"
        }
    }
    const { data: items = [], mutate: mutateItems } = useContractQuery<string[]>(keyData[group].getter);

    const [newName, setNewName] = useState('');

  const handleCreateCountry = async () => {
    if (!newName.trim()) {
        Toast.show({
            type: "error",
            text1: keyData[group].message
        })
        return
    }
    setPending(true);
    try {
      // Оптимистичное обновление
      const newItems = [...items, newName];
      mutateItems(newItems, false);

      await mutateData(keyData[group].setter, [newName], keyData[group].getter);
      setNewName('');

      // Финальное подтверждение
      await mutateItems();
    } catch (error) {
      // Откат при ошибке
      await mutateItems();
      Toast.show({
        type: "error",
        text1: "Create error",
        text2: String(error)
      })
    } finally {
      setPending(false);
    }
  };
    return (
        <Section title={keyData[group].title}>
            <HorizontalSelect id={id} setId={setId} items={items} />
            <InputText
                placeholder={keyData[group].placeholder}
                value={newName}
                setValue={setNewName}
            />
            <Button
                title={keyData[group].create}
                onPress={handleCreateCountry}
                disabled={pending || !newName.trim()}
            />
        </Section>
    )
}