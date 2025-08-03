import { FG, PLACEHOLDER, SURFACE_2 } from "@/constants";
import { useState } from "react";
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";
interface InputTextProps {
    setValue?: ((text: string) => void) | undefined;
    value?: string | undefined;
    placeholder?: string | undefined;
    style?: StyleProp<TextStyle>;
    keyboardType?: KeyboardTypeOptions | undefined;
    multiline?: boolean | undefined
}

export default function InputText({ setValue, value, placeholder, style, keyboardType, multiline }:InputTextProps) {
    const [height, setHeight] = useState(40);
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={PLACEHOLDER}
            value={value}
            onChangeText={setValue}
            style={[styles.input, style, { height: Math.max(40, height) }]}
            keyboardType={keyboardType}
            multiline={multiline}
            onContentSizeChange={e =>
                setHeight(e.nativeEvent.contentSize.height)
            }
        />
    )
}

const styles = StyleSheet.create({
    input: { backgroundColor: SURFACE_2, color: FG, borderRadius: 8, padding: 12, fontFamily: 'IBMPlexSansRegular', flex: 1 },
})