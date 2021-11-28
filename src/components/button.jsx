import React from "react";
import styled from "styled-components";


let StyledButton = styled.button`
    width: 114px;
    height: 48px;
    left: 29px;
    top: 264px;
    background: linear-gradient(180deg, #00E000 0%, #00CD00 100%);
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.25), inset 0px -2px 4px rgba(0, 0, 0, 0.25), inset 0px 3px 3px rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    border:none;
    outline:none;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 28px; 
    color: #FFFFFF;
    transition:0.2s;
    :disabled{
        opacity:.5;
    }
    ${props=>props.red?'background: linear-gradient(180deg, #DB2B04 0%, #CD2600 100%);':null};
    :hover{
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0), inset 0px -2px 4px rgba(255, 255, 255, 0.0), inset 0px 3px 3px rgba(0, 0, 0, 0.0);
    }
    :active{
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0), inset 0px -2px 4px rgba(255, 255, 255, 0.25), inset 0px 3px 3px rgba(0, 0, 0, 0.25);
    }
`

export default function Button({onClick,text, red, disabled}){
    return <StyledButton disabled={disabled} onClick={onClick} red={red} text={'login'} value={text}>{text}</StyledButton>
} 

