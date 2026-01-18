// src/screens/HomeScreen.js
// NutriFlow OS — Home Dashboard (AI Dietitian + Fitness UI Style)

import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { theme } from "../theme";
import { useApp } from "../AppContext";

// Get screen width
const SCREEN_WIDTH = 380;

// ------------------------------------------------------
// SEARCH BAR COMPONENT
// ------------------------------------------------------
const SearchBar = ({ value, onChange }) => (
  <View style={styles.searchContainer}>
    <TextInput
      placeholder="Search meals, foods, ingredients..."
      placeholderTextColor="#999"
      style={styles.searchInput}
      value={value}
      onChangeText={onChange}
    />
  </View>
);

// ------------------------------------------------------
// FILTER CHIP COMPONENT
// ------------------------------------------------------
const FilterChip = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.filterChip,
      { backgroundColor: active ? theme.colors.primaryGreen : "#F3F3F3" },
    ]}
  >
    <Text
      style={{
        color: active ? theme.colors.dark : "#777",
        fontWeight: "600",
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// ------------------------------------------------------
// MEAL CARD
// ------------------------------------------------------
const MealCard = ({ title, calories }) => (
  <View style={styles.mealCard}>
    <Text style={styles.mealTitle}>{title}</Text>
    <Text style={styles.mealCalories}>{calories} kcal</Text>
  </View>
);

// ------------------------------------------------------
// METRIC CARD (Fitness Stats)
// ------------------------------------------------------
const MetricCard = ({ label, value, color }) => (
  <View style={[styles.metricCard, { borderLeftColor: color }]}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={[styles.metricValue, { color }]}>{value}</Text>
  </View>
);

// ------------------------------------------------------
// ACTIVITY RING (Simple Animated Progress)
// ------------------------------------------------------
const ActivityRing = ({ progress }) => {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const ringWidth = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.ringContainer}>
      <View style={styles.ringBackground} />
      <Animated.View style={[styles.ringProgress, { width: ringWidth }]} />
      <Text style={styles.ringText}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

// ------------------------------------------------------
// MAIN SCREEN
// ------------------------------------------------------
export default function HomeScreen() {
  const { state, setFilters } = useApp();

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
        <Text style={styles.welcomeTitle}>Hello, {state.user.name}</Text>
        <Text style={styles.welcomeSubtitle}>
          Track your meals & stay active
        </Text>

        {/* SEARCH BAR */}
        <SearchBar />

        {/* FILTERS */}
        <View style={styles.filterRow}>
          <FilterChip
            label="Gluten-Free"
            active={state.filters.glutenFree}
            onPress={() => setFilters({ glutenFree: !state.filters.glutenFree })}
          />
          <FilterChip
            label="Keto"
            active={state.filters.keto}
            onPress={() => setFilters({ keto: !state.filters.keto })}
          />
          <FilterChip
            label="Detox"
            active={state.filters.detox}
            onPress={() => setFilters({ detox: !state.filters.detox })}
          />
        </View>

        {/* TODAY'S MEALS */}
        <Text style={styles.sectionTitle}>Today's Meals</Text>
        <View style={styles.mealRow}>
          <MealCard title="Avocado Toast" calories={320} />
          <MealCard title="Greek Yogurt Bowl" calories={210} />
        </View>

        {/* FITNESS METRICS */}
        <Text style={styles.sectionTitle}>Fitness Metrics</Text>
        <View style={styles.metricRow}>
          <MetricCard label="Calories Burned" value="489" color="#FF7A7A" />
          <MetricCard label="Steps" value="6,812" color="#4FD1C5" />
          <MetricCard label="Heart Rate" value="102 bpm" color="#9F7AEA" />
        </View>

        {/* ACTIVITY RING */}
        <Text style={styles.sectionTitle}>Daily Activity</Text>
        <ActivityRing progress={0.64} />
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
    backgroundColor: theme.colors.white,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  welcomeTitle: {
    fontSize: 34,
    fontFamily: "serif",
    color: theme.colors.dark,
    fontWeight: "600",
  },

  welcomeSubtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },

  searchContainer: {
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 20,
  },

  searchInput: {
    fontSize: 16,
    color: theme.colors.dark,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontFamily: "serif",
    fontWeight: "600",
    color: theme.colors.dark,
    marginBottom: 10,
    marginTop: 10,
  },

  mealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  mealCard: {
    width: SCREEN_WIDTH * 0.42,
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 20,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  mealTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.dark,
    marginBottom: 4,
  },

  mealCalories: {
    color: "#666",
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  metricCard: {
    width: SCREEN_WIDTH * 0.42,
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 18,
    borderLeftWidth: 6,
  },

  metricLabel: {
    color: "#EEE",
    fontSize: 14,
    marginBottom: 6,
  },

  metricValue: {
    fontSize: 24,
    fontWeight: "700",
  },

  ringContainer: {
    width: 160,
    height: 160,
    backgroundColor: "#F3F3F3",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },

  ringBackground: {
    position: "absolute",
    width: "80%",
    height: 12,
    borderRadius: 10,
    backgroundColor: "#DDD",
  },

  ringProgress: {
    position: "absolute",
    height: 12,
    borderRadius: 10,
    backgroundColor: theme.colors.primaryGreen,
  },

  ringText: {
    fontSize: 26,
    fontFamily: "serif",
    marginTop: 20,
    color: theme.colors.dark,
  },
});
