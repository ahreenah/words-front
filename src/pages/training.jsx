import { useParams } from "react-router";
import Styled from "styled-components";
import {gql, useQuery, useMutation} from '@apollo/client'
import { useEffect, useState } from "react";
import Field from '../baseComponents/field';
import Next from '../assets/images/next.svg';
import TrainingStats from '../components/trainingStats'
import Spelling from './trainings/spelling.jsx'
import ChooseSpelling from './trainings/chooseSpelling'
import Pairs from './trainings/pairs'
import Spinner from '../baseComponents/spinner'

let Wpapper = Styled.div`
display:flex;
flex-direction:column;
align-items:center;
border:none;
min-width:300px;
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


const WORD_SET = gql`
        query WordSetQuery($id:Int){
            wordSet(id:$id){
                language
                wordsList{
                    word
                    translation
                    id
                    trainings{
                        spelling
                        chooseSpelling
                        chooseTranslation
                        
                    }
                }
            }
        }`

const SAVE_MUT = gql`
    mutation SaveTrainingResults($list:[TrainWordResult],$training:Int){
        saveTrainingResults(training:$training, list:$list){
            ok
            message
        }
    }
`


export default function Training1(){
    let {setId, trainingType} = useParams();
    let [passed,setPassed] = useState([]);
    let words;
    let [res,setRes] = useState([]);
    // alert(trainingType)
    let trainingId;
    if(trainingType=='pairs') trainingId=4
    if(trainingType=='spelling') trainingId=1;
    if(trainingType=='chooseSpelling') trainingId=2;
    if(trainingType=='chooseTranslation') trainingId=3;
    // let trainingId=trainingType=='spelling'?1:'chooseSpelling'?8:'chooseTranslation'?3:4;
    let {loading, data, refetch} = useQuery(WORD_SET,{variables:{id:JSON.parse(setId)}});
    const [requestSave,{loading:loadingSave, error:errorSave, data:dataSave}] = useMutation(SAVE_MUT,{
        variables:{
            list:passed.map(i=>i.word).map(i=>({
                word:i.id,
                training:trainingId,
                result:i.correct
            })),
            training:trainingId,
        }
    })
    useEffect(()=>{
        refetch()
        // setTimeout(setSa)
    },[setId])

    words=data?.wordSet?.wordsList
        .map(i=>({...i,correct:false}))
        .sort((a,b)=>a.trainings[trainingType]-b.trainings[trainingType])
        .filter((i,num)=>num<5);
        console.log('processed words:',words)
    let [w,sw] = useState([])
    let [wordNum,setWordNum]=useState(0)
    let [userInput,setUserInput]=useState('')
    let [correct,setCorrect]=useState(0)
    let [tim,setTim]=useState(null);
    
    async function checkAnswer(correct){
        if(tim)return;
        // let correct = userInput.toUpperCase()==words[wordNum].word.toUpperCase();
        words[wordNum].correct = correct;
        // setWords(words);
        await setPassed(v=>[...v,{word:words[wordNum],correct}])
        // alert(correct);
        
        setRes ( words.map(i=>({
                word:i.id,
                training:1,
                result:i.correct
            })),);
        // sw(words);
        if(correct){
            setCorrect(1)
        }
        else{
            setCorrect(2)
        }
        setTim(setTimeout(()=>{
            setCorrect(0)
            setWordNum(wordNum+1);
            setUserInput('');
            setTim(null)
        },1500))
        console.log(wordNum,words.length)
        if(words.length==wordNum+1){
            console.log('send',passed.map(i=>({
                word:i.id,
                training:1,
                result:i.correct
            })))
            console.log('pas',passed)
           
        }
    }

    useEffect(()=>{
        console.log('passed changed',passed)
        /* TODO: uncomment */
        if(passed.length==words?.length)
            requestSave();
    },[passed])

    function endPairs(data){
        setPassed(data)
        setWordNum(1000)
    }

    let Components = {
        get(){return 'trainingType'}
    }
    // let t = 
    if(words){
        // if(wordNum<words.length)
            return <>
            <Wpapper>
               {wordNum<words.length? <>{/* 
                <div>{words[wordNum].translation}</div>
                <Field value={userInput} correct={correct==1} incorrect={correct==2} onChange={setUserInput}></Field>
                <BackButton src={Next} onClick={()=>{
                    checkAnswer(userInput.toUpperCase()==words[wordNum].word.toUpperCase())
                }} />*/}
                {/* <Components.trainingType /> */}
                {trainingType=='spelling' && <Spelling {...{words,wordNum,correct,checkAnswer, passed}}/>}
                {trainingType=='chooseSpelling' && <ChooseSpelling {...{words,wordNum,correct,checkAnswer, passed}} reversed={true}/>}
                {trainingType=='chooseTranslation' && <ChooseSpelling {...{words,wordNum,correct,checkAnswer, passed}} reversed={false}/>}
                {trainingType=='pairs' && <Pairs {...{words,wordNum,correct,checkAnswer, passed}} onEnd={endPairs} reversed={false}/>}
                </>:<><TrainingStats words={passed}></TrainingStats></>}
            </Wpapper> 
            </>
        // return 
    }
    return <Spinner></Spinner>
}