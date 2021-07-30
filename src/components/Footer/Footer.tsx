import { getUserLang } from '../../Context/LangContext';
import Container from "../Container/Container";
import visa from '../../assets/imgs/visa.png';
import mCard from '../../assets/imgs/master_card.png';

const Footer = () => {
  const locale = getUserLang();
  
  return (
   <footer className="footer">
      <Container>
          <div className="footer__imgs">
            <img src={ visa } alt="visa"/>
            <img src={ mCard } alt="master card"/>
          </div>
          <p>&copy; 2021-2022 <a href="/">Easytips.</a> { locale.arrayLang.allRightsReserved }</p>
      </Container>
   </footer>
  );
};

export default Footer;
