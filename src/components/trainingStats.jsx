import styled from "styled-components"

let Wrapper = styled.div`
    font-size:18px !important;
`
let Row = styled.div`
    display:flex;
    flex-direction:row;
    div{
        font-size:18px !important;
    }
`
let Col = styled.div`
    flex-grow:1;
    text-align:center;
`
let Spacer=styled.div`
    width:1px;
    box-shadow:inset 0 0 2px #12121270;
`

function WordsCol({words, name}){
    console.log('col:',words);
    return <Col>
        <div>{name}</div>
        {words.map(i=><div>{i.word.word}{i.correct}</div>)}
    </Col>
}

export default function({words}){
    return <Wrapper>
        <h1>Training stats</h1>
        <Row>
            <WordsCol name={'Correct'} words={words.filter(i=>i.correct)} />
            <Spacer/>
            <WordsCol name={'Incorrect'} words={words.filter(i=>!i.correct)}/>
        </Row>
    </Wrapper>
}