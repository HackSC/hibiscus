import React, { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<unknown>;

function Button(props: Props) {
  return (
    <button
      {...props}
      style={{
        background: 'black',
        padding: 5,
        color: 'white',
        ...props.style,
      }}
    >
      {props.children}
    </button>
  );
}

export default Button;
