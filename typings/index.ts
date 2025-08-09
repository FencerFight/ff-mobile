import { Gender } from "@/store";

export type TournamentMetadata = {
    description: string;
    image: string;
    socialLinks: string[]
}

export type TournamentCreatedEvent = {
  name: string;
  metadataCID: string;
  cityId: bigint;
  countryId: bigint;
  date: bigint;
  startTime: bigint;
  tournamentId: number;
};

export type Tournament = TournamentMetadata & Omit<TournamentCreatedEvent, "cityId"|"countryId"|"metadataCID"|"date"|"startTime"> & {
  city: string;
  country: string;
  date: string;
  startTime: string
}

export type Nomination = {
  nameId: number;
  max: number;
  participants: string[];
  weaponId: number;
  gender: number;
};

export type TournamentInfo = Omit<TournamentCreatedEvent, "tournamentId"> & {
  owner: string;
  nominations: Nomination[];
  judges: string[]
};

export type User = {
  name: string;
  gender: Gender;
  cityId: bigint;
  countryId: bigint;
  clubId: bigint;
}