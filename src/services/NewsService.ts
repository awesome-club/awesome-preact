import { env } from "../env";

export interface Story {
  title: string;
  link: string;
  description: string;
  content: string;
}

export interface StoryResponse {
  status: string;
  totalResults: number;
  results: Story[];
}

export async function getTodayStory(category: string): Promise<Story> {
  const tag = getTodayTag();
  const existing = getStorageStory(tag);
  if (existing) {
    return existing;
  }

  const call = await fetch(
    `${env.NewsDataUrl}?apikey=${env.NewsDataKey}&country=us&category=${category}&language=en`,
  );
  const result = await call.json() as StoryResponse;

  setStorageStory(tag, result.results[0]);
  return result.results[0];
}

function getTodayTag() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function removeTodayStory() {
  window.localStorage.removeItem(`story-${getTodayTag()}`);
}

function getStorageStory(tag: string): Optional<Story> {
  const element = window.localStorage.getItem(`story-${tag}`);
  return element ? JSON.parse(element) : null;
}

function setStorageStory(tag: string, story: Story) {
  window.localStorage.setItem(`story-${tag}`, JSON.stringify(story));
}
