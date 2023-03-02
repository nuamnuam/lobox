import { ReactNode } from "react";

import styled from "styled-components";

type DropDownMenuProps<T> = {
  listItems: T[];
  isOpen: boolean;
  renderItem: (item: T) => ReactNode;
};

export default function DropDownMenu<TProps>({
  isOpen = false,
  listItems,
  renderItem,
}: DropDownMenuProps<TProps>) {
  return (
    <DropDownList isOpen={isOpen}>{listItems.map(renderItem)}</DropDownList>
  );
}

type DropDownListProps = {
  isOpen: boolean;
};

const DropDownList = styled.ul`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  max-height: 10rem;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 0.75rem;
  background-color: white;
  transform-origin: 50% 0;
  transform: ${(props: DropDownListProps) =>
    props.isOpen ? "scaleY(1)" : "scaleY(0)"};
  opacity: ${(props: DropDownListProps) => (props.isOpen ? "1" : "0")};
  transition: transform 0.5s, opacity 0.3s ease;

  & > * {
    transition: transform 0.5s;
    transform: ${(props: DropDownListProps) =>
      props.isOpen ? "scaleY(1)" : "scaleY(2.4)"};
  }
`;
