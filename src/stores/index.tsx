import { createContext } from "react";
import { MainStore } from "./mainStore";

export const rootStoreContext = createContext({
  mainStore: new MainStore()
});
