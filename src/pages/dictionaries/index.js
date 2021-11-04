import React, { useEffect, useState } from "react";
import Popup from '../../components/createWordSet'
import AddWord from "../../components/addWord";
import DeleteWord from "../../components/deleteWord";
import ChooseTraining from "../../components/chooseTraining";
import Grid, {Col} from '../../baseComponents/Grid.jsx'
import DeleteWordSet from "../../components/deleteWordSet";
import DictionariesList from "./dictionariesList";
import Message from "./Message";
import Words from "./Words";
import WordSetHeader from './wordSetHeader'
import {
    useQuery,
    gql
  } from "@apollo/client";
 

const WORD_SET_LIST = gql`
    query WordSets{
        wordSets{
            name
            language
            id
        }
    }
`



export default function Dictionaries(){
    const { loading, error, data, refetch } = useQuery(WORD_SET_LIST);
    let [wordSets,setWordSets] = useState([])
    let [wordSet, setWordSet] = useState(-1)
    let [deletingWord,setDeletingWord]=useState(0)
    let [words,setWords] = useState([])
    //stats
    let trainStatsList = words.map(function (word){
        let fields=Object.keys(word.trainings).filter(i=>!i.startsWith('_'));
        let totalSum = 0;
        let maxSum=0;
        for (let i of fields){
            console.log(i, word.trainings[i])
            totalSum+=word.trainings[i];
            maxSum+=3;
        }
        return {...word,train:maxSum==totalSum?'ok':totalSum==0?'pending':'inProgress'}
    });
    let stats={leanded : trainStatsList.filter(i=>i.train=='ok').length, inProrgess : trainStatsList.filter(i=>i.train=='inProgress').length, pending : trainStatsList.filter(i=>i.train=='pending').length};


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
                        pairs
                    }
                }
            }
        }
    `
    const { loadingWords, errorWords, dataWords, refetch:refetchWords } = useQuery(WORD_SET, {
        variables: { id:wordSet },
    });
        
    useEffect (()=>{
        if(!loading){
            console.log('loading changed',loading,error,data)
            if(data)
            setWordSets(data.wordSets)
        }
    },[loading])    
    let [refetchWordsFlag,setRefetchWordsFlag] = useState(0)
    useEffect(async ()=>{
        if(wordSet>=0){
            let res = await refetchWords({wordSetId:wordSet});
            setWords(res.data.wordSet.wordsList)
        }
        console.log(dataWords)
    },[wordSet, refetchWordsFlag])
    let [addingWordSet,addWordSet] = useState(false);
    let [addingWord,addWord ] = useState(false);
    let [choosingTraining, setChoosingTraning]=useState(false);
    let [deletingWordSet, setDeletingWordSet]=useState(false);
    let [search, setSearch] = useState('')

    let closePopup = (withoutReload=false)=>{
        setTimeout(async ()=>{
            addWordSet(false);
            addWord(false);
            setChoosingTraning(false);
            setDeletingWord(false);
            setDeletingWordSet(false);
            if(!withoutReload)
                setRefetchWordsFlag(i=>i+1);
        },1000)
    }

    return (<>
        {addingWordSet && <Popup onClose={res=>{
            alert(res.data.createWordSet.wordSet.name);
            setWordSets([...wordSets,{
                name:res.data.createWordSet.wordSet.name, 
                id:res.data.createWordSet.wordSet.id
            }])
            closePopup();
        }}/>}
        {choosingTraining && <ChooseTraining onClose={closePopup} wordSet={wordSet} />}
        {!!deletingWord && 
            <DeleteWord 
                onClose={closePopup} 
                wordId={deletingWord} 
                wordSetId={wordSet} 
                onSuccess={()=>{}}/>
        }
        {!!deletingWordSet && 
            <DeleteWordSet 
                onClose={()=>closePopup(true)} 
                wordSetId={deletingWordSet} 
                onSuccess={()=>{}}/>
        }
        {addingWord && <AddWord onClose={closePopup} wordSetId={wordSet} onAdd={refetchWords}/>}

        {/* <div className="row-fluid"> */}
        <Grid>
            <Col span={4}>
                <DictionariesList {...{wordSets,addWordSet, setWordSet, setDeletingWordSet}}/>
            </Col>
            <Col span={8}>
                {wordSet!=-1?
                    <> 
                        <WordSetHeader stats={stats} wordsNum={words.length} onStart={()=>setChoosingTraning(true)} name={wordSets.filter(i=>i.id==wordSet)[0].name} onChangeSearch={(v=>setSearch(v))}/>
                        <Words words={search?words.filter(i=>i.word.toLowerCase().match(search.toLowerCase())):words} {...{addWord, setDeletingWord}}/>
                    </>:
                    <Message>
                        Please select a word set
                    </Message>}
            </Col>
        </Grid>
    </>)
}
