import React, { useState } from 'react';
import { render } from 'react-dom';
import { FormWrapper, Wrapper } from './components/styled-compopents';
import './assets/scss/styles.scss';
import { LangContext, Lang } from './Context/LangContext';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header/Header';

const root = document.getElementById('root');

function Main() {
  const [lang, setLang] = useState(Lang.UA);

  return (
    <Wrapper id="wrapper">
      <LangContext.Provider value={{ lang, setLang }} >
        <FormWrapper>
          <form className="form">
            <Header />
            <label>Регистрация</label>
            <input type="email" placeholder="емейл" />
            <input type="password" placeholder="пароль" />
            <input type="password" placeholder="повторить пароль" />
            <button type="button" className="btn btn--green">Создать аккаунт</button>
          </form>
        </FormWrapper>
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
