import styled from "styled-components"

const Input = styled.input`
  outline: none;
  width: 75%;
  height: 3vh;
  font-size: 15px;
  line-height: 18px;
  color: '#000';
  border-color: '#AAA';
  border-bottom-width: 1.5px;
  border-left-width: 10px;
  margin-bottom: 15px;

  &::placeholder {
      font-size: 15px;
      padding: 5px;
      margin: 5px;
  }
`;

export default Input;
