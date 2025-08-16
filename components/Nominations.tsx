import { FG } from "@/constants";
import { useContractCache } from "@/hooks/useContractCache";
import { userDataAtom } from "@/store";
import { Nomination, Pair, Rating, TournamentInfo } from "@/typings";
import { truncate } from "@/utils/helpers";
import I18n from '@utils/i18n';
import { ethers } from "ethers";
import { useAtomValue } from "jotai";
import { UserRoundMinus, UserRoundPlus, UsersRound } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { KeyedMutator } from "swr";
import Button from "./Button";
import ConfirmationDialog from "./ConfirmationDialog";
import DataTable from "./DataTable";
import Section from "./Section";

interface NominationsProps {
    nominations:Nomination[];
    tournamentId: number;
    owner: string;
    date: Date;
    refreshCallback: KeyedMutator<TournamentInfo>;
}

export default function Nominations({ nominations, tournamentId, refreshCallback, owner, date }:NominationsProps) {
    const { useContractQuery: useTournamentQuery, mutateData } = useContractCache("tournament")
    const { useContractQuery: useUserQuery, mutateData: mutateUser } = useContractCache("user")
    const userData = useAtomValue(userDataAtom)
    const [indexName, setIndexName] = useState(0)
    const [deleteParticipantData, setDeleteParticipantData] = useState({ address: '', nomId: -1 })
    const [isDeleteParticipantVisible, setIsDeleteParticipantVisible] = useState(false);
    const { data: names } = useUserQuery<string[]>("getNames", [nominations[indexName].participants])
    const getNameByAddress = (address: string) => names![nominations[indexName].participants.findIndex(participant=>participant === address)]
    const { data: ratingData } = useUserQuery<Rating>("getRating", [nominations[indexName].weaponId, nominations[indexName].nameId, userData.wallet])
    const { data: nominationsNames } = useTournamentQuery<string[][]>("getNominations", [nominations.map(n=>Number(n.weaponId))])

    const register = async (nominationId: number, weaponId: number, ) => {
        try {
            await mutateData("registerParticipant", [nominationId, tournamentId], "getTournament")
            Toast.show({
                type: "success",
                text1: "Вы зарегистрированы!"
            })

            if (!ratingData?.rating) {
                await mutateUser("addWeaponRating", [weaponId, nominationId])
            }
            await refreshCallback()
        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: String(e.message)
            })
        }
    }

    const removeParticipant = async (address: string, nominationId: number) => {
        try {
            await mutateData("removeParticipant", [address, nominationId, tournamentId])
            Toast.show({
                type: "success",
                text1: "Участник удалён!"
            })
            await refreshCallback()
        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: String(e.message)
            })
        }
    }

    const headers = [I18n.t('name'), I18n.t('win'), I18n.t('win'), I18n.t('name')];
    const getDataTable = (pairs: Pair[]) => pairs.map(pair => [truncate(getNameByAddress(pair.fighter1)), pair.wins1.toString(), pair.wins2.toString(), truncate(getNameByAddress(pair.fighter2))])


    const getParticipants = async (idx: number) => {
        setIndexName(idx)
    }
    const isWinners = (winners: string[]) => !!winners.filter(winner=>winner !== ethers.ZeroAddress).length
    if (nominationsNames === undefined) return <></>

    return (
        <ScrollView>
            {nominations.map((nom, idx)=>
            <Section key={idx} title={nominationsNames![Number(nom.weaponId)][Number(nom.nameId)]}>
                <Text style={styles.row}>
                    <Text style={styles.label}>Участники: </Text>{" "}
                    {Number(nom.participants.length)} / {Number(nom.max)}
                </Text>
                {indexName === idx && names?.length && names.map((n, i)=>
                    <View key={i} style={styles.people}>
                        <Text style={styles.label}>{n}</Text>
                        {userData.wallet === owner && !isWinners(nom.winners) ?
                        <Button onPress={()=>{ setDeleteParticipantData({ address: nom.participants[i], nomId: idx }); setIsDeleteParticipantVisible(true) }} style={{ minWidth: 50 }}>
                            <UserRoundMinus color={FG} size={20} />
                        </Button>
                        :
                        <></>
                        }
                    </View>
                )}
                <Button style={{ marginTop: 8, width: "100%"}} onPress={()=>getParticipants(idx)}>
                    <UsersRound color={FG} size={28} />
                </Button>
                {Number(nom.gender) === userData.gender || !isWinners(nom.winners) || date < new Date() ?
                <Button style={{ marginTop: 8, width: "100%"}} onPress={()=>{ if (nominations[idx].participants.includes(userData.wallet)) { setDeleteParticipantData({ address: userData.wallet, nomId: idx }); setIsDeleteParticipantVisible(true) } else { setIndexName(idx); register(idx, Number(nom.weaponId)) } }}>
                    {nominations[idx].participants.includes(userData.wallet) ?
                    <UserRoundMinus color={FG} size={28} />
                    :
                    <UserRoundPlus color={FG} size={28} />
                    }
                </Button>
                :
                <></>
                }
                {isWinners(nom.winners) ?
                <DataTable headers={headers} data={getDataTable(nom.pairs)} scrollEnabled={false} />
                :
                <></>
                }
            </Section>
            )}
            <ConfirmationDialog
            visible={isDeleteParticipantVisible}
            message="Удалить с турнира?"
            onConfirm={()=>{ removeParticipant(deleteParticipantData.address, deleteParticipantData.nomId) }}
            setVisible={setIsDeleteParticipantVisible}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  row: { color: FG, fontSize: 14 },
  label: { fontWeight: "600", color: FG },
  people: { justifyContent: "space-between", flexDirection: "row", alignItems: "center" }
});