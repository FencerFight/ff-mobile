// components/TabSwitcher.tsx
import { ACCENT, BG, FG } from '@/constants'; // импортируйте свои цвета
import React, { Children, ReactNode, useState } from 'react';
import { ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

type TabSwitcherProps = {
  tabs: string[]|ReactNode[];
  children: ReactNode[];
  containerStyle?: StyleProp<ViewStyle>;
};

export default function TabSwitcher({ tabs, children, containerStyle }: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.tabBar}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setActiveTab(idx)}
            style={[styles.tab, activeTab === idx && styles.activeTab]}
          >
            {typeof tab === "string" ? <Text style={styles.tabText}>{tab}</Text> : tab}
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.content}>
        {Children.toArray(children)[activeTab]}
      </ScrollView>
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
  },
});