import FaqItem from './FaqItem';
import {useState} from 'react';

export default function Faqs({items, currentSearch}) {
  const [currentFaqId, setCurrentFaqId] = useState(0);

  function onFaqClick(faqId) {
    setCurrentFaqId(faqId === currentFaqId ? 0 : faqId);
  }

  console.log(currentSearch);

  return (
    <div className="">
      <div className="grid gap-3">
        {items
          .filter((faq) => {
            if (!currentSearch) {
              return true;
            }

            return faq.question.includes(currentSearch);
          })
          .map((faq) => (
            <FaqItem
              key={faq.id}
              {...faq}
              isOpen={faq.id === currentFaqId}
              onClick={onFaqClick}
            />
          ))}
      </div>
    </div>
  );
}
