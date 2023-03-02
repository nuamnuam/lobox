import { ChangeEventHandler, useCallback, useRef, useState } from "react";

import DropDownMenu from "@/components/Dropdown";
import StyledInput from "@/components/Input";
import useOutsideClick from "@/hooks/use-out-side-click";
import useWindowEventListener from "@/hooks/use-window-event-listener";
import { MenuItem } from "@/types/global";

import MenuOption from "../Dropdown/DropdownOption";

type InputWithDropdown = {
  options: MenuItem[];
  selected?: MenuItem;
  placeholder?: string;
  onSelect: (itemIndex: number) => void;
  onAdd: (term: string) => void;
};

export default function InputWithDropdown({
  onAdd,
  options,
  selected,
  onSelect,
  placeholder,
}: InputWithDropdown) {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (!event || !event.target.value) {
        setCurrentValue("");

        return;
      }

      setCurrentValue(event.target.value);
    },
    []
  );

  const handleItemClick = useCallback(
    (item: MenuItem) => {
      if (!item || typeof onSelect !== "function" || item.id === selected?.id)
        return;

      onSelect(item.id);

      setCurrentValue(item.name);

      setIsMenuOpen(false);
    },
    [onSelect, selected]
  );

  useWindowEventListener("keyup", (event) => {
    if (
      typeof onAdd !== "function" ||
      !currentValue ||
      !event ||
      !event.key ||
      event.key.toLocaleLowerCase() !== "enter"
    )
      return;

    onAdd(currentValue);
    setCurrentValue("");
  });

  const ref = useRef<HTMLInputElement>(null);

  useOutsideClick(ref, () => setIsMenuOpen(false));

  return (
    <StyledInput
      ref={ref}
      placeholder={placeholder}
      value={currentValue}
      isMenuOpen={isMenuOpen}
      onChange={handleChange}
      onClick={() => {
        if (isMenuOpen) return;

        setIsMenuOpen(true);
      }}
      onIconClick={() => setIsMenuOpen((prev) => !prev)}
    >
      <DropDownMenu
        isOpen={isMenuOpen}
        listItems={options}
        renderItem={(item) => (
          <MenuOption
            key={item.id}
            item={item}
            onClick={handleItemClick}
            isActive={item.id === selected?.id}
          />
        )}
      />
    </StyledInput>
  );
}
