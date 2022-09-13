import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { AppContext } from '../context';
import style from './Words.css';

export default function Words() {
  const context = useContext(AppContext);

  return (
    <ul class={style.list}>
      {context.words.map(it => <li>
        <h2>{it.entry}</h2>
        <h5>{it.lexemes[0].senses[0].definition}</h5>
      </li>)}
    </ul>
  )
}