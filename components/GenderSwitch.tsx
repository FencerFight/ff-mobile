import { ACCENT, FG } from "@/constants";
import { Gender } from "@/store";
import { Mars, Venus } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface GenderSwitch {
    gender: Gender;
    setGender: (React.Dispatch<React.SetStateAction<Gender>>)|((g: Gender)=>void)
}

export function GenderSwitch({ gender, setGender }:GenderSwitch) {
    return (
        <View style={styles.genderRow}>
            <TouchableOpacity onPress={() => setGender(Gender.MALE)} style={[styles.genderBtn, gender === Gender.MALE && styles.genderActive]}>
                <Mars size={28} color={FG} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender(Gender.FEMALE)} style={[styles.genderBtn, gender === Gender.FEMALE && styles.genderActive]}>
                <Venus size={28} color={FG} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  genderRow: { flexDirection: 'row', marginVertical: 8, justifyContent: 'center', alignItems: "center" },
  genderBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginRight: 8 },
  genderActive: { backgroundColor: ACCENT },
})