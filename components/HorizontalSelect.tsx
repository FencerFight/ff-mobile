import { ACCENT } from "@/constants";
import { ScrollView } from "react-native";
import Button from "./Button";

interface HorizontalSelectProps {
    setId: (idx: number)=>void;
    id: number | string | null;
    items: string[],
    ids?: number[]|bigint[]|string[]
}

export default function HorizontalSelect({ id, setId, items, ids }:HorizontalSelectProps) {
    const onPress = (idx: number) => {
        if (ids)
            setId(Number(ids[idx]))
        else
            setId(idx)
    }
    const getIndex = (idx: number) => {
        if (ids)
            return Number(ids[idx])
        else
            return idx
    }
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {items.map((c, idx) => (
            <Button
                key={idx}
                title={c}
                onPress={() => onPress(idx)}
                style={[id === getIndex(idx) && { backgroundColor: ACCENT }, idx !== 0 && { marginLeft: 12 }, { paddingHorizontal: 10 }]}
                stroke={idx !== id}
            />
            ))}
        </ScrollView>
    )
}