import {useEffect, useState} from 'react';
import {RiStarLine, RiStarFill} from 'react-icons/ri';

export default function Rating({defaultValue = 3}) {
  const btnRatings = [];
  const [currentRating, setCurrentRating] = useState(defaultValue);

  useEffect(() => {
    setCurrentRating(localStorage.getItem('rating') ?? defaultValue);
  }, [defaultValue]);

  for (let i = 1; i <= 5; i++) {
    btnRatings.push(
      <button
        key={i}
        onClick={() => {
          setCurrentRating(i);
          localStorage.setItem('rating', i);
        }}
        className="text-black"
      >
        {i <= parseInt(currentRating) ? (
          <RiStarFill size="20px" />
        ) : (
          <RiStarLine size="20px" />
        )}
      </button>,
    );
  }
  return <div className="flex items-center gap-1">{btnRatings}</div>;
}
