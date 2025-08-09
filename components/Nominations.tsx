import { FG } from "@/constants";
import { useContractCache } from "@/hooks/useContractCache";
import { Nomination } from "@/typings";
import { UserRoundPlus, UsersRound } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import Button from "./Button";
import Section from "./Section";

export default function Nominations({ nominations, tournamentId }:{ nominations:Nomination[], tournamentId: number }) {
    const { useContractQuery: useTournamentQuery, mutateData } = useContractCache("tournament")
    const { useContractQuery: useUserQuery } = useContractCache("user")
    const [indexName, setIndexName] = useState(0)
    const { data: names } = useUserQuery<string[]>("getNames", [nominations[indexName].participants], { shouldFetch: false })
    const { data: nominationsNames } = useTournamentQuery<string[][]>("getNominations", [nominations.map(n=>Number(n.weaponId))])

    const register = async (nominationId: number) => {
        try {
            await mutateData("registerParticipant", [nominationId, tournamentId], "getTournament")
            Toast.show({
                type: "success",
                text1: "Вы зарегистрированы!"
            })
        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: String(e.message)
            })
        }
    }

    const getParticipants = async (idx: number) => {
        setIndexName(idx)
        // await mutateUsers("getNames", [nominations[idx].participants], "getNames")
    }

    if (nominationsNames === undefined) return <></>

    return (
        <ScrollView>
            {nominations.map((nom, idx)=>
            <Section key={idx} title={nominationsNames![Number(nom.weaponId)][Number(nom.nameId)]}>
                <Text style={styles.row}>
                    <Text style={styles.label}>Участники: </Text>{" "}
                    {Number(nom.participants.length)} / {Number(nom.max)}
                </Text>
                {indexName === idx && names?.length && names.map((n, idx)=>
                    <Text key={idx} style={styles.label}>{n}</Text>
                )}
                <Button style={{ marginTop: 8, width: "100%"}} onPress={()=>getParticipants(idx)}>
                    <UsersRound color={FG} size={28} />
                </Button>
                <Button style={{ marginTop: 8, width: "100%"}} onPress={()=>register(idx)}>
                    <UserRoundPlus color={FG} size={28} />
                </Button>
            </Section>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  row: { color: FG, fontSize: 14 },
  label: { fontWeight: "600", color: FG },
});