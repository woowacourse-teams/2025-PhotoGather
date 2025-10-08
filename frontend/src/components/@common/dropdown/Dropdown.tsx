import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import * as S from './Dropdown.styles';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

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

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <S.Wrapper ref={dropdownRef}>
      <S.DropdownButton onClick={handleToggle} isOpen={isOpen}>
        {selectedOption ? selectedOption.label : placeholder}
        <S.ArrowIcon isOpen={isOpen}>
          <MdKeyboardArrowDown size={20} />
        </S.ArrowIcon>
      </S.DropdownButton>
      {isOpen && (
        <S.DropdownMenu>
          {options.map((option) => (
            <S.DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              isSelected={option.value === value}
            >
              {option.label}
            </S.DropdownItem>
          ))}
        </S.DropdownMenu>
      )}
    </S.Wrapper>
  );
};

export default Dropdown;
