import React, {useState} from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(1);

  return (
    <div>
      <span>{counter}</span>
      <button
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
