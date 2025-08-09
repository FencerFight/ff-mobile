// components/ui/Section.tsx
import { FG, SURFACE } from '@/constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  row?: boolean
}

export default function Section({ title, children, row }: SectionProps) {
  return (
  <View style={styles.section}>
    {title && <Text style={styles.title}>{title}</Text>}
    <View style={{ gap: 8, flexDirection: row ? "row" : "column", flexWrap: row ? "wrap" : "nowrap" }}>
      {children}
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
  section: { backgroundColor: SURFACE, borderRadius: 16, padding: 16, marginBottom: 15, gap: 8 },
  title:   { color: FG, fontSize: 18, marginBottom: 12, fontFamily: "IBMPlexSansBold" },
});