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
import WordSetHeader from './wordSetHeader';
import Styled from 'styled-components';
import {Min,Max} from  '../../baseComponents/Width';
import AddInline from "./addInline";
import Spinner from "../../baseComponents/spinner";
import {
    useQuery,
    useMutation,
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

const ADD_WORD = gql`
    mutation AddWord($word:String,$translation:String,$setId:Int){
        addWord(word:$word, translation:$translation, setId:$setId){
            ok
        }
    }
`


export default function Dictionaries(){
    const { loading, error, data, refetch } = useQuery(WORD_SET_LIST);
    let [wordSets,setWordSets] = useState([])
    let [loaded, setLoaded] = useState(true);
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
            setLoadedWordSets(true);
        }
    },[loading])    
    let [refetchWordsFlag,setRefetchWordsFlag] = useState(0)
    useEffect(async ()=>{
        setLoaded(false);
        setWords([]);
        if(wordSet>=0){
            let res = await refetchWords({wordSetId:wordSet});
            setWords(res.data.wordSet.wordsList)
            setLoaded(true);
        }
        console.log(dataWords)
    },[wordSet, refetchWordsFlag])
    let [addingWordSet,addWordSet] = useState(false);
    let [addingWord,addWord ] = useState(false);
    let [choosingTraining, setChoosingTraning]=useState(false); 
    let [deletingWordSet, setDeletingWordSet]=useState(false);
    let [search, setSearch] = useState('')
    let [multiAdd, setMultiAdd] = useState(false)
    let [loadedWordSets, setLoadedWordSets] = useState(false);
    let lastWordSet = wordSets.length?wordSets[wordSets.length-1]:null

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

    let List =  ()=><DictionariesList {...{wordSets,addWordSet, setWordSet, setDeletingWordSet, loaded:loadedWordSets}}/>

    let Sb=Styled.button`height: 51px;
    color: white;
    background: #11A9FF;
    box-shadow: inset 4px -4px 4px rgba(0,0,0,0.25), inset -5px 5px 4px rgba(255,255,255,0.25);
    border-radius: 5px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    border:none;
    margin-top:10px;
    width:100%;
    align-items: center;
    padding-left: 20px;
    font-size: 18px;
    margin-bottom:10px;`

    let [addWordData,setAddWordData] = useState({})

    const [requestAddWord,{loadingAdd, errorAdd, dataAdd}] = useMutation(ADD_WORD,{
        variables:{
            word:addWordData.spelling,
            translation:addWordData.translation,
            setId:wordSet
        }
    })


    let WordsC = ()=> wordSet!=-1?
    <> 
        <div style={{position:"sticky", top:59, zIndex:2, background:"#f2f2f2"}}>
            <WordSetHeader 
                stats={stats} 
                wordsNum={words.length} 
                onStart={()=>setChoosingTraning(true)} 
                name={wordSets.filter(i=>i.id==wordSet)[0].name} 
                search={search}
                onChangeSearch={(v=>setSearch(v))}/>
            {multiAdd ?<AddInline onAdd={async (spelling,translation)=>{
                // alert(spelling,translation)
                await setAddWordData({spelling,translation});
                addWordData={spelling,translation}
                setTimeout(async ()=>{
                    // alert(JSON.stringify(addWordData))
                    // setWords([]);
                    let res = await requestAddWord();
                    if(res.data.addWord.ok){
                        let res = await refetchWords({wordSetId:wordSet});
                        setWords(res.data.wordSet.wordsList)
                    }
                    console.log(spelling, translation,)
                },100)
            }}/>:<Sb onClick={()=>{setMultiAdd(true)}}>Add words</Sb>}
        </div>
        <Words words={search?words.filter(i=>i.word.toLowerCase().match(search.toLowerCase())):words} {...{addWord, setDeletingWord}}/>
       
        {!loaded && <Spinner key='loader'></Spinner>}
    </>:
    <Message>
        Please select a word set
    </Message>



    return (<>
        {addingWordSet && 
            <Popup 
                onClose={res=>{
                    if(res)
                    setWordSets([...wordSets,{
                        name:res.data.createWordSet.wordSet.name, 
                        id:res.data.createWordSet.wordSet.id
                    }])
                    closePopup();
                }}
                lang={lastWordSet?.language}
            />}
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
                onSuccess={async ()=>{await setWordSet(-1); await setWordSets(lst=>lst.filter(i=>i.id!=deletingWordSet))}}/>
        }
        {addingWord && <AddWord onClose={closePopup} wordSetId={wordSet} onAdd={refetchWords}/>}

        {/* <div className="row-fluid"> */}
        <Min width={871}>
            <Grid>
                <Col span={4} style={{position:'sticky', top:68}}>
                    <List/>
                    {/* <DictionariesList {...{wordSets,addWordSet, setWordSet, setDeletingWordSet}}/> */}
                </Col>
                <Col span={8}>
                    <WordsC/>
                    {/* {wordSet!=-1?
                        <> 
                            <WordSetHeader stats={stats} wordsNum={words.length} onStart={()=>setChoosingTraning(true)} name={wordSets.filter(i=>i.id==wordSet)[0].name} onChangeSearch={(v=>setSearch(v))}/>
                            <Words words={search?words.filter(i=>i.word.toLowerCase().match(search.toLowerCase())):words} {...{addWord, setDeletingWord}}/>
                        </>:
                        <Message>
                            Please select a word set
                        </Message>} */}
                </Col>
            </Grid>
        </Min>
        <Max width={870}>
            <List/>
        {/* <DictionariesList {...{wordSets,addWordSet, setWordSet, setDeletingWordSet}}/> */}
        <WordsC/>
        {/* {wordSet!=-1?
                    <> 
                        <WordSetHeader stats={stats} wordsNum={words.length} onStart={()=>setChoosingTraning(true)} name={wordSets.filter(i=>i.id==wordSet)[0].name} onChangeSearch={(v=>setSearch(v))}/>
                        <Words words={search?words.filter(i=>i.word.toLowerCase().match(search.toLowerCase())):words} {...{addWord, setDeletingWord}}/>
                    </>:
                    <Message>
                        Please select a word set
                    </Message>} */}
        </Max>
    </>)
}
