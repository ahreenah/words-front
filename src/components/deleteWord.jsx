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

import languages from '../utils/languages.json'
let Caption=()=><div className={'login-caption'}>
    Delete a word?
</div>

const ADD_WORD = gql`
    mutation DeleteWord($word:Int, $set:Int){
        dropWord(word:$word, set:$set){
            ok
        }
    }
`


export default function({onClose, wordId, wordSetId, onSuccess}){
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

    
    return <div className={'authWrapper'} ref={wrapperRef} onClick={ClickWrapper} style={{opacity}}>
        <div className={'auth delete-wrapper'} style={ {transition:'1s',transform:`translateY(-${100*(1-opacity)}px)`}}>
            <Caption/>
            {/* <form style={{display:'contents'}} onSubmit={(e)=>{login();e.preventDefault()}} >     */}
            
                {/* <Field placeholder={'password'} value={password} onChange={setPassword} type={'password'}/> */} 
                {/* <div style={{height:24}}>{errorMsg ? 'Incorrect login or password':''}</div> */}
                <div className={'row space-around w-100'}>
                <Button onClick={deleteWord} red={true} text={'YES'}/>
                <Button onClick={closePopup} text={'NO'}/>
                </div>
            {/* </form> */}
        </div>
    </div>
}

