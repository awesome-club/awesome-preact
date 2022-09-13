import { h,  } from 'preact';
import { Link } from 'preact-router/match';
import { AppContext, Mode } from '../context';
import style from './Header.css';
import MoonIcn from './icons/MoonIcn';
import { useContext } from 'preact/hooks';
import SunIcn from './icons/SunIcn';

export default function Header() {
  const context = useContext(AppContext);

  function changeThemeMode() {
    context.setMode(context.mode === Mode.Light ? Mode.Dark : Mode.Light);
    document.body.classList.toggle("dark");
  }

  return (
    <header class={style.header}>
      <Link class="btn" activeClassName={style.active} href="/words">
        {context.words.length || ""} words 
      </Link>
      
      <button onClick={changeThemeMode}>
        {context.mode === Mode.Light ? <SunIcn /> : <MoonIcn />}
      </button>
    </header>
  )
}