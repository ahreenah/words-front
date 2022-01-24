import Styled from "styled-components";
import { useEffect, useState } from "react";
import Field from '../../baseComponents/field';
import Next from '../../assets/images/next.svg';

let Wpapper = Styled.div`
display:flex;
flex-direction:column;
align-items:center;
border:none;
margin:auto;
box-shadow: 0px -1px 2px #CDCDCD, inset 5px -5px 40px -3px rgba(71, 69, 69, 0.3), inset -3px 4px 40px rgba(255, 255, 255, 0.8), 0px 4px 4px rgba(0, 0, 0, 0.25);
// filter:drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
width:fit-content;
padding:40px;
font-family:Roboto;
font-weight:200;
border-radius:20px;
div{
    font-size:40px;
    color:#535353;
}
>*{
    margin-bottom:20px;
}`

let BackButton = Styled.img`
`



export default function Spelling({words,wordNum,correct,checkAnswer, passed}){
    let [userInput,setUserInput]=useState('')
    let [correctAnswer, setCorrectAnswer] = useState('')
    function checkAnswerCb(){
        checkAnswer(userInput.toUpperCase()==words[wordNum].word.toUpperCase());
        setCorrectAnswer(words[wordNum].word);
        setTimeout(()=>{
            setUserInput('');
            setCorrectAnswer('');
        },1500)
    }
    return <>
        <div>{words[wordNum].translation}</div>
        <div style={{height:30}}>{correctAnswer}</div>
        <Field 
            value={userInput} 
            correct={correct==1} 
            incorrect={correct==2} 
            onChange={setUserInput}
            
            onKeyPress={e=>{
                console.log(3);
                if(e.key=='Enter'){
                    checkAnswerCb()
                }
                console.log(e)
            }}></Field>
        <BackButton src={Next} onClick={checkAnswerCb} />
    </>
}