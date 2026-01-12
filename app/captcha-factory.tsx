import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import { gridSize, main_color } from "./constants";

interface CustomCaptchaProps {
  imageUrl: ImageSourcePropType;
  instructionText: string;
  solutionMap: Record<string, boolean>;
  onSuccess?: () => void;
}

/**
 * CustomCaptcha Komponente
 * * @param {string} imageUrl - URL oder Pfad (via require) zum Bild.
 * @param {string} instructionText - Der Text oben (z.B. "Wähle alle Ampeln").
 * @param {object} solutionMap - Dictionary mit Koordinaten "x,y" als Key und true/false als Value.
 * Beispiel: { "0,0": false, "1,1": true }
 * @param {function} onSuccess - Callback wenn das Captcha gelöst wurde.
 */
export default function CustomCaptcha({
  imageUrl,
  instructionText,
  solutionMap,
  onSuccess,
}: CustomCaptchaProps) {
  // Wir speichern die Koordinaten der ausgewählten Felder als Strings "x,y"
  const [selectedCoords, setSelectedCoords] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  // Responsive width
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const MAX_WIDTH = 450; // Auf dem iPad soll es nicht breiter als 450px werden
  const PADDING = 32;    // Wir wollen links und rechts je 16px Abstand zum Rand
  const CAPTCHA_WIDTH = Math.min(screenWidth - PADDING, MAX_WIDTH, screenHeight);
  const TILE_SIZE = (CAPTCHA_WIDTH - 32) / gridSize

  // Klick-Handler
  const handlePress = (x: any, y: any) => {
    const coordKey = `${x},${y}`;

    if (selectedCoords.includes(coordKey)) {
      // Wenn schon ausgewählt -> entfernen
      setSelectedCoords(selectedCoords.filter((k) => k !== coordKey));
    } else {
      // Hinzufügen
      setSelectedCoords([...selectedCoords, coordKey]);
    }
  };

  // Validierungs-Logik
  const verifyCaptcha = () => {
    if(Object.keys(solutionMap).length === 0){ 
      if(onSuccess) onSuccess();
      return
  }

    let isCorrect = true;

    // 1. Prüfen, ob alle ausgewählten Felder laut Lösung "true" sind
    // 2. Prüfen, ob wir keine "true" Felder vergessen haben

    // Wir iterieren durch das gesamte Grid
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const key = `${x},${y}`;
        const shouldBeSelected = solutionMap[key] === true;
        const isSelected = selectedCoords.includes(key);

        if (shouldBeSelected !== isSelected) {
          isCorrect = false;
          break;
        }
      }
    }

    if (isCorrect) {
      if (onSuccess) onSuccess();
    } else {
      console.log("Falsch");
      setSelectedCoords([]); // Reset bei Fehler
    }
  };

  // Grid rendern
  const renderGrid = () => {
    let tiles = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const key = `${x},${y}`;
        const isSelected = selectedCoords.includes(key);

        tiles.push(
          <TouchableOpacity
            key={key}
            activeOpacity={0.8}
            onPress={() => handlePress(x, y)}
            style={[
              styles.tile,
              { width: TILE_SIZE, height: TILE_SIZE },
              isSelected && styles.selectedTile, // Style-Änderung bei Auswahl
            ]}
          >
            {/* TRICK: Das Bild ist im Tile, aber wir verschieben es negativ,
              sodass nur der richtige Ausschnitt zu sehen ist.
            */}
            <View style={{ overflow: "hidden", width: "100%", height: "100%" }}>
              <Image
                source={imageUrl}
                style={{
                  width: CAPTCHA_WIDTH,
                  height: CAPTCHA_WIDTH, // Wir gehen von quadratischen Bildern aus
                  transform: [
                    { translateX: -x * TILE_SIZE },
                    { translateY: -y * TILE_SIZE },
                  ],
                }}
                resizeMode="cover"
              />
            </View>

            {/* Das "Selected" Overlay (z.B. ein Haken oder blauer Rand) */}
            {isSelected && (
              <View style={styles.checkMarkContainer}>
                <View style={styles.checkMark} />
              </View>
            )}
          </TouchableOpacity>
        );
      }
    }
    return tiles;
  };

  return (
    <View style={[styles.container, { width: CAPTCHA_WIDTH }]}>
      {/* Header Bereich - Jetzt geht er über die volle Breite */}
      <View style={styles.header}>
          <Text style={styles.smallerHeaderText}>Wähle alle Felder mit</Text>
          <Text style={styles.biggerHeaderText}>{instructionText}</Text>
          <Text style={styles.smallerHeaderText}>aus</Text>
      </View>

      <View style={styles.contentWrapper}>
        <View style={[styles.gridContainer, { width: CAPTCHA_WIDTH - 32, height: CAPTCHA_WIDTH - 32 }]}>
        {/* WICHTIG: Oben im Code bei der Berechnung von TILE_SIZE:
            Da wir jetzt wieder Padding von 16 links+rechts haben (durch contentWrapper),
            muss das Grid CAPTCHA_WIDTH - 32 breit sein.
            Achte darauf, dass TILE_SIZE = (CAPTCHA_WIDTH - 32) / gridSize ist!
        */}
            {renderGrid()}
        </View>

        {/* Footer Bereich */}
        <View style={[styles.footer, { width: CAPTCHA_WIDTH - 32 }]}>
            {/* -- Die Info-Sprechblase -- */}
            {showInfo && (
                <View style={styles.infoBubble}>
                <Text style={styles.infoBubbleText}>
                    Das ist ein Sicherheitscheck. Bitte tippe alle passenden Kacheln an und drücke auf bestätigen um zu bestätigen.
                </Text>
                {/* Kleines Dreieck unten an der Blase (optional für den Look) */}
                <View style={styles.arrowDown} />
                </View>
            )}

            {/* Linke Seite: Info Icon mit Toggle-Funktion */}
            <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
                {/* Wir färben das Icon blau, wenn es aktiv ist */}
                <MaterialIcons 
                name="info-outline" 
                size={28} 
                color={showInfo ? "#4285F4" : "#555"} 
                />
            </TouchableOpacity>

            {/* Rechte Seite: Verify Button */}
            <TouchableOpacity style={styles.verifyButton} onPress={verifyCaptcha}>
                <Text style={styles.verifyButtonText}>BESTÄTIGEN</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Android Schatten
    alignItems: "center",
    overflow: 'hidden'
  },
  header: {
    backgroundColor: main_color, // Google Blau
    width: "100%",
    padding: 15,
    flexDirection: 'column'
  },
  contentWrapper: {
    padding: 16, // Hier kommt das Padding hin, das vorher im Container war
    width: '100%',
    alignItems: 'center',
  },
  biggerHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },
  smallerHeaderText: {
    color: "#fff",
    fontSize: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // Kein Overflow hidden hier, damit wir den Rand der Tiles sehen
  },
  tile: {
    padding: 2, // Kleiner weißer Abstand zwischen Bildern (Gutter)
    position: "relative",
  },
  selectedTile: {
    // Wenn ausgewählt, machen wir das Bild etwas kleiner für den Effekt
    padding: 6,
  },
  checkMarkContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: main_color,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  checkMark: {
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  verifyButton: {
    backgroundColor: main_color,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "flex-end",
  },
  footer: {
    flexDirection: 'row',       // Elemente nebeneinander
    justifyContent: 'space-between', // Maximale Distanz zwischen Elementen (links/rechts)
    alignItems: 'center',       // Vertikal zentriert
    marginTop: 15,              // Abstand zum Grid
  },
  verifyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  infoBubble: {
    position: 'absolute',
    bottom: 45, // Schiebt die Box nach oben (über das Icon)
    left: 0,    // Links bündig mit dem Footer
    width: 220, // Breite der Box
    backgroundColor: '#333', // Dunkler Hintergrund
    borderRadius: 6,
    padding: 12,
    zIndex: 10, // Damit es sicher über dem Bild liegt
    // Schatten für iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Schatten für Android
    elevation: 5,
  },
  infoBubbleText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },
  // CSS-Trick für ein kleines Dreieck, das nach unten zeigt
  arrowDown: {
    position: 'absolute',
    bottom: -8, // Hängt unten an der Box dran
    left: 6,   // Position über dem Icon
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#333', // Muss gleiche Farbe wie Background haben
  },
});
