import { ACCENT } from "@/constants";
import { ScrollView } from "react-native";
import Button from "./Button";

interface HorizontalSelectProps {
    setId: (idx: number)=>void;
    id: number | null;
    items: string[]
}

export default function HorizontalSelect({ id, setId, items }:HorizontalSelectProps) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {items.map((c, idx) => (
            <Button
                key={idx}
                title={c}
                onPress={() => setId(idx)}
                style={[id === idx && { backgroundColor: ACCENT }, idx !== 0 && { marginLeft: 12 }]}
                stroke={idx !== id}
            />
            ))}
        </ScrollView>
    )
}