import styled from "styled-components"

export function Col({children, reverse, gap}){
    return <div style={{display: 'flex', flexDirection:reverse?'column-reverse':'column', gap}}>
        {children}
    </div>
}

let RowC = styled.div`
display:flex;
flex-direction:row;
@media(max-width:${props=>props.break}px){
    flex-direction:column;
}
`

export function Row({children, reverse, gap, edge}){
    return <RowC style={{display: 'flex', gap}} break={edge}>
        {children}
    </RowC>
}

export function Elem({children, grow, style}){
    return <div style={{flexGrow:grow,...style}}>
        {children}
    </div>
}
