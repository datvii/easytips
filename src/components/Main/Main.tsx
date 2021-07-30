/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useLang, getUserLang } from '../../Context/LangContext';
import { useState, useEffect, useRef } from "react";
import Stars from "../Stars/Stars";
import Testimonials from "../Testimonials/Testimonials";
import aPay from '../../assets/imgs/apple_pay.png';
import gPay from '../../assets/imgs/google_pay.png';
import visa from '../../assets/imgs/visa.png';
import mCard from '../../assets/imgs/master_card.png';
import photo from '../../assets/imgs/hero.jpg';
import Container from "../Container/Container";

enum Phone {
  ios = 'ios',
  android = 'android' 
}

enum Card {
  card = 'visa/master_card'
}

type PhoneT = {
  type: Phone
}

type CardT = {
  type: Card
}

const Main = () => {
  const { lang, setLang } = useLang();
  const inputRef = useRef<any>();
  const [index, setIndex] = useState<number | string | null>(null);
  const [inpVal, setInpVal] = useState<string | number>('');
  const [device, setDevice] = useState<string>('');
  const [stars, setStars] = useState<boolean>(false);
  const [precheck, setPrecheck] = useState<boolean>(false);
  const [star, setStar] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [percentActive, setPercentActive] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(true);
  const [valid, setValid] = useState<boolean | null>(true);
  const arrPercents: Array<string> = ['7', '10', '15', '20'];
  const arrMoney: Array<string> = ['20', '50', '70', '100'];
  let locale = getUserLang();

  useEffect(() => {
    getDevice();
    console.log(locale)
    console.log('re-render', device);
    setPrecheck(true);
  }, [device, locale]);

  const onChangeHandler = (e: {
    preventDefault: () => void;
    target: { value: string; };
  }): void => {
      let el = e.target.value.replace(/[^0-9.]/g, '');

      setInpVal(el);
      isValid(el.length);
      
      if (!inpVal) {
        setPercentActive(false);
        setInpVal(el);
      }

      console.log(
        valid,
        inpVal, 
        'onChangeHandler'
      );
  }

  const onClickHandler = (e: { 
    preventDefault: () => void;
    target: any;
  }, i: number): void => {
    e.preventDefault();

    const prct = e.target.getAttribute('data-percent'),
      tips = e.target.getAttribute('data-tips'),
      res = getPercent(543, prct);

    isValid(inputRef && inputRef.current.value);
    console.log(tips)
    if (i === index && percentActive) {
      setPercentActive(false);
      setIndex(null);
      setValid(false);
      setInpVal('');
    } else {
      setPercentActive(true);
      setIndex(i);
      precheck ? setInpVal(res) : setInpVal(!!tips ? tips : '');
    }

    console.log(
      inpVal,
      'onClickHandler'
    );
  }

  const getPercent = (cash: number = 0, percent: number = 0): number => {
    if (!cash && !percent) return 0;
    
    const res = parseInt((cash / 100 * percent).toString());

    return res;
  }

  const isValid = (len: number): void => {
    len <= 0 ? setValid(false) : setValid(true);
  }

  const sendData = (key: string | undefined): void => {
    const url = '/article/fetch/post/user';

    let data = {
      star,
      tips: inpVal.toString().trim(),
      comment,
      device: key === 'device' ? device : false,
      card: key === 'card' ? Card.card : false,
    };

    console.table(data);
    // axios.post(url, {
    //   title: 'Title of post',
    //   body: JSON.stringify(data)
    // }).then(response => console.log(response.data))
    // .catch(error => console.log(error));
  }

  const payViaPhone = (type: PhoneT): void => {
    console.log('pay via phone', type);
    // device === 'ios' ? 'ios' : 'android';
    sendData('device');
  }

  const payViaCard = (type: CardT): void => {
    // body function
    console.log('pay via card', type);
    sendData('card');
  }

  const payment = (e:any, type: any): void => {
    e.preventDefault();
    console.log(type, checked)
    if (!checked && !inpVal) return;

    type === 'visa' ? payViaCard(type) : payViaPhone(type);
  }

  const getDevice = (): void => {
    const navigator = window.navigator.userAgent;
    
    if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator) ) {
      setDevice(Phone.android);
    } else if (/iPhone|iPad|Mac|Macintosh|iPod/i.test(navigator)) {
      setDevice(Phone.ios);
    } else {
      setDevice('unknown');
    }
  }

  const isChecked = (): void => {
    setChecked(checked => !checked);
  }

  const handleClickStars = (index: number): void => {
    let res = index === 5 ? 1
      : index === 4 ? 2
      : index === 2 ? 4
      : index === 1 ? 5
      : 3;

    setStar(res);
    console.log(index, res)
    index ? setStars(true) : setStars(false);
  }

  const typeComment = (e: { target: { value: React.SetStateAction<string>; }; }): void => {
    setComment(e.target.value);
  }

  return (
    <main className="main">
      <div className="evaluation">
        <Container>
          <div className="evaluation__info">
            <img src={ photo } alt="photo" />
            <strong>Артем</strong>
          </div>
          <div className="evaluation__money">
            <p>{ locale.arrayLang.sum } <b className="evaluation__cash">543</b> <b>{ locale.arrayLang.currency }</b></p>
              <input 
                type="text"
                name='tips'
                className={`${ !valid ? 'error' : '' }`} 
                ref={ inputRef } 
                value={ inpVal }
                placeholder={ locale.arrayLang.typeSumOfTips }
                onChange={onChangeHandler}
              />
              <div className="fake-input">{ inpVal && <span>{ inpVal }</span> }{ inpVal && locale.arrayLang.currency }</div>
          </div>
          { precheck 
            ? <div className="evaluation__number">
              { !!arrPercents && arrPercents.map((el: string, i: number) => {
                  return <a 
                    key={ i } 
                    href="#" 
                    className={`${ percentActive && i === index ? 'active' : '' }`} 
                    data-percent={ el } 
                    onClick={(e) => onClickHandler(e, i)}>{ el }%</a>
              }) }
            </div> 
            :
            <div className="evaluation__number">
              { !!arrMoney && arrMoney.map((el: string, i: number) => {
                  return <a 
                    key={ i } 
                    href="#"
                    data-tips={ el }
                    className={`evaluation__number__money ${ percentActive && i === index ? 'active' : '' }`}
                    onClick={(e) => onClickHandler(e, i)}>{ el }&nbsp;<span>{ locale.arrayLang.currency }</span></a>
              }) }
            </div>
          }
          <div className="evaluation__rating">
            <span>{ locale.arrayLang.evaluateWaitress }</span>
            <Stars type="filled" handleClick={ handleClickStars } isInput={ true } />
          </div>
          { <input type="text" onChange={ typeComment } className={ stars ? 'active' : '' } placeholder={ locale.arrayLang.leaveComment } /> }
          <div className={`evaluation__btns ${ !checked || !inpVal ? 'inactive' : '' }`}>
            <a href="/" onClick={(e) => payment(e, device) } className="btn btn--white">{ locale.arrayLang.pay } {device === 'ios' ? <img src={ aPay } alt="apple pay"/> : <img src={ gPay } alt="google pay"/>}</a>
            <a href="/" onClick={(e)=> payment(e, 'visa') } className="btn btn--white">{ locale.arrayLang.pay } <img src={ visa } alt="visa"/><img src={ mCard } alt="master card"/></a>
          </div>
          <div className="evaluation__agreement">
            <input id="agreement" onClick={ isChecked } defaultChecked={ true } type="checkbox" />
            <span className="fake-input"></span>
            <label htmlFor="agreement">{ locale.arrayLang.conditionAgree } <a href="#">{ locale.arrayLang.userAgree }</a> { locale.arrayLang.and } <a href="#">{ locale.arrayLang.dataPolitics }</a></label>
          </div>
        </Container>
      </div>
      <Testimonials />
    </main>
  );
};

export default Main;
