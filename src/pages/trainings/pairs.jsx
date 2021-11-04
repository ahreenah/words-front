import Styled from "styled-components";
import { useEffect, useState } from "react";
import Grid, {Col} from '../../baseComponents/Grid'
import ShadowBlock from '../../components/shadowBlock.jsx'

let Variant = Styled(ShadowBlock)`
background: ${props =>
    props.isCorrect?'#02CA02':
    props.isIncorrect?'linear-gradient(180deg, #FA370C 0%, #CC2500 100%)':
    '#DBDBDB'};
${props=>props.selected && 'filter:drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));'}
color: ${props=>props.isCorrect||props.isIncorrect?'white':'#8B8A8A'} !important;
`

export default function Pairs({words,onEnd, passed, reversed}){
    let [selectedWord, setSelectedWord] = useState(-1);
    let [selectedTranslation, setSelectedTranslation] = useState(-1);

    async function checkPair(){
        if(selectedWord!=-1 && selectedTranslation!=-1){
            setSelectedWord(-1);
            setSelectedTranslation(-1);
            let res = left[selectedWord].id==right[selectedTranslation].id
            if(res){
                left = left.map((i,n)=>n==selectedWord?({...i,correct:res}):i )
                await setLeft(left.map((i,n)=>n==selectedWord?({...i,correct:res}):i ))
                right = right.map((i,n)=>n==selectedTranslation?({...i,correct:res}):i );
                await setRight(right.map((i,n)=>n==selectedTranslation?({...i,correct:res}):i ))
            }
            else{
                await setLeft(left.map((i,n)=>n==selectedWord?({...i,incorrect:true}):i ))
                await setRight(right.map((i,n)=>n==selectedTranslation?({...i,incorrect:true}):i ))
            }
            console.log('res',res)
            let end = true;
            for(let num in left){
                let  i = left[num];
                if(!i.correct && !i.incorrect && num!=selectedWord)
                    end = false;
            }
            console.log('before timeout',left.map(i=>({word:i,correct:i.correct})) )
            if(end){
                setTimeout(()=>{
                    onEnd(left.map(i=>({word:i,correct:i.correct})))
                },1500);
            }
        }
    }


    async function selectWord(num){
        if(!left[num].correct && !left[num].incorrect)
        setSelectedWord(num);
    }

    async function selectTranslation(num){
        if(!right[num].correct && !right[num].incorrect)
        setSelectedTranslation(num)
    }
    useEffect(checkPair,[selectedWord,selectedTranslation]);
    let [left,setLeft] = useState([])
    let [right, setRight]=useState([]);

    useEffect(()=>{
        setLeft([...words].sort(()=>Math.random()-0.5))
        setRight([...words].sort(()=>Math.random()-0.5))
    },[passed])

    
    return <>
        <div>Make pairs</div>
        <Grid>
            <Col span={6}>
                {[...left].map((i,num)=>(
                    <Variant isCorrect={i.correct} isIncorrect={i.incorrect} selected={selectedWord==num} onClick={()=>selectWord(num)}>{i.spelling}{i.word}</Variant>
                ))}
            </Col>
            <Col span={6}>
                {right.map((i,num)=>(
                    <Variant isCorrect={i.correct} isIncorrect={i.incorrect} selected={selectedTranslation==num} onClick={()=>selectTranslation(num)}>{i.spelling}{i.translation}</Variant>
                ))}
            </Col>
        </Grid>
    </>
}