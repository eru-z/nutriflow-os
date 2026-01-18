// src/screens/WelcomeScreen.js
// NutriFlow OS — Elegant AI-Dietitian Style Welcome Screen

import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { theme } from "../theme";

const { width, height } = Dimensions.get("window");

// ------------------------------------------------------
// LOCAL FLOATING IMAGE COMPONENT
// ------------------------------------------------------
const FloatingImage = ({ source, size, offsetX, offsetY, delay }) => {
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 4000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: offsetY,
        left: offsetX,
        transform: [{ translateY }],
        opacity: 0.9,
      }}
    >
      <Image
        source={source}
        style={{ width: size, height: size, opacity: 0.85 }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

// ------------------------------------------------------
// PRIMARY BUTTON (INSIDE FILE)
// ------------------------------------------------------
const StartButton = ({ onPress }) => (
  <TouchableOpacity style={styles.startButton} onPress={onPress}>
    <Text style={styles.startButtonText}>Get Started</Text>
  </TouchableOpacity>
);

// ------------------------------------------------------
// MAIN SCREEN
// ------------------------------------------------------
export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Floating Images (Mock placeholders until you add real PNGs) */}
      <FloatingImage
        source={require("../assets/images/hero1.png")}
        size={110}
        offsetX={-10}
        offsetY={100}
        delay={0}
      />
      <FloatingImage
        source={require("../assets/images/hero2.png")}
        size={90}
        offsetX={width - 120}
        offsetY={160}
        delay={400}
      />

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideUp }] },
        ]}
      >
        <Text style={styles.title}>NutriFlow OS</Text>
        <Text style={styles.subtitle}>
          Your personal nutrition & fitness companion
        </Text>

        <StartButton onPress={() => navigation.navigate("MainTabs")} />
      </Animated.View>
    </View>
  );
}

// ------------------------------------------------------
// STYLES
// ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: -60,
  },

  title: {
    fontSize: 42,
    fontWeight: "600",
    fontFamily: "serif",
    color: theme.colors.dark,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color: theme.colors.gray2,
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: 300,
  },

  startButton: {
    backgroundColor: theme.colors.primaryGreen,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: theme.radius.lg,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  startButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.dark,
  },
});
