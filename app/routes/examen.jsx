import {useEffect, useState} from 'react';
import Lights from '~/components/Lights';

export default function Examen() {
  const [colors, setColors] = useState(null);
  const [savedColors, setSavedColors] = useState(null);

  function onColorChange(index) {
    colors[index] >= 2
      ? (colors[index] = 0)
      : (colors[index] = colors[index] + 1);

    setColors([...colors]);
  }

  function reset() {
    setColors([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  function save() {
    setSavedColors([...colors]);
    localStorage.setItem('pattern', JSON.stringify(colors));
  }

  useEffect(() => {
    const pattern = localStorage.getItem('pattern');

    if (pattern) {
      const colors = JSON.parse(localStorage.getItem('pattern'));
      setColors(colors);
      setSavedColors(colors);
    } else {
      setColors([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }, []);

  return (
    <div className="flex justify-center gap-[10rem]">
      <div className="grid justify-center">
        <div className="flex justify-center gap-3">
          <button className="p-3" onClick={save}>
            Save
          </button>
          <button className="p-3" onClick={reset}>
            Reset
          </button>
        </div>

        {colors && <Lights colors={colors} onColorChange={onColorChange} />}
      </div>
      <div className="grid gap-3 h-fit justify-items-center p-3">
        <h3>Saved Patterns</h3>
        {savedColors && <Lights colors={savedColors} isThumbnail={true} />}
      </div>
    </div>
  );
}
