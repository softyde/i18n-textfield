import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const languages = ["de", "en", "fr"] as const;
export type LanguageType = (typeof languages)[number];

export type LabelType = {
  // WOoOooaAH! Typescript Magic!
  [index in LanguageType]: string;
};

interface LanguageState {
  current: LanguageType;
  subMenu: string | null;
}

export interface LanguageItemState {
  selected: LanguageType;
  values: Map<LanguageType, string>;
}

const initialState: LanguageState = {
  current: "en",
  subMenu: null,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.current = action.payload;
    },
    setSubMenu: (state, action: PayloadAction<string | null>) => {
      state.subMenu = action.payload;
    },
  },
});

export const { setLanguage, setSubMenu } = languageSlice.actions;

export const currentLanguage = (state: RootState) => state.language.current;
export const currentSubmenu = (state: RootState) => state.language.subMenu;

export default languageSlice.reducer;
