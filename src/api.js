// src/api.js — Backend API Calls

const BASE_URL = "http://192.168.100.75:5001";

async function apiRequest(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) throw new Error("API request failed");
    return await response.json();
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
}

// ---------------------
// Foods
// ---------------------
export const searchFood = (query) =>
  apiRequest(`/food/search?query=${encodeURIComponent(query)}`);

export const getMeals = () => apiRequest("/meals");
export const addMeal = (meal) => apiRequest("/meals", "POST", meal);

// ---------------------
// User
// ---------------------
export const getUser = () => apiRequest("/user");
export const updateUser = (data) => apiRequest("/user", "PUT", data);

// ---------------------
// Workouts
// ---------------------
export const getWorkouts = () => apiRequest("/workouts");
export const logWorkout = (data) => apiRequest("/workouts/log", "POST", data);
