import { ACCENT } from "@/constants";
import { useContractCache } from "@/hooks/useContractCache";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import HorizontalSelect from "./HorizontalSelect";
import Section from "./Section";

interface WeaponNominationSelectProps {
    weaponId: number,
    setWeaponId: React.Dispatch<React.SetStateAction<number>>,
    nominationId: number,
    setNominationId: React.Dispatch<React.SetStateAction<number>>
    isNomination?: boolean,
    setNominations?: React.Dispatch<React.SetStateAction<string[][]>>
}

export default function WeaponNominationSelect({ weaponId, setWeaponId, setNominationId, nominationId, setNominations, isNomination = true }:WeaponNominationSelectProps) {
    const { useContractQuery: tournamentQuery } = useContractCache("tournament");
    const { data: weapons } = tournamentQuery<string[]>("getWeaponTypes")
    const { data: nominations } = tournamentQuery<string[][]>("getNominations", [weapons?.map((_, idx)=>idx)])
    useEffect(()=>{
        if (setNominations && nominations) setNominations(nominations)
    }, [])
    return (
    <Section>
        <View>
            <Text style={styles.pickerLabel}>Weapon</Text>
            {weapons ?
            <HorizontalSelect id={weaponId} setId={(idx)=>{setWeaponId(idx); setNominationId(0)}} items={weapons} />
            :
            <></>
            }
        </View>
        {isNomination ?
        <View>
            <Text style={styles.pickerLabel}>Nomination</Text>
            {nominations ?
            <HorizontalSelect id={nominationId} setId={setNominationId} items={nominations[weaponId]} />
            :
            <></>
            }
        </View>
        :
        <></>
        }
    </Section>
    )
}

const styles = StyleSheet.create({
    pickerLabel: {
        fontSize: 14,
        marginBottom: 8,
        fontFamily: 'IBMPlexSansBold',
        color: ACCENT,
    },
})