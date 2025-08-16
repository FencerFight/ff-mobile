import { ACHIEVEMENT_ABI, ACHIEVEMENT_ADDRESS } from "./achievementContract";
import { GOVERNANCE_ABI, GOVERNANCE_ADDRESS } from "./governanceContract";
import { TOURNAMENT_ABI, TOURNAMENT_ADDRESS } from "./tournamentContract";
import { USER_ABI, USER_ADDRESS } from "./userContract";

export const STORAGE_PREFIX = '@FencerFight_';
export const ACCENT = '#FD5003';
export const FG = '#FFFFFF';
export const SURFACE = '#221D1A';
export const BG = '#000000';
export const PLACEHOLDER = FG + '80';
export const SURFACE_2 = "#222";
export const ACCENT_TRANSPARENT = ACCENT + '33'

export const langLabels: Record<string, string> = {
    en: 'EN',
    ru: 'RU',
    cn: 'CN',
};

export const PRIVATE_KEY = process.env.EXPO_PUBLIC_PRIVATE_KEY as string

export enum CategoriesSBT {
    CLUB_CATEGORY,
    CITY_CATEGORY,
    COUNTRY_CATEGORY,
}

export const contractType = {
  tournament: {
    address: TOURNAMENT_ADDRESS,
    abi: TOURNAMENT_ABI
  },
  user: {
    address: USER_ADDRESS,
    abi: USER_ABI
  },
  governance: {
    address: GOVERNANCE_ADDRESS,
    abi: GOVERNANCE_ABI
  },
  achievement: {
    address: ACHIEVEMENT_ADDRESS,
    abi: ACHIEVEMENT_ABI
  }
}