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
import Button from "../components/button";
import Field from  '../components/field';
import AuthContext from "../context/authContext";
import styled from "styled-components";

import languages from '../utils/languages.json'
let Caption=()=><div className={'login-caption'}>
    Add a new word
</div>

let SaveButton = styled.button`
outline: none;
height: 51px;
color: white;
background: #11A9FF;
box-shadow: inset 4px -4px 4px rgba(0,0,0,0.25), inset -5px 5px 4px rgba(255,255,255,0.25);
border-radius: 5px;
border: none;
width: 100%;
font-size: 20px;`

const ADD_WORD = gql`
    mutation AddWord($word:String,$translation:String,$setId:Int){
        addWord(word:$word, translation:$translation, setId:$setId){
            ok
        }
    }
`


export default function({onClose, wordSetId, onAdd}){
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
    const [requestAddWord,{loading, error, data}] = useMutation(ADD_WORD,{
        variables:{
            word:spelling,
            translation,
            setId:wordSetId
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

    let create = async ()=>{
        if(!spelling)
            return
        if(!translation)
            return
        let res = await requestAddWord();
        console.log(res,error,data);
        if(!error){
            closePopup();
            onAdd()
        }
    }

    
    return <div className={'authWrapper'} ref={wrapperRef} onClick={ClickWrapper} style={{opacity}}>
        <div className={'auth'} style={ {transition:'1s',transform:`translateY(-${100*(1-opacity)}px)`}}>
            <Caption/>
            {/* <form style={{display:'contents'}} onSubmit={(e)=>{login();e.preventDefault()}} >     */}
                <Field placeholder={'spelling'} value={spelling} onChange={setSpelling}/>
                <Field placeholder={'translation'} value={translation} onChange={setTranslation}/>
                <SaveButton class="btn" style={{outline:'none'}} onClick={create}>Save</SaveButton>
                {/* <Field placeholder={'password'} value={password} onChange={setPassword} type={'password'}/> */} 
                {/* <div style={{height:24}}>{errorMsg ? 'Incorrect login or password':''}</div> */}
                {/* <Button onClick={login} text={'login'}/> */}
            {/* </form> */}
        </div>
    </div>
}

