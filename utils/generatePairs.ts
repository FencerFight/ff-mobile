import { Gender, ParticipantType } from "@/store";

export const generatePairs = (
    participants: ParticipantType[],
    sameGenderOnly: boolean,
    setFighterPairs: React.Dispatch<React.SetStateAction<ParticipantType[][]>>,
    setCurrentPairIndex: React.Dispatch<React.SetStateAction<number>>) =>
{
  let shuffled = [...participants].sort(() => Math.random() - 0.5);
  const pairs: ParticipantType[][] = [];

  if (sameGenderOnly) {
    const males = shuffled.filter((p) => p.gender === Gender.MALE);
    const females = shuffled.filter((p) => p.gender === Gender.FEMALE);

    [males, females].forEach((group) => {
      for (let i = 0; i < group?.length - 1; i += 2) {
        pairs.push([group[i], group[i + 1]]);
      }
      if (group?.length % 2 !== 0) {
        pairs.push([group[group.length - 1], { name: '—', gender: group[group.length - 1].gender, wins: 0, address: "" }]);
      }
    });
    setFighterPairs(pairs);
  } else {
    /* старая логика без фильтра по полу */

    for (let i = 0; i < shuffled?.length - 1; i += 2) {
      pairs.push([shuffled[i], shuffled[i + 1]]);
      }
      if (shuffled?.length % 2 !== 0) {
        pairs.push([shuffled[shuffled.length - 1], { name: '—', gender: shuffled[shuffled.length - 1].gender, wins: 0, address: "" } ]);
      }
        setFighterPairs(pairs);
    }

    setCurrentPairIndex(0)
    return pairs
}