import React, { useState } from 'react';
import { render } from 'react-dom';
import { Wrapper } from './components/styled-compopents';
import App from './App';
import './assets/scss/styles.scss';
import { LangContext, Lang } from './Context/LangContext';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');

function Main() {
  const [lang, setLang] = useState(Lang.UNKNOWN);

  return (
    <Wrapper id="wrapper">
      <LangContext.Provider value={{ lang, setLang }} >
        <App />
      </LangContext.Provider>
    </Wrapper>
  )
}

render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>, root
);

reportWebVitals();
