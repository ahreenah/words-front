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
import Field from  '../baseComponents/field';
import AuthContext from "../context/authContext";

import languages from '../utils/languages.json'
let Caption=()=><div className={'login-caption'}>
    Create a new set
</div>

const CREATE_WORD_SET = gql`
    mutation CreateWordSet($name:String,$language:String){
        createWordSet(name:$name, language:$language){
            status
            message
            wordSet{
                id
                name
            }
        }
    }
`


export default function({onClose, lang}){
    let [opacity, setOpacity]=useState(0);

    useEffect(()=>{
        setOpacity(1)
        console.log('shown')
        return ()=>{
            console.log('hidden')
        }
    },[])
    let [name,setName] = useState('')
    let [language, setLanguage]=useState(lang??'')
    let [open,setOpen] = useState(false)
    
    let auth = useContext(AuthContext)
    const [requestCreate,{loading, error, data}] = useMutation(CREATE_WORD_SET,{
        variables:{
            language,
            name,
        }
    })
    // let login=async ()=>{
    //     let res = await requestLogin();
    //     console.log(res);
    //     if(res.data.login.ok){
    //         setErrorMsg('')
    //         setOpacity(0)
    //         auth.authData.setToken(res.data.login.token)            
    //     }else{
    //         setErrorMsg('Incorrect login or password')
    //     }
        
    // }

    let wrapperRef = useRef(null)

    let closePopup=(data)=>{
        setOpacity(0)
        onClose(data)
    }

    function ClickWrapper(e){
        if(e.target===wrapperRef.current){
            closePopup()
        }
    }

    let create = async ()=>{
        if(!name)
            return
        if(!language)
            return
        let res = await requestCreate();
        console.log(res,error,data);

        if(!error){
            closePopup(res)
        }
    }

    
    return <div className={'authWrapper'} ref={wrapperRef} onClick={ClickWrapper} style={{opacity}}>
        <div className={'auth'} style={ {transition:'1s',transform:`translateY(-${100*(1-opacity)}px)`}}>
            <Caption/>
            {/* <form style={{display:'contents'}} onSubmit={(e)=>{login();e.preventDefault()}} >     */}
                <Field placeholder={'name'} value={name} onChange={setName}/>
                <div className={"btn-group" +(open?' open':'')} style={{width:'100%', display:'flex'}}>
                    <div>
                        {languages[language]?languages[language].nativeName:'select a language'}
                    </div>
                    <button className="btn" style={{flexGrow:1, opacity:0}}></button>
                    <button className="btn dropdown-toggle" style={{    background: 'none',    border: 'none', outline:'none'}} data-toggle="dropdown" onClick={()=>{console.log('a');setOpen(i=>!i)}}>
                        <span className="caret"></span>
                    </button>
                    <ul className={"dropdown-menu w-100"} style={{background:'white', maxHeight:199,'overflow-y':'scroll'}}>
                        {Object.keys(languages).map(i=><li style={{marginBottom:0}} onClick={()=>{setOpen(false);setLanguage(i)}}><a style={{margin:0}}>{languages[i].nativeName}</a></li>)}
                    </ul>
                </div>
                <button class="btn" style={{outline:'none'}} onClick={create}>Save</button>
                {/* <Field placeholder={'password'} value={password} onChange={setPassword} type={'password'}/> */} 
                {/* <div style={{height:24}}>{errorMsg ? 'Incorrect login or password':''}</div> */}
                {/* <Button onClick={login} text={'login'}/> */}
            {/* </form> */}
        </div>
    </div>
}

