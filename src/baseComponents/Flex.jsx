export function Col({children, reverse, gap}){
    return <div style={{display: 'flex', flexDirection:reverse?'column-reverse':'column', gap}}>
        {children}
    </div>
}

export function Row({children, reverse, gap}){
    return <div style={{display: 'flex', flexDirection:reverse?'row-reverse':'row', gap}}>
        {children}
    </div>
}

export function Elem({children, grow, style}){
    return <div style={{flexGrow:grow,...style}}>
        {children}
    </div>
}
