import { ACCENT, FG } from "@/constants";
import { StyleSheet, Switch, Text, View } from "react-native";

interface SwitchFFProps {
    title: string;
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SwitchFF({ title, value, setValue }:SwitchFFProps) {
    return (
        <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{title}</Text>
            <Switch
            value={value}
            onValueChange={setValue}
            trackColor={{ false: '#767577', true: ACCENT }}
            thumbColor={value ? FG : '#f4f3f4'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    switchRow: { flexDirection: 'row', alignItems: 'center' },
    switchLabel: { color: FG, flex: 1, fontFamily: "IBMPlexSansRegular", marginTop: -5 },
})