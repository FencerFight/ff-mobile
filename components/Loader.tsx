import { ACCENT } from "@/constants";
import { ActivityIndicator } from "react-native";

export default function Loader() {
    return <ActivityIndicator size="large" style={{ justifyContent: "center", alignSelf: "center" }} color={ACCENT} />
}