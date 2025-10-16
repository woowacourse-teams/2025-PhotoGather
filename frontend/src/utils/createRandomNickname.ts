import { NICKNAME } from '../constants/constants';

export const createRandomNickName = () => {
  const firstRandomAdjective =
    NICKNAME.ADJECTIVES_1[
      Math.floor(Math.random() * NICKNAME.ADJECTIVES_1.length)
    ];
  const secondRandomAdjective =
    NICKNAME.ADJECTIVES_2[
      Math.floor(Math.random() * NICKNAME.ADJECTIVES_2.length)
    ];
  const noun =
    NICKNAME.NOUNS[Math.floor(Math.random() * NICKNAME.NOUNS.length)];
  return `${firstRandomAdjective}${secondRandomAdjective}${noun}`;
};
