import Styled from "styled-components";
import { useEffect, useState } from "react";
import ShadowBlock from '../../components/shadowBlock'

let Variant = Styled(ShadowBlock)`
width:100%;
background: ${props => props.selected?
    props.isCorrect?'#02CA02':'linear-gradient(180deg, #FA370C 0%, #CC2500 100%)':'#DBDBDB'};
color: ${props=>props.selected?'white':'#8B8A8A'} !important;
:hover {
    filter: drop-shadow(-4px 4px 4px rgba(0, 0, 0, 0.25));
}
`

export default function ChooseSpelling({words,wordNum,checkAnswer, reversed}){
    let [selected, setSelected] = useState(-1)
    let [variants, setVariants] = useState(
        words.map(i=>({
            spelling:reversed?i.word:i.translation, correct:false
        })),
    )
    
    function check(v,num){
        checkAnswer(v.correct);
        setSelected(num)
    }
    useEffect(()=>{
        setVariants (variants.sort((a,b)=>Math.random()>0.5?1:-1))
        setSelected(-1)
        // alert(words[wordNum].translation)
        setVariants(variants.map(i=>({...i,correct:i.spelling==words[wordNum][reversed?'word':'translation']})))
    },[wordNum])
    return <>
        <div>{reversed?words[wordNum].translation:words[wordNum].word}</div>
        {variants.map((i,num)=>(
            <Variant isCorrect={i.correct} selected={selected==num} onClick={()=>check(i, num)}>{i.spelling}{reversed?i.translation:i.word}</Variant>
        ))}
    </>
}