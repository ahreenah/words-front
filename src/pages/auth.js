import react,{
    useContext,
    useEffect,
    useReducer,
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
import { findAllInRenderedTree } from "react-dom/test-utils";
import { DropDown } from "../components/DropDown";

const AUTH_REQUEST = gql`
    mutation Login($login:String,$password:String){
        login(login:$login, password:$password){
            ok
            token
            message
        }
    }
`


const REG_REQUEST = gql`
    mutation Register($login:String,$email:String,$password:String, $pronoun:Int,$name:String){
        register(username:$login, password:$password, email:$email, pronoun:$pronoun,name:$name){
            ok
            token
            message
        }
    }
`

let Caption=({reg, toggleReg})=><div className={'login-caption'}>
    <div>{reg?'Register':'Login'}</div>
    <div className={'switch'} onClick={toggleReg}>or {reg?'login':'register'}</div>
</div>

function validateEmail(email) {
    if(email.length==0)return true;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  


export default function({onClose}){
    let [opacity, setOpacity]=useState(0);
    let [isReg, toggleReg] = useReducer((v)=>{
        return !v;
    },false)
    useEffect(()=>{
        setOpacity(1)
        // console.log('shown')
        return ()=>{
            // console.log('hidden')
        }
    },[])
    let auth = useContext(AuthContext)
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [errorMsg,setErrorMsg] = useState('');
    let [email,setEmail] = useState('')
    let [passwordRepeat, setPasswordRepeat] = useState('');
    let [open, setOpen] = useState(false)
    let [pronoun, setPronoun] = useState('')
    let [name, setName] = useState('')
    const [requestLogin,{loading, error, data}] = useMutation(AUTH_REQUEST,{
        variables:{
            login:username,
            password:password,
        }
    })
    const [requestRegister,{loadingReg, errorReg, dataReg}] = useMutation(REG_REQUEST,{
        variables:{
            login:username,
            password:password,
            pronoun:parseInt(pronoun),
            email,
            name
        }
    })
    let login=async ()=>{
        // alert('in l')
        let res = await requestLogin();
        // console.log(res);
        if(res.data.login.ok){
            setErrorMsg('')
            setOpacity(0)
            auth.authData.setToken(res.data.login.token)
            setTimeout(()=>{
            },1000)
            
        }else{
            setErrorMsg('Incorrect login or password')
        }
        
    }


    let register=async ()=>{
        let res = await requestRegister();
        // console.log(res);
        if(res.data.register.ok){
            setErrorMsg('')
            setOpacity(0)
            auth.authData.setToken(res.data.register.token)
            setTimeout(()=>{
            },1000)
            
        }else{
            let msg = res.data.register.message;
            if(msg=='email exists')
                setErrorMsg('User with this email already exists.')
            else
                setErrorMsg('Incorrect data passed')
        }
        
    }

    function processBtn(){
        if(isReg)
            register()
        else
        login()
    }

    let wrapperRef = useRef(null)

    function ClickWrapper(e){
        if(e.target===wrapperRef.current){
            setOpacity(0)
            onClose()
        }
    }
    // let reg, toggleReg = use
    let pronouns = ['he/him','she/her','they/them','other']
    let openPron=()=>{setOpen(true)};
    let[valid,sv]=useState(false)
    let togglePron = ()=>setOpen(i=>!i)
    let notAllFilled = false;
    ([name,email,username,password,passwordRepeat,pronoun]).map((i,v)=>{
        console.log(i.length,v)
        if (i.length==0) {
            // console.log('0:',i);
            notAllFilled=true
        }
    })
    let match = password==passwordRepeat;
    return <div className={'authWrapper'} ref={wrapperRef} onClick={ClickWrapper} style={{opacity}}>
        <div className={'auth'} style={ {transition:'1s',transform:`translateY(-${100*(1-opacity)}px)`}}>
            <Caption reg={isReg} toggleReg={()=>toggleReg(isReg)} />
            <form style={{display:'contents'}} onSubmit={(e)=>{processBtn();e.preventDefault()}} >    
                {isReg && 
                <Field placeholder={'name'} value={name} onChange={setName} type={'text'}/>}
                <Field check={isReg?validateEmail:null} placeholder={isReg?'email':'email or login'} value={isReg?email:username} onChange={isReg?setEmail:setUsername} onValidChange={sv}/>
                {isReg && <Field placeholder={'login'} value={username} onChange={setUsername}/>}
                {/* v:{JSON.stringify(valid)} */}
                <Field placeholder={'password'} value={password} onChange={setPassword} type={'password'}/>
                {isReg && <DropDown variants={pronouns} value={pronoun} onChange={setPronoun} {...{open, togglePron, setOpen}} /> }
                {isReg && <>
                    <Field placeholder={'repeat password'} value={passwordRepeat} onChange={setPasswordRepeat} type={'password'}/>
                </>}
                <div style={{height:24}}>{errorMsg}</div>
                {isReg&&notAllFilled&&<div>All fields are required</div>}
                {isReg&&!match && <div>Password and password repeat do not match</div>}
                {<Button onClick={processBtn} text={isReg?'register':'login'} disabled={(notAllFilled || !valid) & isReg}/>}
            </form>
        </div>
    </div>
}


