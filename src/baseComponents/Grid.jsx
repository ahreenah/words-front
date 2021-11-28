import styled from "styled-components"


let EdgeGrid = styled.div`

`

export default function({children}){
    return <EdgeGrid className="row-fluid">
        {children}
    </EdgeGrid>
}



export function Col({children, span, style}){
    return <div className={"span"+span} style={style} >
        {children}
    </div>
}

