/* eslint-disable @next/next/no-img-element */
import styles from './dropdown.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface DropdownProps {}

/*
  Props: options, and a random key (to shuffle the colors)
*/
export function Dropdown(props: DropdownProps) {
  const [open, setOpen] = useState(false);
  const { options, key } = props;

  const tagBorders = ['#B5A9FF', '#EB93F4', '#BFF0FF', '#FFA295'];
  const tagBackground = ['#7A65FD', '#DB3FEB', '#76D3EF', '#FE5139'];

  const [chosen, setChosen] = useState([]);
  const [randomKey, setKey] = useState(0);

  // toggle dropdown
  const toggleDropdown = () => {
    setOpen((state) => !state);
  };

  // generate random key - used for shuffling colors in each dropdown
  useEffect(() => {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    console.log('Setting random key', rand);
    setKey(Math.floor(rand));
  }, []);

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
                  backgroundColor: `${
                    tagBackground[(i + randomKey) % tagBackground.length]
                  }`,
                  border: `2px solid ${
                    tagBorders[(i + randomKey) % tagBorders.length]
                  }`,
                  cursor: 'pointer',
                }}
                // delete item from dropdown
                onClick={() => {
                  setChosen((prev) => prev.filter((item) => item !== option));
                }}
                key={i}
              >
                {option.toUpperCase()}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className={styles['button']}
          onClick={toggleDropdown}
          style={{
            backgroundColor: 'rgb(0,0,0,0)',
          }}
        >
          <img
            src="/dropdown.svg"
            alt="dropdown"
            style={{
              width: '25px',
              height: '25px',
            }}
          />
        </button>
      </div>
      {open && (
        // show dropdown options
        <div className={styles['dropdown']}>
          <ul className={styles['ul']}>
            {options.map((option, i) => {
              return (
                <li
                  key={i}
                  className={styles['li']}
                  // add to array of chosen items
                  onClick={() => {
                    if (!chosen.includes(option)) {
                      setChosen((prev) => [...prev, option]);
                    }
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
