import { ImageSourcePropType } from 'react-native';

// --- Typ-Definitionen ---

export interface SolutionMap {
  [coordinate: string]: boolean; // z.B. "0,1": true
}

export interface CaptchaItem {
  id: string;
  imageUrl: ImageSourcePropType; // Akzeptiert require('./...') oder { uri: '...' }
  instructionText: string;
  gridSize: number;
  solutionMap: SolutionMap;
}

// --- Helper Funktionen ---

const createSolutionMap = (gridSize: number, trueCoordinates: string[]): SolutionMap => {
  const map: SolutionMap = {};
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const key = `${x},${y}`;
      map[key] = trueCoordinates.includes(key);
    }
  }
  return map;
};

// --- Die Datenbank ---

const CAPTCHA_LIST: CaptchaItem[] = [
  // Beispiel für lokales Bild (auskommentiert, damit der Code copy-paste-fähig bleibt)
//   {
//     id: 'trump-putin',
//     imageUrl: require('../assets/images/trump-putin.jpeg'),
//     instructionText: 'Kriegsverbrechern',
//     gridSize: 4,
//     solutionMap: createSolutionMap(4, 
//         [
//             "1,0",
//             "0,1", "1,1", 
//             "0,2", "1,2", "2,2", 
//             "0,3",  "1,3"
//         ]),
//   },
  {
    id: 'github',
    imageUrl: require('../assets/images/github.png'),
    instructionText: 'Repositories worth taking a look at',
    gridSize: 4,
    solutionMap: createSolutionMap(4, 
        [
            "2,3", "3,3"
        ]),
  },{
    id: 'hello-world',
    imageUrl: require('../assets/images/hello-world.png'),
    instructionText: 'Interesting texts',
    gridSize: 4,
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
//   {
//     id: 'icon',
//     imageUrl: require('../assets/images/icon.png'),
//     instructionText: 'Icons',
//     gridSize: 4,
//     solutionMap: createSolutionMap(4, ["0,1"]),
//   }
];

/**
 * Wählt ein neues Captcha, schließt das aktuelle (optional) aus.
 */
export const getNextCaptcha = (currentId: string | null = null): CaptchaItem => {
  const availableCaptchas = CAPTCHA_LIST.length > 1 
    ? CAPTCHA_LIST.filter(c => c.id !== currentId)
    : CAPTCHA_LIST;

  const randomIndex = Math.floor(Math.random() * availableCaptchas.length);
  return availableCaptchas[randomIndex];
};