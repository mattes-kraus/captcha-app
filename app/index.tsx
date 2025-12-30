import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { CaptchaItem, getNextCaptcha } from './captcha-data';
import CustomCaptcha from './captcha-factory';

export default function App() {
  // State explizit als CaptchaItem oder null typisieren
  const [currentCaptcha, setCurrentCaptcha] = useState<CaptchaItem | null>(null);

  useEffect(() => {
    loadNewCaptcha();
  }, []);

  const loadNewCaptcha = () => {
    const next = getNextCaptcha(currentCaptcha ? currentCaptcha.id : null);
    setCurrentCaptcha(next);
  };

  const handleSuccess = () => {
    // Hier Logik für erfolgreiches Login etc.
    console.log("Erfolg! Lade nächstes...");
    
    // Kleiner Timeout für bessere UX (damit man den Alert kurz sieht)
    setTimeout(() => {
      loadNewCaptcha();
    }, 500);
  };

  if (!currentCaptcha) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.center}>
        <CustomCaptcha 
          key={currentCaptcha.id} 
          imageUrl={currentCaptcha.imageUrl}
          instructionText={currentCaptcha.instructionText}
          gridSize={currentCaptcha.gridSize}
          solutionMap={currentCaptcha.solutionMap}
          onSuccess={handleSuccess}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});