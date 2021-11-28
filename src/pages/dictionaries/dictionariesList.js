import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Words from './Words';
import Spinner from '../../baseComponents/spinner'
let Li = styled.div`
display:flex;
align-items:center;
@media(min-width:871px){
    max-height:unset !important;
}
a{
    display:block;
    padding:5px;
    flex-grow:1;
    @media(max-width:870px){
        background:#606060;
        text-decoration:none;
        color:white !important;
        // line-height:20px
        box-shadow: inset 2px -2px 6px -1px #010101, inset -2px 2px 5px -1px #ffffff;
        border-radius:5px;
        padding:9px;
        margin-bottom:5px;
    }
}
i{
    opacity:0;
    transform:translateX(10px);
    transition:.1s;
    @media(max-width:870px){
        display:none;
    }
}
:hover i{
      opacity:.6;
      transform:translateX(0);
}

`

export default function({wordSets,addWordSet, setWordSet, setDeletingWordSet, loaded}){
    // let mobile = window.innerWidth<870;
    let [maxHeight,setMaxHeight] = useState(22)
    useEffect(() => {
        if(Words.length)
        setMaxHeight(wordSets.length*90)
    }, [wordSets]);
    return <div className="well dictionaries" style={{overflow:'hidden', transition:'all 0.6s ease 0s'}}  onClick={()=>{ setMaxHeight(maxHeight?0:90)}}>
        <div className="nav nav-list"  style={{overflow:'hidden'}}> 
            <li className="nav-header">Dictionaries</li>
            {[...wordSets].map(i=><Li onClick={()=>{setWordSet(i.id)}}  style={{maxHeight:maxHeight?70:0, transition:'.5s', overflow:'hidden'}}>
                <a>{i.name}</a>
                <i className="icon-remove" onClick={()=>{
                            setDeletingWordSet(i.id);
                        }}></i>
            </Li>)}
            {!loaded && <Spinner/>}
            <li className="divider"></li>
            <li onClick={()=>{addWordSet(true)}}>
                <a>Create new...</a>
            </li>
        </div>
    </div>
}