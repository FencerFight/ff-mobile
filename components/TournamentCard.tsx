import { FG } from '@/constants';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TournamentCardProps {
  id: number;
  name: string;
  date: string;
  time: number;
  city: string;
  country: string;
  image?: string;
}

export default function TournamentCard({ name, date, time, country, city, image }: TournamentCardProps) {
  return (
    <View style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.meta}>{date} • {`${Math.floor(time / 60)}:${time % 60}`} • {country} • {city}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#111', borderRadius: 8, padding: 12, marginBottom: 12 },
  image: { width: '100%', height: 120, borderRadius: 6, marginBottom: 8 },
  name: { color: FG, fontFamily: 'IBMPlexSansBold', fontSize: 16 },
  meta: { color: FG + '99', fontFamily: 'IBMPlexSansRegular', fontSize: 12 },
});