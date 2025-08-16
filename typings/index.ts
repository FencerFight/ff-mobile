import { Gender } from "@/store";

export type TournamentMetadata = {
    description: string;
    image: string;
    socialLinks: string[]
    startTime: bigint;
}

export type TournamentCreatedEvent = {
  name: string;
  metadataCID: string;
  cityId: bigint;
  countryId: bigint;
  date: bigint;
  tournamentId: number;
};

export type Tournament = Omit<TournamentMetadata, "startTime"> & Omit<TournamentCreatedEvent, "cityId"|"countryId"|"metadataCID"|"date"> & {
  city: string;
  country: string;
  date: string;
  startTime: string
}

export type Rating = {
  rating: bigint,
  rd: bigint,
  vol: bigint
}

export type Pair = {
  fighter1: string;
  wins1: bigint;
  fighter2: string;
  wins2: bigint;
}

export type Nomination = {
  nameId: bigint;
  max: bigint;
  participants: string[];
  winners: string[];
  pairs: Pair[];
  badgeURI: string;
  weaponId: bigint;
  gender: bigint;
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

export enum ProposalType {
  ADD_ADMIN,
  REMOVE_ADMIN,
  ADD_WEAPON,
  REMOVE_WEAPON,
  ADD_NOMINATION,
  REMOVE_NOMINATION
}

// Базовое предложение
export type BaseProposal = {
  pType: ProposalType;
  proponent: string;
  votesYes: bigint;
  votesNo: bigint;
  deadline: bigint;
  executed: boolean;
}

export type ProposalAdmin = {
  candidate: string;
  base: BaseProposal;
}

export type ProposalAddType = {
  title: string;
  weaponTypeId: number;
  nominationId: number;
  base: BaseProposal;
}