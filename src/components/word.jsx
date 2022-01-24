import React from "react"
import Styled from "styled-components"
import {gql, useMutation} from '@apollo/client'
let Wrapper=Styled.div`
  display: flex;
  padding:10px;
  border-radius:10px;
  box-shadow: inset 2px -2px 5px rgba(0, 0, 0, 0.25), inset -2px 2px 5px #ffffff;
  justify-content:space-between;
  margin-bottom:10px;
  div{
    display: flex;
    flex-direction: column;
  }
  i{
    transform:translateX(10px);
    opacity:0;
    transition:0.5s;
  }
  filter:drop-shadow(0 0 0 white);
  transition:0.5s;
  :hover {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    i{
      transform:translateX(0px);
      opacity:1;
    }
  }

  background: #EBEBEB;
box-shadow: 0px -1px 2px #CDCDCD, inset 5px -5px 4px -3px rgba(71, 69, 69, 0.3), inset -3px 4px 8px rgba(255, 255, 255, 0.8);
border-radius: 5px;

`

let Stats = Styled.div`
  width:50px;
  height:10px;
  border-radius:5px;
  background:#f0f0f0;
  margin-left:auto;
  margin-right:10px;
  position:relative;
  box-shadow:inset 2px -2px 5px rgba(0, 0, 0, 0.25), inset -2px 2px 5px #ffffff;
  &:hover{
    div{display:block!important}
  }
`

let StatsPopup = Styled.div`
background:#f0f0f0;
padding:20px;
border-radius:10px;
position:absolute;
top:100%;
display:none !important;
z-index:100;
right:0;
    box-shadow: 1px 1px 3px #707070, inset 2px -2px 2px #808080, inset -2px 2px 2px #f0f0f0;
`

const SAVE_MUT = gql`
    mutation SaveTrainingResults($list:[TrainWordResult],$training:Int){
        saveTrainingResults(training:$training, list:$list){
            ok
            message
        }
    }
`

function TrainingStats(data){
  const [requestClear,{loading:loadingSave, error:errorSave, data:dataSave}] = useMutation(SAVE_MUT,{
    variables:{
        list:[1,2,3,4].map(i=>({
            word:data.word.id,
            training:i,
            result:false
        })),
    }
})
  let onClear = data.onClear
  data = data.data;
  // alert(JSON.stringify(data))
  // alert(JSON.stringify(data))
  let list = Object.keys(data).filter(i=>!i.startsWith('_'))
  // alert(data[list[0]])
  let sum = 0;
  for(let i of list){
    // alert(data[i]);
    sum+=data[i];}
  // alert(sum);
  let maxSum = list.length*3;
  return <Stats>
    <div style={{
      width: sum/maxSum*100+'%',
      backgroundColor: 'rgb(0 255 0)',
      /* box-shadow: inset 1px -2px 4px 0px #545151, inset -2px 2px 4px 1px white; */
      borderRadius: 10,
      height: '100%',
      opacity: .5
    }}></div>
    <StatsPopup>
      {list.map(i=>(
        <div>
          {i}:{data[i]}
        </div>)
      )}
      <button className="btn" onClick={()=>{
        requestClear();onClear()}}>clear</button>
    </StatsPopup>
  </Stats>
}

export default function word({word, onClick, onDelete}){
  let trainings = word.trainings;
  // for (let i in trainings)
  //   if(i.startsWith('_'))
  //     delete trainings[i];
    return (
        <Wrapper onClick={onClick}>
            <div>
                <a>{word.word}</a>
                {word.translation}
            </div>
            {/* {JSON.stringify(trainings)} */}
            <TrainingStats data={trainings} word={word} onClear={()=>{
              console.log(word)
            }}/>
            <i className="icon-remove" onClick={onDelete}></i>
        </Wrapper>
    )
}