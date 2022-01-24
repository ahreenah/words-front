import {useState, useRef, useEffect} from 'react'
import Field from '../../baseComponents/field';
import Message from './Message'
import { useImperativeHandle } from 'react';
import { Row } from '../../baseComponents/Flex';

export default function AddInline({onAdd}){
    let [word,setWord]=useState('');
    let [translation, setTranslation]=useState('');
   
    let w = useRef(null);
    let t = useRef(null);
    let handleKey=(event)=>{
        console.log('onK')
        if(event.key === 'Enter'){
            console.log('onE')
            // alert(word,translation)
            // w.focus();
            console.log('w',w)
            // setTimeout(()=>w.current.focus(),10)
            onAdd(word,translation)
            setWord('');
            setTranslation('')
          }
    }
    useEffect(()=>setTimeout(()=>{ if(w && word.length==0) {console.log('w:',w?.current?.focus());}},10) , [translation])
    return <Message>
        {/* <form onSubmit={()=>{setWord('')}}> */}
            <Row gap={10}>
                <Field value={word} onChange={setWord} ref={w} key='a' placeholder={'spelling'}/>
                <Field value={translation} onChange={setTranslation} onKeyPress={handleKey} ref={t} placeholder={'translation'}/>
            </Row>
            <div>press tab to switch field and Enter to save word</div>
        {/* </form> */}
    </Message>
} 