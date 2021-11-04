import styled from "styled-components"

let StyledInput = styled.input`
&&&{
    width: 284px;
    height: 51px;
    box-shadow: inset 3px -3px 4px rgba(249, 249, 249, 0.5), inset -3px 3px 4px rgba(136, 136, 136, 0.25);
    border:none;
    background-copacity:55%;
    background: ${props => props.correct?'#53B54A78':props.incorrect?'#F63B1178':'#DBDBDB'};
    border: 1px solid #CFCFCF;
    font-family:inherit;
    font-weight:inherit;
    box-sizing: border-box;
    border-radius: 5px;
    font-size:24px;
    padding-left:11px !important;
    color:${props => props.correct? '#131313': props.incorrect? '#ffffff':'#696969'}
}`


export default function Field({value, onChange, type, placeholder, correct, incorrect, onKeyDown}){
    let input = e => onChange(e.target.value)
    // console.
    return (
        <StyledInput placeholder={placeholder}
               value={value} 
               type={type}
               correct={correct}
               incorrect={incorrect}
               onKeyDown={onKeyDown}
            //    style={styles.field}
               onChange={input} 
               className={'inp'}
               />
    )
}
