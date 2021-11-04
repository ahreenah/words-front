import styled from 'styled-components'
let Li = styled.li`
display:flex;
align-items:center;
a{
    flex-grow:1
}
i{
    opacity:0;
    transform:translateX(1к0px);
    transition:.1s
}
:hover i{
      opacity:.6;
      transform:unset;
}
`

export default function({wordSets,addWordSet, setWordSet, setDeletingWordSet}){
    return <div className="well dictionaries">
        <div className="nav nav-list"> 
            <li className="nav-header">Dictionaries</li>
            {wordSets.map(i=><Li onClick={()=>{setWordSet(i.id)}}>
                <a>{i.name}</a>
                <i className="icon-remove" onClick={()=>{
                            setDeletingWordSet(i.id);
                        }}></i>
            </Li>)}
            <li className="divider"></li>
            <li onClick={()=>{addWordSet(true)}}>
                <a>Create new...</a>
            </li>
        </div>
    </div>
}