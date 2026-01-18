// src/AppContext.js — Global State Management

import React, { createContext, useReducer, useContext } from "react";

const AppContext = createContext();

const initialState = {
  user: {
    name: "Erudita",
    avatar: null,
  },

  meals: [],

  filters: {
    glutenFree: false,
    keto: false,
    detox: false,
    highProtein: false,
  },

  macros: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },

  workoutStats: {
    caloriesBurned: 0,
    steps: 0,
    heartRate: 0,
  },
};

// ---------------------
// Reducer
// ---------------------
function reducer(state, action) {
  switch (action.type) {
    case "ADD_MEAL":
      return {
        ...state,
        meals: [...state.meals, action.payload],
      };

    case "REMOVE_MEAL":
      return {
        ...state,
        meals: state.meals.filter((m) => m.id !== action.payload),
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case "UPDATE_MACROS":
      return {
        ...state,
        macros: { ...state.macros, ...action.payload },
      };

    case "UPDATE_WORKOUT_STATS":
      return {
        ...state,
        workoutStats: { ...state.workoutStats, ...action.payload },
      };

    default:
      return state;
  }
}

// ---------------------
// Provider
// ---------------------
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMeal = (meal) => dispatch({ type: "ADD_MEAL", payload: meal });
  const removeMeal = (id) => dispatch({ type: "REMOVE_MEAL", payload: id });
  const setFilters = (data) => dispatch({ type: "SET_FILTERS", payload: data });
  const updateMacros = (data) =>
    dispatch({ type: "UPDATE_MACROS", payload: data });

  const updateWorkoutStats = (data) =>
    dispatch({ type: "UPDATE_WORKOUT_STATS", payload: data });

  return (
    <AppContext.Provider
      value={{
        state,
        addMeal,
        removeMeal,
        setFilters,
        updateMacros,
        updateWorkoutStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
