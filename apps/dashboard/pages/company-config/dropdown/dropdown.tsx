import styles from './dropdown.module.css';
import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import { useState } from 'react';
import Image from 'next/image';
import arrow from './arrow.png';
/* eslint-disable-next-line */
export interface DropdownProps {}

export function Dropdown(props: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([
    'Spring 2024',
    'Fall 2024',
    'Spring 2025',
    'Fall 2025',
    'Spring 2026',
    'Fall 2026',
  ]);
  const tagBorders = ['#B5A9FF', '#EB93F4', '#BFF0FF', '#FFA295'];
  const tagBackground = ['#7A65FD', '#DB3FEB', '#76D3EF', '#FE5139'];

  const [chosen, setChosen] = useState([]);

  // toggle dropdown
  const handleButtonClick = () => {
    setOpen((state) => !state);
  };

  return (
    <div className={styles['container']}>
      <h3>{props.label}</h3>
      <div className={styles['current-collection']}>
        <div className={styles['tags-container']}>
          {chosen.map((option, i) => {
            return (
              <div
                className={styles['tag']}
                style={{
                  backgroundColor: `${tagBackground[i % tagBackground.length]}`,
                  border: `2px solid ${tagBorders[i % tagBorders.length]}`,
                }}
                onClick={() => {
                  setChosen((prev) => prev.filter((item) => item !== option));
                }}
                key={i}
              >
                {option}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className={styles['button']}
          onClick={handleButtonClick}
        >
          <Image src={'/arrow.png'} width={50} height={45} alt="dropdown" />
        </button>
      </div>
      {open && (
        <div className={styles['dropdown']}>
          <ul className={styles['ul']}>
            {options.map((option, i) => {
              return (
                <li
                  key={i}
                  className={styles['li']}
                  onClick={() => {
                    if (!chosen.includes(option)) {
                      setChosen((prev) => [...prev, option]);
                    }
                    console.log(option);
                  }}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;

const Background = styled.div`
  width: 100%;
  height: 50px;
  margin: auto;
  /* padding: 30px; */
  border: 3px solid ${Colors2023.GRAY.MEDIUM};
  background-color: ${Colors2023.GRAY.STANDARD};
`;

const RandomColor = styled.div`
  width: 20px;
  background-color: aliceblue;
`;
