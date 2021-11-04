
import './lib/bootstrap/css/bootstrap.min.css'
// import './lib/bootstrap/js/bootstrap.min.js'
import logo from './logo.svg';
import './App.css';
import { setContext } from '@apollo/client/link/context';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink
} from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {useCallback, useContext, useState} from 'react';
import Auth from './pages/auth';
import Index from './pages/index';
import Header from './components/Header';
import AuthContext from './context/authContext';
import Dictionaries from './pages/dictionaries';
import Trainings from './pages/Trainings';
import Spelling from './pages/training';
import trainings from './utils/trainings' 

console.log(ApolloClient)



//--------------------------------------------------
// apollo client
//--------------------------------------------------
// const client = new ApolloClient({
//   uri: 'http://localhost:8000/graphql',
//   cache: new InMemoryCache()
// });


const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


//--------------------------------------------------
// main app
//--------------------------------------------------
function App() {
  // let auth = useContext(AuthContext)
  let [token,_setToken] = useState(localStorage.token)
  function closeLogin(){    
   
    setTimeout(()=>setIsAuth(false),1000)
  }
  function setToken(v){
    if(v){
      localStorage.setItem('token',v)
      closeLogin()
    }
    else
      localStorage.removeItem('token')
    _setToken(v)
  }
  let authData = {
    token,setToken
  }

  let [isAuth, setIsAuth] = useState(false)

  return (
    <ApolloProvider client={client}>  
      <AuthContext.Provider value={{authData}}>
        
        {isAuth &&<Auth onClose={closeLogin}></Auth>}
        <div className="App container">
          <Router>
            <Header onLogin={()=>setIsAuth(true)}/>
            <Switch>
              <Route path='/dictionaries'>
                <Dictionaries/>
              </Route>
              <Route path='/training/'>
                {/* {trainings.map(i=>(
                  <Route path={`/training/:setId/${i.id}`}>
                    <i.component/>
                  </Route>
                ))} */}
                
                <Route path={`/training/:setId/:trainingType`}>
                    <Spelling/>
                  </Route>
                {/* <Route path='/training/:setId/1'>
                  <Spelling/>
                </Route>
                <Route path='/training/:setId/pairs'>
                  pairs
                </Route>
                <Route path='/training/:setId/choose-spelling'>
                  choose Spelling
                </Route>
                <Route path='/training/:setId/choose-translation'>
                  choose translation
                </Route> */}
                <Route exact path='/training'>
                  <Trainings/>
                </Route>
              </Route>
              <Route path='/'>
                <Index  onLogin={()=>setIsAuth(true)}/>
              </Route>
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
