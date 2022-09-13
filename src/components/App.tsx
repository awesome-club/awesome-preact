import { h } from 'preact';
import { Route, Router } from 'preact-router';
import Header from './Header';
import Today from '../routes/Today';
import Words from '../routes/Words';
import { AppContext, Mode } from '../context';
import { useState } from 'preact/hooks';
import { Word } from '../services/WordService';

export default function App() {
  const [mode, setMode] = useState(Mode.Dark as Mode);
  const [words, setWords] = useState(JSON.parse(window.localStorage.getItem("words") || "[]") as Word[])

  return (
    <AppContext.Provider value={{mode, setMode, words, setWords}}>
      <div id="app">
        <Header />
        <Router>
            <Route path="/" component={Today} />
            <Route path="/words" component={Words} />
        </Router>
      </div>
    </AppContext.Provider>
  );
}