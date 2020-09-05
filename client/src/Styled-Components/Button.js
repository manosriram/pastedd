import styled from "styled-components"

const Button = styled.button`
    width: auto;
    padding: 0 5px 0 5px;
    height: 3vh;
    color: blue;
    background: lightblue;
    border-radius: 0px;
    font-size: 15px;
    text-decoration: none;
    outline: none;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export default Button;
