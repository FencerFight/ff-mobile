// components/TabSwitcher.tsx
import { ACCENT, BG, FG } from '@/constants'; // импортируйте свои цвета
import React, { Children, ReactNode, useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type TabSwitcherProps = {
  tabs: string[]|React.JSX.Element[];
  children: ReactNode[];
  containerStyle?: StyleProp<ViewStyle>;
  onPresses?: (()=>void)[]
};

export default function TabSwitcher({ tabs, children, containerStyle, onPresses }: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.tabBar}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => { setActiveTab(idx); if (onPresses && onPresses[idx]) onPresses[idx]() }}
            style={[styles.tab, activeTab === idx && styles.activeTab]}
          >
            {typeof tab === "string" ? <Text style={styles.tabText}>{tab}</Text> : tab}
          </TouchableOpacity>
        ))}
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        enableOnAndroid
        extraHeight={250}
      >
        {Children.toArray(children)[activeTab]}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: BG,
    marginTop: 50
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: ACCENT,
  },
  tabText: {
    color: FG,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    paddingBottom: 50,
    flexGrow: 1
  },
});