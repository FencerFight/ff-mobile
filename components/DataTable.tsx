import { ACCENT, FG, PLACEHOLDER, SURFACE } from '@/constants';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface DataTableProps {
  data: string[][]; // [col1, col2, col3, col4]
  headers?: string[];
  scrollEnabled?: boolean
}

export default function DataTable({ data, headers, scrollEnabled = true }: DataTableProps) {
  const renderRow = ({ item }: { item: string[] }) => (
    <View style={styles.row}>
      {item.map((cell, i) => (
        <View key={i} style={[styles.cell, { flex: 1 }]}>
          {cell.split("\n")[0] === cell ?
          <Text style={styles.text}>{cell}</Text>
          :
          <>
          <Text style={styles.text}>{cell.split("\n")[0]}</Text>
          <Text style={[styles.text, styles.hint]}>{cell.split("\n")[1]}</Text>
          </>
          }
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {headers && (
        <View style={[styles.row, styles.header]}>
          {headers.map((h, i) => (
            <View key={i} style={[styles.cell, { flex: 1 }]}>
              <Text style={[styles.text, styles.headerText]}>{h}</Text>
            </View>
          ))}
        </View>
      )}
      <FlatList
        data={data}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderRow}
        scrollEnabled={scrollEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: SURFACE, borderRadius: 8, overflow: 'hidden', flex: 1 },
  row: { flexDirection: 'row', borderBottomWidth: 0.5, borderColor: FG + '33' },
  header: { backgroundColor: FG + '11' },
  cell: { paddingVertical: 12, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center' },
  text: { color: FG, fontFamily: 'IBMPlexSansRegular', fontSize: 14 },
  headerText: { fontFamily: 'IBMPlexSansBold', color: ACCENT },
  hint: { color: PLACEHOLDER, fontSize: 12 }
});