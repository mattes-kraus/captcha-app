import { ImageSourcePropType } from 'react-native';

// --- Typ-Definitionen ---

export interface SolutionMap {
  [coordinate: string]: boolean; // z.B. "0,1": true
}

export interface CaptchaItem {
  imageUrl: ImageSourcePropType; // Akzeptiert require('./...') oder { uri: '...' }
  instructionText: string;
  solutionMap: SolutionMap;
}

// --- Helper Funktionen ---
/**
 * Wählt ein neues Captcha, schließt das aktuelle (optional) aus.
 */
export const getNextCaptcha = (path: ImageSourcePropType | null = null, caption: string | null): CaptchaItem => {
  const availableCaptchas = CAPTCHA_LIST.length > 1 
    ? CAPTCHA_LIST.filter(c => (c.imageUrl !== path) && (c.instructionText !== caption))
    : CAPTCHA_LIST;

  const randomIndex = Math.floor(Math.random() * availableCaptchas.length);
  return availableCaptchas[randomIndex];
};

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
  {
    imageUrl: require('../assets/captchas/spiegelselfie.jpg'),
    instructionText: 'Normalität',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/spiegelselfie.jpg'),
    instructionText: 'Vibes',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/pylone.jpg'),
    instructionText: 'Vibes',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/pylone.jpg'),
    instructionText: 'NPC Behavior',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/stuhlkreis.jpg'),
    instructionText: 'Normalität',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/stuhlkreis.jpg'),
    instructionText: 'Verantwortung',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/stuhlkreis.jpg'),
    instructionText: 'Why am I like this',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/randale.jpg'),
    instructionText: 'Main Character Energy',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/randale.jpg'),
    instructionText: 'Normalität',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/randale.jpg'),
    instructionText: 'Schuld',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/randale.jpg'),
    instructionText: 'Unschuld',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/wecker.jpg'),
    instructionText: 'Freiheit',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/wecker.jpg'),
    instructionText: "It's not that deep",
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/wecker.jpg'),
    instructionText: 'Main Character Energy',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/nonnen.jpg'),
    instructionText: 'Gefahr',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/nonnen.jpg'),
    instructionText: 'Healing',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/nonnen.jpg'),
    instructionText: "It's not that deep",
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/nonnen.jpg'),
    instructionText: 'NPC Behavior',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/nonnen.jpg'),
    instructionText: 'Unhinged',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/nonnen.jpg'),
    instructionText: 'Why am I like this',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/brand.jpeg'),
    instructionText: "Actually it is",
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/brand.jpeg'),
    instructionText: "Gefahr",
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/brand.jpeg'),
    instructionText: "Schuld",
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/brand.jpeg'),
    instructionText: "Unschuld",
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/kanye.jpg'),
    instructionText: 'Liebe',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/kanye.jpg'),
    instructionText: 'Main Character Energy',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/kanye.jpg'),
    instructionText: 'Schuld',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/freiheit-1.jpg'),
    instructionText: 'Freiheit',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/freiheit-2.jpg'),
    instructionText: 'Freiheit',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/family.jpg'),
    instructionText: 'Actually it is',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/family.jpg'),
    instructionText: 'Healing',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/family.jpg'),
    instructionText: 'I should unpack this in therapy',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/family.jpg'),
    instructionText: 'Liebe',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/family.jpg'),
    instructionText: 'Verantwortung',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/family.jpg'),
    instructionText: 'Why am I like this',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/kneeing-child.jpg'),
    instructionText: 'Main Character Energy',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/kneeing-child.jpg'),
    instructionText: 'This says a lot about about society',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/kneeing-child.jpg'),
    instructionText: 'Liebe',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/kneeing-child.jpg'),
    instructionText: 'Unhinged',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/romantic-room.jpg'),
    instructionText: 'Main Character Energy',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/romantic-room.jpg'),
    instructionText: 'This says a lot about society',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/romantic-room.jpg'),
    instructionText: 'Liebe',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'Sicherheit',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'Verantwortung',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'Verantwortung',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'Liebe',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'Gefahr',
    solutionMap: createSolutionMap(4, []),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'Freiheit',
    solutionMap: createSolutionMap(4, []),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'Healing',
    solutionMap: createSolutionMap(4, []),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'Actually it is',
    solutionMap: createSolutionMap(4, []),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'I should unpack this in therapy',
    solutionMap: createSolutionMap(4, []),
  },
  {
    imageUrl: require('../assets/captchas/geld.jpg'),
    instructionText: 'It`s not that deep',
    solutionMap: createSolutionMap(4, []),
  },
  {
    imageUrl: require('../assets/captchas/charlie_kirk_1.jpg'),
    instructionText: 'Charlie Kirk',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/charlie_kirk_2.jpg'),
    instructionText: 'Charlie Kirk',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  {
    imageUrl: require('../assets/captchas/charlie_kirk_3.png'),
    instructionText: 'Charlie Kirk',
    solutionMap: createSolutionMap(4, 
        [

        ]),
  },
  // ** MY CAPTCHAS **************************************** /
  // {
  //   id: 'trump-putin',
  //   imageUrl: require('../assets/images/trump-putin.jpeg'),
  //   instructionText: 'Verurteilten Kriegsverbrechern',
  //   gridSize: 4,
  //   solutionMap: createSolutionMap(4, 
  //       [
  //           "1,0",
  //           "0,1", "1,1", 
  //           "0,2", "1,2", "2,2", 
  //           "0,3",  "1,3"
  //       ]),
  // },
  // {
  //   id: 'github',
  //   imageUrl: require('../assets/images/github.png'),
  //   instructionText: 'Repositories worth taking a look at',
  //   gridSize: 4,
  //   solutionMap: createSolutionMap(4, 
  //       [
  //           "2,3", "3,3"
  //       ]),
  // },{
  //   id: 'hello-world',
  //   imageUrl: require('../assets/images/hello-world.png'),
  //   instructionText: 'Interesting texts',
  //   gridSize: 4,
  //   solutionMap: createSolutionMap(4, 
  //       [

  //       ]),
  // },
//   {
//     id: 'icon',
//     imageUrl: require('../assets/images/icon.png'),
//     instructionText: 'Icons',
//     gridSize: 4,
//     solutionMap: createSolutionMap(4, ["0,1"]),
//   }
];