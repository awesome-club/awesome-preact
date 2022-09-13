import { createContext } from "preact";
import { Word } from "./services/WordService";

export enum Mode {
  Light,
  Dark,
}

export interface ContextType {
  mode: Mode;
  words: Word[];
  setMode: (mode: Mode) => void;
  setWords: (words: Word[]) => void;
}

export const AppContext = createContext<ContextType>({
  mode: Mode.Light,
  words: [],
  setMode: () => {},
  setWords: () => {},
});
