import {useState} from 'react';
import Faqs from '~/components/Faqs';
import {faqs} from '~/data/faqs';

export default function FaqExemple() {
  const [currentSearch, setCurrentSearch] = useState('');

  function onSearchInput(e) {
    setCurrentSearch(e.target.value);
  }

  return (
    <div className="flex justify-center font-custom">
      <div className="grid max-w-[950px] w-full">
        <div className="flex gap-3 items-center">
          <label htmlFor="search">Recherche</label>
          <input name="search" className="w-full" onInput={onSearchInput} />
        </div>
        <Faqs items={faqs} currentSearch={currentSearch} />
      </div>
    </div>
  );
}
