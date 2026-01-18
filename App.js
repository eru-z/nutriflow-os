// App.js — NutriFlow OS Entry Point

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/AppNavigation";
import { AppProvider } from "./src/AppContext";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AppProvider>
  );
}
