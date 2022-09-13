import { h } from 'preact';
import { signal } from "@preact/signals";
import style from './Today.css';
import { getTodayStory, removeTodayStory, Story } from '../services/NewsService';
import { useCallback, useEffect, useState } from 'preact/hooks';
import {getWord, Word} from "../services/WordService";
import WordModal from '../components/WordModal';

const titles = signal([] as string[]);
const descriptions = signal([] as string[]);

export default function Today() {
  const [story, setStory] = useState(null as Optional<Story>);
  const [word, setWord] = useState(null as Optional<Word>)

  const getStory = useCallback(() => {
    getTodayStory("business").then(story => {
      setStory(story);
      titles.value = story.title.split(" ");
      descriptions.value = story.description.split(" ");
    });
  }, []);

  useEffect(() => {
    getStory();
  }, []);

  async function click(word: string) {
    setWord(await getWord(word));
  }

  function refresh() {
    removeTodayStory();
    getStory();
  }

  return (
    <div class={style.today}>
      <h1>
        {titles.value.map(it => 
        <span class={style.word} onClick={() => click(it)}>
          {it}
        </span>)}
      </h1>
      <p>
        {descriptions.value.map(it => 
        <span class={style.word} onClick={() => click(it)}>
          {it}
        </span>)}
      </p>
      <footer>
        {story?.link && <a class="btn sm" href={story?.link} target="new">Go to story</a>}
        <button class="sm" onClick={refresh}>New story</button>
      </footer>
      
      {word && <WordModal word={word!} onClose={() => setWord(null)} />}
    </div>
  )
};
