import { FG } from '@/constants';
import { TournamentMetadata } from '@/typings';
import { decodeBase64, getTime, uint256ToDate } from '@/utils/helpers';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface TournamentCardProps {
  id: number;
  name: string;
  date: bigint;
  city: string;
  country: string;
  metadataCID: string;
}

export default function TournamentCard({ id, name, date, country, city, metadataCID }: TournamentCardProps) {
  const metadata = decodeBase64<TournamentMetadata>(metadataCID)
  const dateStr = uint256ToDate(date).toLocaleDateString()
  const time = getTime(metadata.startTime)

  return (
    <Link href={{ pathname: "/(tabs)/tournament/[id]", params: { id } }} asChild>
      <Pressable style={styles.card}>
        {metadata.image && <Image source={{ uri: metadata.image }} style={styles.image} />}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>{dateStr} • {time} • {country} • {city}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#111', borderRadius: 8, padding: 12, marginBottom: 12 },
  image: { width: '100%', height: 250, borderRadius: 6, marginBottom: 8 },
  name: { color: FG, fontFamily: 'IBMPlexSansBold', fontSize: 16 },
  meta: { color: FG + '99', fontFamily: 'IBMPlexSansRegular', fontSize: 12 },
});