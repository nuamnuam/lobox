import { useCallback, useState } from "react";

import styled from "styled-components";

import InputWithDropdown from "@/components/InputWithDropdown";

const initialItems = [
  { name: "hello", id: 28394423 },
  { name: "Science", id: 9742347 },
  { name: "Yay", id: 9737538 },
];

export default function Main() {
  const [items, setItems] = useState(initialItems);
  const [activeItem, setActiveItem] = useState<(typeof items)[0]>();

  const createItem = useCallback((term: string) => {
    if (!term) return;

    const newItem = { name: term, id: Math.ceil(Math.random() * 100) };

    setItems((prev) => {
      return [newItem, ...prev];
    });
  }, []);

  const selectItem = useCallback(
    (selectedItemId: number) => {
      if (!selectedItemId) return;

      const item = items.find((item) => item.id === selectedItemId);

      setActiveItem(item);
    },
    [items, setActiveItem]
  );

  return (
    <RootContainer>
      <InputWithDropdown
        placeholder="type somthing..."
        options={items}
        onAdd={createItem}
        selected={activeItem}
        onSelect={selectItem}
      />
    </RootContainer>
  );
}

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10%;
  align-items: center;
  justify-content: stretch;
  background-color: gray;
`;
