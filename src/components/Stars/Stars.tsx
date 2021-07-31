import { useState } from 'react';

interface IProps {
  type?: string;
  handleClick?: any;
  isInput?: boolean;
}

const Stars = ({ 
  type = 'stroked',
  handleClick = null,
  isInput = false
}: IProps) => {
  const [index, setIndex] = useState<number | null>(null);
  const [starActive, setStarActive] = useState<boolean>(false);
  const arr: Array<number> = [1, 2, 3, 4, 5];

  const setActive = (i: number) => {
    if (starActive && index === i) {
      setStarActive(false);
      setIndex(null);
      handleClick(null);

    } else {
      setStarActive(true);
      setIndex(i);
      handleClick(i);
    }
  }

  return (
    <ul className={`stars ${ type === 'filled' ? 'stars--filled' : '' }`} >
      { arr && arr.map(i => {
        return <li key={ i } className={`${starActive && index === i ? 'active' : ''}`} onClick={() => setActive(i)}>&nbsp;</li>;
      }) }
    </ul>
  );
};

export default Stars;
