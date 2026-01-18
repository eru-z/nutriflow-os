// src/screens/WorkoutScreen.js
// NutriFlow OS — Premium Dark Fitness UI (Neon Yellow Accents)

import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
} from "react-native";
import { theme } from "../theme";
import { useApp } from "../AppContext";

const neon = theme.colors.neonYellow;

// ------------------------------------------------------
// METRIC CARD
// ------------------------------------------------------
const MetricsCard = ({ label, value, color }) => (
  <View style={[styles.metricCard, { borderLeftColor: color }]}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={[styles.metricValue, { color }]}>{value}</Text>
  </View>
);

// ------------------------------------------------------
// WORKOUT PROGRAM CARD
// ------------------------------------------------------
const WorkoutProgramCard = ({ title }) => (
  <View style={styles.programCard}>
    <Text style={styles.programText}>{title}</Text>
  </View>
);

// ------------------------------------------------------
// WORKOUT PREVIEW
// ------------------------------------------------------
const WorkoutPreview = () => (
  <View style={styles.previewCard}>
    <Image
      source={require("../assets/images/workout.png")}
      style={styles.previewImage}
      resizeMode="cover"
    />

    <Text style={styles.previewTitle}>Full Body Burn</Text>
    <Text style={styles.previewSubtitle}>30 min • Intermediate</Text>

    <View style={styles.previewBtns}>
      <TouchableOpacity style={styles.previewPlay}>
        <Text style={styles.previewPlayText}>Play</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.previewDetails}>
        <Text style={styles.previewDetailsText}>Details</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ------------------------------------------------------
// MAIN SCREEN
// ------------------------------------------------------
export default function WorkoutScreen() {
  const { state } = useApp();

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fade, transform: [{ translateY: slide }] },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Text style={styles.title}>Stay Active</Text>
        <Text style={styles.streak}>
          You're on a {Math.floor(Math.random() * 6) + 3}-day streak!
        </Text>

        {/* METRICS */}
        <View style={styles.metricRow}>
          <MetricsCard
            label="Heart Rate"
            value="102 bpm"
            color="#FF7A7A"
          />
          <MetricsCard
            label="Calories Burned"
            value="489"
            color="#4FD1C5"
          />
          <MetricsCard
            label="Steps"
            value="6,812"
            color="#9F7AEA"
          />
        </View>

        {/* PROGRAMS GRID */}
        <Text style={styles.sectionTitle}>Programs</Text>
        <View style={styles.programGrid}>
          <WorkoutProgramCard title="Strength" />
          <WorkoutProgramCard title="Cardio" />
          <WorkoutProgramCard title="HIIT" />
          <WorkoutProgramCard title="Upper Body" />
          <WorkoutProgramCard title="Lower Body" />
          <WorkoutProgramCard title="Core" />
        </View>

        {/* PREVIEW */}
        <Text style={styles.sectionTitle}>Today's Workout</Text>
        <WorkoutPreview />
      </ScrollView>
    </Animated.View>
  );
}

// ------------------------------------------------------
// STYLES
// ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 34,
    color: theme.colors.white,
    fontWeight: "700",
    fontFamily: "serif",
  },

  streak: {
    fontSize: 16,
    color: neon,
    marginBottom: 20,
    marginTop: 4,
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },

  metricCard: {
    width: "48%",
    backgroundColor: "#141414",
    padding: 18,
    borderRadius: 18,
    borderLeftWidth: 5,
  },

  metricLabel: {
    color: "#AAA",
    fontSize: 14,
    marginBottom: 6,
  },

  metricValue: {
    fontSize: 26,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 24,
    fontFamily: "serif",
    fontWeight: "600",
    color: theme.colors.white,
    marginBottom: 12,
    marginTop: 10,
  },

  programGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 20,
  },

  programCard: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 20,
    width: "47%",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderColor: neon,
    borderWidth: 0.6,
  },

  programText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  previewCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 18,
    marginBottom: 40,
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  previewImage: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    marginBottom: 14,
  },

  previewTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: "700",
  },

  previewSubtitle: {
    color: "#AAA",
    fontSize: 14,
    marginBottom: 16,
  },

  previewBtns: {
    flexDirection: "row",
    gap: 10,
  },

  previewPlay: {
    backgroundColor: neon,
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 16,
  },

  previewPlayText: {
    color: theme.colors.dark,
    fontWeight: "700",
    fontSize: 16,
  },

  previewDetails: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 16,
  },

  previewDetailsText: {
    color: "#EEE",
    fontWeight: "600",
    fontSize: 16,
  },
});
