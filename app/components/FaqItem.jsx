import {SlArrowDown} from 'react-icons/sl';

export default function FaqItem({
  id,
  question,
  answer,
  isOpen = false,
  onClick = () => {},
}) {
  return (
    <div className="grid gap-3">
      <button
        onClick={() => onClick(id)}
        className="flex justify-between border-b border-gray-400 items-center py-3 gap-3"
      >
        <h2 className="text-neon-cyan font-custom">{question}</h2>
        <SlArrowDown
          className={`${isOpen ? 'rotate-180' : ''} transition-all`}
        />
      </button>

      <span className={`${isOpen ? 'inline' : 'hidden'}`}>{answer}</span>
    </div>
  );
}
