// app/(tabs)/tournament/[id].tsx
import Button from '@/components/Button';
import { ACCENT, FG } from '@/constants';
import { Tournament } from '@/typings';
import { copyText, iconFromLink } from '@/utils/helpers';
import { Image } from "expo-image";
import { Calendar, Clock, Crown, Gavel, MapPin, Share2 } from 'lucide-react-native';
import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Section from './Section';

export default function TournamentPage({
    description,
    socialLinks,
    image,
    date,
    startTime,
    city,
    country,
    name,
    owner,
    judges
}:Tournament & { owner: string; judges: string[] }) {


  const handleShare = async () => {

  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.title}>{name}</Text>

      <View style={styles.locationRow}>
        <View style={styles.infoWrap}>
          <MapPin size={15} color={FG} style={styles.iconTop} />
          <Text style={styles.info}>
            {city}, {country}
          </Text>
        </View>
        <View style={styles.infoWrap}>
          <Calendar size={15} color={FG} style={styles.iconTop} />
          <Text style={styles.info}>
            {date}
          </Text>
        </View>
        <View style={styles.infoWrap}>
          <Clock size={15} color={FG} style={styles.iconTop} />
          <Text style={styles.info}>
            {startTime}
          </Text>
        </View>
      </View>

      <Section title='Организаторы' row>
        <View style={styles.infoWrap}>
          <Crown size={15} color={FG} style={styles.iconTop} />
          <Text style={styles.info}>
            {owner}
          </Text>
        </View>
        {judges.length && judges.map((j, i)=>
          <View style={styles.infoWrap} key={i}>
            <Gavel size={15} color={FG} style={styles.iconTop} />
            <Text style={styles.info}>
              {j}
            </Text>
          </View>
        )}
      </Section>

      <Section title='Описание'>
        <Text style={styles.description}>{description}</Text>
      </Section>

      {socialLinks.length > 0 && (
        <Section title='Контакты' row>
          {socialLinks.map((link, i) => (
            <Pressable key={i} onPress={()=>Linking.openURL(link)} onLongPress={()=>copyText(link)} style={{ alignSelf: "center" }}>
              {iconFromLink(link) ? <Image source={iconFromLink(link)} style={{ width: 30, height: 30 }} /> : <Text style={styles.link}>{link}</Text>}
            </Pressable>
          ))}
        </Section>
      )}

      <Button onPress={handleShare} style={{ flex: 1 }}>
        <Share2 color={FG} size={28} />
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 0, gap: 10 },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: FG, marginBottom: 4 },
  locationRow: { marginBottom: 8, flexDirection: "row", gap: 10, flexWrap: "wrap" },
  infoWrap: { flexDirection: "row", gap: 5 },
  description: { fontSize: 14, color: FG, marginBottom: 12, lineHeight: 20 },
  info: { fontSize: 14, color: FG, marginTop: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: FG,
    marginTop: 12,
  },
  link: { fontSize: 14, color: ACCENT, marginBottom: 2 },
  iconTop: { marginTop: 5 }
});