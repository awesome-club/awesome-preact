import { env } from "../env";

interface WordResponse {
  entries: Word[];
}

interface Pronunciation {
  transcription: string;
  notation: string;
  audio: {
    url: string;
    sourceUrl: string;
  };
}

interface Sense {
  definition: string;
  usageExample: string;
}

interface Lexeme {
  partOfSpeech: string;
  senses: Sense[];
}

export interface Word {
  entry: string;
  pronunciations: Pronunciation[];
  lexemes: Lexeme[];
}

function sanitize(word: string) {
  return word.trim().toLowerCase().replace(/[^a-z]/gi, "");
}

export async function getWord(word: string): Promise<Word> {
  const call = await fetch(
    `${env.LinguaRobotUrl}/${sanitize(word)}`,
    {
      headers: {
        "X-RapidAPI-Key": env.LinguaRobotKey,
        "X-RapidAPI-Host": "lingua-robot.p.rapidapi.com",
      },
    },
  );
  const resp = await call.json() as WordResponse;
  return resp.entries[0];
}
