import { useContext } from "react";
import { rootStoreContext } from "../src/stores";

export const useStores = () => useContext(rootStoreContext);
