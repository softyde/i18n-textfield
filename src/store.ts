import { configureStore } from '@reduxjs/toolkit'
import languageSlice from './languageSlice'
// ...

const store = configureStore({
  reducer: {
    language: languageSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store