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

const AUTH_REQUEST = gql`
    mutation Login($login:String,$password:String){
        login(login:$login, password:$password){
            ok
            token
            message
        }
    }
    
`

let Caption=()=><div className={'login-caption'}>
    Welcome
</div>


export default function({onClose}){
    let [opacity, setOpacity]=useState(0);

    useEffect(()=>{
        setOpacity(1)
        console.log('shown')
        return ()=>{
            console.log('hidden')
        }
    },[])
    let auth = useContext(AuthContext)
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [errorMsg,setErrorMsg] = useState('');
    const [requestLogin,{loading, error, data}] = useMutation(AUTH_REQUEST,{
        variables:{
            login:username,
            password:password,
        }
    })
    let login=async ()=>{
        let res = await requestLogin();
        console.log(res);
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

    let wrapperRef = useRef(null)

    function ClickWrapper(e){
        if(e.target===wrapperRef.current){
            setOpacity(0)
            onClose()
        }
    }
    
    return <div className={'authWrapper'} ref={wrapperRef} onClick={ClickWrapper} style={{opacity}}>
        <div className={'auth'} style={ {transition:'1s',transform:`translateY(-${100*(1-opacity)}px)`}}>
            <Caption/>
            <form style={{display:'contents'}} onSubmit={(e)=>{login();e.preventDefault()}} >    
                <Field placeholder={'email or login'} value={username} onChange={setUsername}/>
                <Field placeholder={'password'} value={password} onChange={setPassword} type={'password'}/>
                <div style={{height:24}}>{errorMsg ? 'Incorrect login or password':''}</div>
                <Button onClick={login} text={'login'}/>
            </form>
        </div>
    </div>
}

