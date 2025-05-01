import { useState, useEffect, useRef } from 'react';
// import styles from './vertical-dropdown.module.css';

interface Option {
  id: number;
  label: string;
  selected?: boolean;
}

export default function VerticalDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<Option[]>([
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
    { id: 4, label: 'Option 4' },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.selected);
  const displayText = selectedOption ? selectedOption.label : 'Vertical';

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (selectedId: number) => {
    setOptions(
      options.map((option) => ({
        ...option,
        selected: option.id === selectedId,
      }))
    );
  };

  return (
    <div className="relative w-[200px]" ref={dropdownRef}>
      <button
        className={`h-9 w-full px-4 py-3 flex items-center cursor-pointer ${
          isOpen
            ? 'bg-[#1480DC] text-white border border-black justify-between'
            : 'bg-white text-black gap-4'
        }`}
        onClick={toggleDropdown}
      >
        <span>{displayText}</span>
        <span
          className={`text-xs transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          {/* check mark */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="8"
            viewBox="0 0 15 8"
            fill="none"
          >
            <path
              d="M0.999962 1.12709L7.39782 7.39804L13.6688 1.00017"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-black z-10">
          {options.map((option) => (
            <div
              key={option.id}
              className="h-9 px-4 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-50"
              onClick={() => handleOptionClick(option.id)}
            >
              {option.label}
              {option.selected && <span className="text-black">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
