import { ADJECTIVES_1, ADJECTIVES_2, NOUNS } from '../constants/nickNames';

export const createRandomNickName = () => {
  const firstRandomAdjective =
    ADJECTIVES_1[Math.floor(Math.random() * ADJECTIVES_1.length)];
  const secondRandomAdjective =
    ADJECTIVES_2[Math.floor(Math.random() * ADJECTIVES_2.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${firstRandomAdjective}${secondRandomAdjective}${noun}`;
};
