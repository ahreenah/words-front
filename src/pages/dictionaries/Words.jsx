import Word from "../../components/word"
import styled from 'styled-components'
import NotEnoughWords from './notEnoughWords'
import AddIcon from '../../assets/images/add.svg';

let Add = styled.div`
    height: 51px;
    color:white;
    background: #11A9FF;
    box-shadow: inset 4px -4px 4px rgba(0, 0, 0, 0.25), inset -5px 5px 4px rgba(255, 255, 255, 0.25);
    border-radius: 5px;
    display:flex;
    align-items:center;
    padding-left:20px;
    font-size:18px;
`

export default ({words, addWord, setDeletingWord})=><>
    <div style={{display:'flex',flexDirection:'column-reverse'}}>
        <Add onClick={()=>{addWord(true)}}>
            Add word
            <img style={{marginLeft:'auto',marginRight:20}} src={AddIcon}/>
        </Add>
        {words.map((i,num)=>(<Word key={num} word={i} onDelete={()=>{
            setDeletingWord(i.id)
        }}></Word>))}
    </div>
    {words.length<3&&<NotEnoughWords>
        Trainings are not available for word sets with less than 10 words.    
    </NotEnoughWords>}
</>