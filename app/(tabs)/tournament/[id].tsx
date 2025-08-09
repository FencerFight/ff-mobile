import Nominations from "@/components/Nominations";
import TabSwitcher from "@/components/TabSwitcher";
import TournamentPage from "@/components/TournamentPage";
import { FG } from "@/constants";
import { useContractCache } from "@/hooks/useContractCache";
import { TournamentInfo, TournamentMetadata } from "@/typings";
import { decodeBase64, getTime, uint256ToDate } from "@/utils/helpers";
import { useLocalSearchParams } from "expo-router";
import { Info, Medal, UsersRound } from "lucide-react-native";

export default function TournamentInfoScreen() {
    const tabs = [
        <Info key={0} size={20} color={FG} />,
        <UsersRound key={1} size={20} color={FG} />,
        <Medal key={2} size={20} color={FG} />,
    ]
    const { id } = useLocalSearchParams()
    const tournamentId = Number(id)
    const { useContractQuery: useTournamentQuery } = useContractCache("tournament")
    const { useContractQuery: useUserQuery } = useContractCache("user")

    const { data: cities } = useUserQuery<string[]>("getCities")
    const { data: countries } = useUserQuery<string[]>("getCountries")
    const { data } = useTournamentQuery<TournamentInfo>("getTournament", [tournamentId])
    const { data: user } = useUserQuery<string[]>("getNames", [data?.owner ? [data?.owner] : []])
    const { data: judges } = useUserQuery<string[]>("getNames", [data?.judges ? data.judges : []])
    if (data === undefined) return <></>
    else {
        if (judges === undefined) return <></>
        const metadata = decodeBase64<TournamentMetadata>(data!.metadataCID)
        return (
            <TabSwitcher tabs={tabs}>
                <TournamentPage
                  tournamentId={tournamentId}
                  owner={user![0]}
                  judges={judges!}
                  description={metadata.description}
                  socialLinks={metadata.socialLinks}
                  image={metadata.image}
                  date={uint256ToDate(data.date).toLocaleDateString()}
                  city={cities![Number(data.cityId)]}
                  country={countries![Number(data.countryId)]}
                  name={data.name}
                  startTime={getTime(data.startTime)}
                />
                <Nominations tournamentId={tournamentId} nominations={data.nominations} />
                <></>
            </TabSwitcher>
        )
    }
}