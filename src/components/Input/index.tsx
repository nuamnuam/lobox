import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from "react";

import styled from "styled-components";

type inputProps = {
  value: string;
  children: ReactNode;
  isMenuOpen: boolean;
  placeholder?: string;
  onClick: MouseEventHandler;
  onIconClick: MouseEventHandler;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default forwardRef(Input);

function Input(
  {
    value,
    children,
    onClick,
    onChange,
    onIconClick,
    isMenuOpen,
    placeholder,
    ...props
  }: inputProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Container ref={ref}>
      <StyledInput
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        {...props}
      />
      <IconAccessability onClick={onIconClick}>
        <InputIcon isActive={isMenuOpen} />
      </IconAccessability>
      {children}
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex: 1;
  min-width: 15rem;
  max-width: 30rem;
  position: relative;
  height: fit-content;
  align-items: center;
  justify-content: right;
`;

const StyledInput = styled.input`
  all: unset;
  width: 100%;
  cursor: text;
  height: 1.5rem;
  border: 1px solid skyblue;
  border-radius: 0.75rem;
  padding: 0.25rem 2rem 0.25rem 0.5rem;
  background-color: white;
`;

type inputIconProps = {
  isActive: boolean;
};

const InputIcon = styled.div`
  width: 1.5rem;
  height: 0.5rem;
  background-image: url("/src/assets/chevronSprite.svg");
  background-repeat: no-repeat;
  background-size: 120%;
  background-position: 50%
    ${(props: inputIconProps) => (props.isActive ? "20%" : "85%")};
  transition: background-position 0.5s ease;
`;

const IconAccessability = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  padding: 0.5rem 0.25rem;
`;
