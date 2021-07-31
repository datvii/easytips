import { useLang, getUserLang } from '../../Context/LangContext';
import Container from '../Container/Container';
import logo from '../../assets/imgs/logo.svg';

const Header = () => {
  const getLang = getUserLang();
  const { lang, setLang } = useLang();
  const changeLang = (e: any) => {
    console.log(e.target.value, lang);
    setLang(e.target.value);
  }
  console.log(getLang);
  
  return (
    <header className="header">
      <Container>
        <strong className="logo">
          <a href="/">
            <img src={ logo } alt="easyTips"/>
          </a>
        </strong>
        <select className="header__lang" onChange={ changeLang }>
          <option value="UA">ua</option>
          <option value="RU">ru</option>
          <option value="EN">en</option>
        </select>
      </Container>
    </header>
  );
};

export default Header;
