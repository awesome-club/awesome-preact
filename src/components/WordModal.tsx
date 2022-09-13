import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Word } from '../services/WordService';
import style from './WordModal.css';
import { AppContext } from '../context';
import { useContext } from 'preact/hooks';

interface WordModalProps {
  word: Word;
  onClose: () => void;
}

export default function WordModal({word, onClose}: WordModalProps) {
  const [audioSrc, setAudioSrc] = useState(null as Optional<string>);

  const context = useContext(AppContext);

  useEffect(() => {
    if (!word) return;
    const found = word.pronunciations.find(it => !!it.audio);
    setAudioSrc(found?.audio.url ?? null);
  }, [word]);

  function save() {
    const words = [...context.words, {
      entry: word.entry,
      lexemes: word.lexemes
    } as Word]

    context.setWords(words);
    window.localStorage.setItem("words", JSON.stringify(words));
    onClose();
  }

  return (
    <div class={style.wrap}>
      <div class={style.cover} onClick={onClose} />
      <div class={style.modal}>
        <header>
          <h2>{word.entry}</h2>

          <button onClick={save}>save</button>
        </header>

        {audioSrc && <audio controls>
          <source src={audioSrc!} />
        </audio>}

        <ul>
          {word.lexemes.map(it => it.senses.map(sense => 
            <li>
              <h5><span>{it.partOfSpeech}</span>{sense.definition}</h5>
              <h6>{sense.usageExample}</h6> 
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}