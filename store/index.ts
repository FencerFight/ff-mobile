// store.ts
import { PRIVATE_KEY } from '@/constants';
import { atom } from 'jotai';

export const fightTimeDefault = 180;
export const hitZonesDefault = {
  head: 3,
  torso: 2,
  arms: 2,
  legs: 1
}

export enum Gender {
  MALE,
  FEMALE
}
export type ParticipantType = { name: string; gender: Gender, wins: number, address: string };

// Основные атомы таймера
export const fightTimeAtom = atom(fightTimeDefault); // Время боя в секундах (по умолчанию 3 минуты)
export const win1Atom = atom(0); // Очки первого бойца
export const win2Atom = atom(0); // Очки второго бойца
export const isRunningAtom = atom(false); // Состояние таймера (запущен/остановлен)
export const timeLeftAtom = atom(fightTimeDefault); // Оставшееся время
export const languageAtom = atom<"en"|"ru"|"cn">('en'); // Язык интерфейса ('en', 'ru', 'cn')
export const soundsUpdateAtom = atom(true); // Обновление звуков
export const sameGenderOnlyAtom = atom(false); // Сортировка по полу

// Атомы для новых функций
export const doubleHitsAtom = atom(0); // Флаг учета обоюдных попаданий
export const protests1Atom = atom(0); // Флаг учета протестов для бойца 1
export const protests2Atom = atom(0); // Флаг учета протестов для бойца 2
export const warnings1Atom = atom(0); // Счетчик предупреждений для бойца 1
export const warnings2Atom = atom(0); // Счетчик предупреждений для бойца 2


// Атомы для управления парами бойцов
export const fighterPairsAtom = atom<ParticipantType[][]>([
  // Массив пар бойцов по умолчанию
  [{ name: 'Fighter A', gender: Gender.MALE, wins: 0, address: ""}, { name: 'Fighter B', gender: Gender.MALE, wins: 0, address: "" }],
  [{ name: 'Fighter C', gender: Gender.FEMALE, wins: 0, address: "" }, { name: 'Fighter D', gender: Gender.FEMALE, wins: 0, address: "" }]
]);

export const duelsAtom = atom<ParticipantType[][][]>([])

export const hitZonesAtom = atom(hitZonesDefault);

export const currentPairIndexAtom = atom(0); // Индекс текущей выбранной пары
export const currentTournamentIdAtom = atom(-1)
export const currentNominationIdAtom = atom({
  id: -1,
  weaponId: -1
})

export const userDataAtom = atom({
  wallet: "",
  privateKey: PRIVATE_KEY,
  tournamentIds: [],
  gender: Gender.MALE
});