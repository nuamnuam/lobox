import styled from "styled-components";

import { MenuItem } from "@/types/global";

type MenuOption = {
  item: MenuItem;
  isActive: boolean;
  onClick: (item: MenuItem) => void;
};

export default function MenuOption({ item, isActive, onClick }: MenuOption) {
  function handleClick() {
    if (typeof onClick !== "function") return;

    onClick(item);
  }

  return (
    <StyledListItem isActive={isActive} onClick={handleClick}>
      {item.name}
    </StyledListItem>
  );
}

type StyledListItemProps = {
  isActive: boolean;
};

const StyledListItem = styled.li`
  width: 100%;
  padding: 0.5rem;
  list-style: none;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: ${(props: StyledListItemProps) =>
    props.isActive ? "#f2f4ff" : ""};
  color: ${(props: StyledListItemProps) => (props.isActive ? "#749be8" : "")};
  overflow-x: hidden;
  text-overflow: ellipsis;
`;
