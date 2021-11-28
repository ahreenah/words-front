import styled from "styled-components"

let MinWC = styled.div`
@media(max-width:${props=>props.width}px){display:none}
`

let MaxWC = styled.div`
@media(min-width:${props=>props.width}px){display:none}
`

export function Min(props){
    return <MinWC width={props.width}>{props.children}</MinWC>
}


export function Max(props){
    return <MaxWC width={props.width}>{props.children}</MaxWC>
}