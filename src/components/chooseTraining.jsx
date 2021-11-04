import react,{
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import '../index.css'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql
  } from "@apollo/client";
import trainings from "../utils/trainings";
import {useHistory } from 'react-router-dom';
import Button from "../components/button";
import Field from  '../components/field';
import AuthContext from "../context/authContext";
import Styled from "styled-components";
import languages from '../utils/languages.json'
let Splitter = Styled.div`
    width: 100%;
    height: 1px;
    left: 20px;
    top: 178px;

    background: #DBDBDB;
    box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.25);
`
let StartButton = Styled.button`
    width: 61px;
    height: 24px;
    border:none;
    color:white;
    background: linear-gradient(180deg, #04DB04 0%, #00CD00 100%);
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.25), inset 0px -2px 4px rgba(0, 0, 0, 0.25), inset 0px 3px 3px rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    transition:.5s;
    outline:none;
    &:hover{
        // display:none;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25), inset 0px -2px 4px rgba(0, 0, 0, 0.25), inset 0px 3px 3px rgba(255, 255, 255, 0.25);
    }
    &:active{
        // display:none;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25), inset 0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px -3px 3px rgba(255, 255, 255, 0.25);
    }
`
let TrainingItem = ({name, wordSet, link})=>{
    let history = useHistory();
    return(
        <div style={{width:'100%', marginBottom:0,}}>
            <div style={{display:'flex',marginBottom:0,flexDiretion:'row',alignItems:'center', justifyContent:'space-between'}}>
                <div>
                    {name}
                </div>
                <StartButton onClick={()=>{
                    console.log('dsdfs')
                    history.push(`/training/${wordSet}/${link}`)
                }}>start</StartButton>
            </div>
            <Splitter/>
        </div>
    )
}
let Caption=()=><div className={'login-caption'} style={{marginBottom:30}}>
    Choose training
</div>

const ADD_WORD = gql`
    mutation DeleteWord($word:Int, $set:Int){
        dropWord(word:$word, set:$set){
            ok
        }
    }
`


export default function({onClose, wordId, wordSetId, onSuccess, wordSet}){
    let history = useHistory()
    let [opacity, setOpacity]=useState(0);

    useEffect(()=>{
        setOpacity(1)
        console.log('shown')
        return ()=>{
            console.log('hidden')
        }
    },[])
    let [spelling,setSpelling] = useState('')
    let [translation, setTranslation]=useState('')
    let [open,setOpen] = useState(false)
    
    let auth = useContext(AuthContext)
    const [requestRemoveWord,{loading, error, data}] = useMutation(ADD_WORD,{
        variables:{
            word:wordId,
            set:wordSetId
        }
    })

    let wrapperRef = useRef(null)

    let closePopup=(name)=>{
        setOpacity(0)
        onClose()
    }

    function ClickWrapper(e){
        if(e.target===wrapperRef.current){
            closePopup()
        }
    }

    let deleteWord = async ()=>{
        let res = await requestRemoveWord();
        console.log(res,error,data);
        if(!error){
            closePopup();
            onSuccess()
        }
    }

    // const trainings=[
    //     {
    //         name:'Spelling',
    //         id:1,
    //     },
    //     {
    //         name:'Choose spelling',
    //         id:2,
    //     },
    //     {
    //         name:'Choose translation',
    //         id:3,
    //     },
    //     {
    //         name:'Make pairs',
    //         id:4
    //     }
    // ]
    
    return <div className={'authWrapper'} ref={wrapperRef} onClick={ClickWrapper} style={{opacity}}>
        <div className={'auth delete-wrapper'} style={ {transition:'1s',transform:`translateY(-${100*(1-opacity)}px)`}}>
            <Caption/>
            {/* <Splitter/>*/}
            {trainings.map(i=><TrainingItem name={i.name} link={i.id} {...{wordSet}}/> )}
            {/* <TrainingItem name={'Spelling'} link={'spelling'} {...{wordSet}}/> 
            <TrainingItem name={'Choose spelling'} {...{wordSet}}/> 
            <TrainingItem name={'Choose Translation'} {...{wordSet}}/> 
            <TrainingItem name={'Pairs'} {...{wordSet}}/>  */}
            {/* <form style={{display:'contents'}} onSubmit={(e)=>{login();e.preventDefault()}} >     */}
            
                {/* <Field placeholder={'password'} value={password} onChange={setPassword} type={'password'}/> */} 
                {/* <div style={{height:24}}>{errorMsg ? 'Incorrect login or password':''}</div> */}
            {/* </form> */}
        </div>
    </div>
}

