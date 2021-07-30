import Container from '../Container/Container';
import logo from '../../assets/imgs/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <strong className="logo">
          <a href="/">
            <img src={ logo } alt="easyTips"/>
          </a>
        </strong>
      </Container>
    </header>
  );
};

export default Header;
