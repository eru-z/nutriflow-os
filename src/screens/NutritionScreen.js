// src/screens/NutritionScreen.js
// NutriFlow OS — Premium AI-Dietitian Style Nutrition Screen

import React, { useState, useRef, useEffect } from "react";
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
import { searchFood } from "../api";
import { useApp } from "../AppContext";

// ------------------------------------------------------
// SEARCH BAR COMPONENT
// ------------------------------------------------------
const FoodSearchBar = ({ value, onChange, onSearch }) => (
  <View style={styles.searchContainer}>
    <TextInput
      placeholder="Search foods, ingredients..."
      placeholderTextColor="#999"
      style={styles.searchInput}
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onSearch}
    />
    <TouchableOpacity onPress={onSearch}>
      <Text style={styles.searchBtn}>Search</Text>
    </TouchableOpacity>
  </View>
);

// ------------------------------------------------------
// FILTER CHIP
// ------------------------------------------------------
const DietFilterChip = ({ label, active, onPress }) => (
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
// MEAL RESULT CARD
// ------------------------------------------------------
const MealResultCard = ({ item, onAdd }) => (
  <View style={styles.mealCard}>
    <View>
      <Text style={styles.mealTitle}>{item.name}</Text>
      <Text style={styles.mealCalories}>{item.calories} kcal</Text>
      <Text style={styles.mealSubtitle}>{item.category}</Text>
    </View>

    <TouchableOpacity onPress={onAdd} style={styles.addBtn}>
      <Text style={styles.addBtnText}>+</Text>
    </TouchableOpacity>
  </View>
);

// ------------------------------------------------------
// MACRO SUMMARY CARD
// ------------------------------------------------------
const MacroSummaryCard = ({ macros }) => (
  <View style={styles.macroCard}>
    <Text style={styles.sectionTitle}>Today's Macros</Text>

    <View style={styles.macroRow}>
      <View style={styles.macroItem}>
        <Text style={styles.macroLabel}>Calories</Text>
        <Text style={styles.macroValue}>{macros.calories}</Text>
      </View>

      <View style={styles.macroItem}>
        <Text style={styles.macroLabel}>Protein</Text>
        <Text style={styles.macroValue}>{macros.protein}g</Text>
      </View>

      <View style={styles.macroItem}>
        <Text style={styles.macroLabel}>Carbs</Text>
        <Text style={styles.macroValue}>{macros.carbs}g</Text>
      </View>

      <View style={styles.macroItem}>
        <Text style={styles.macroLabel}>Fat</Text>
        <Text style={styles.macroValue}>{macros.fat}g</Text>
      </View>
    </View>
  </View>
);

// ------------------------------------------------------
// MAIN SCREEN
// ------------------------------------------------------
export default function NutritionScreen() {
  const { state, addMeal, updateMacros, setFilters } = useApp();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const runSearch = async () => {
    if (!query) return;
    try {
      const data = await searchFood(query);
      setResults(data || []);
    } catch (e) {
      console.log("Search error:", e);
    }
  };

  const handleAddMeal = (item) => {
    addMeal(item);
    updateMacros({
      calories: state.macros.calories + item.calories,
      protein: state.macros.protein + (item.protein || 0),
      carbs: state.macros.carbs + (item.carbs || 0),
      fat: state.macros.fat + (item.fat || 0),
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fade, transform: [{ translateY: slide }] },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Text style={styles.title}>Nutrition Planner</Text>
        <Text style={styles.subtitle}>Find meals and track your daily diet</Text>

        {/* SEARCH */}
        <FoodSearchBar
          value={query}
          onChange={setQuery}
          onSearch={runSearch}
        />

        {/* FILTERS */}
        <View style={styles.filterRow}>
          <DietFilterChip
            label="Vegan"
            active={state.filters.vegan}
            onPress={() => setFilters({ vegan: !state.filters.vegan })}
          />
          <DietFilterChip
            label="High Protein"
            active={state.filters.highProtein}
            onPress={() =>
              setFilters({ highProtein: !state.filters.highProtein })
            }
          />
          <DietFilterChip
            label="Low Carb"
            active={state.filters.lowCarb}
            onPress={() => setFilters({ lowCarb: !state.filters.lowCarb })}
          />
          <DietFilterChip
            label="Sugar-Free"
            active={state.filters.sugarFree}
            onPress={() => setFilters({ sugarFree: !state.filters.sugarFree })}
          />
        </View>

        {/* MACRO SUMMARY */}
        <MacroSummaryCard macros={state.macros} />

        {/* RESULTS */}
        <Text style={styles.sectionTitle}>Results</Text>
        {results.length === 0 ? (
          <Text style={styles.noResults}>No results yet. Try searching!</Text>
        ) : (
          results.map((item, idx) => (
            <MealResultCard
              key={idx}
              item={item}
              onAdd={() => handleAddMeal(item)}
            />
          ))
        )}
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
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 34,
    fontFamily: "serif",
    color: theme.colors.dark,
    fontWeight: "600",
  },

  subtitle: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  searchInput: {
    fontSize: 16,
    flex: 1,
  },

  searchBtn: {
    color: theme.colors.dark,
    fontWeight: "600",
    marginLeft: 10,
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontFamily: "serif",
    fontWeight: "600",
    color: theme.colors.dark,
    marginBottom: 12,
    marginTop: 10,
  },

  noResults: {
    color: "#777",
    marginTop: 10,
    fontSize: 15,
  },

  mealCard: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mealTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.dark,
  },

  mealCalories: {
    color: "#666",
  },

  mealSubtitle: {
    color: "#AAA",
    fontSize: 12,
    marginTop: 4,
  },

  addBtn: {
    backgroundColor: theme.colors.primaryGreen,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  addBtnText: {
    color: theme.colors.dark,
    fontSize: 20,
    fontWeight: "700",
  },

  macroCard: {
    backgroundColor: "#F3F3F3",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },

  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  macroItem: {
    alignItems: "center",
  },

  macroLabel: {
    fontSize: 14,
    color: "#777",
  },

  macroValue: {
    fontSize: 18,
    color: theme.colors.dark,
    fontWeight: "600",
  },
});
