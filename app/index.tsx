import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native';
import { CaptchaItem, getNextCaptcha } from './captcha-data';
import CustomCaptcha from './captcha-factory';

export default function App() {
  // State explizit als CaptchaItem oder null typisieren
  const [currentCaptcha, setCurrentCaptcha] = useState<CaptchaItem | null>(null);

  useEffect(() => {
    loadNewCaptcha();
  }, []);

  const loadNewCaptcha = () => {
    const next = currentCaptcha ? getNextCaptcha( currentCaptcha.imageUrl, currentCaptcha.instructionText) : getNextCaptcha(null, null);
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
          imageUrl={currentCaptcha.imageUrl}
          instructionText={currentCaptcha.instructionText}
          solutionMap={currentCaptcha.solutionMap}
          onSuccess={handleSuccess}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This is an art project. The content was created by{' '}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.kollektiv-plus.de/')}>
            <Text style={styles.linkText}>kollektiv-plus/</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    color: '#a0a0a0',
    fontSize: 12,
    textAlign: 'center',
  },
  linkText: {
    color: '#a0a0a0',
    fontSize: 12,
    textDecorationLine: 'underline',
  }
});