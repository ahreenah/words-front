export default function({children}){
    return <div className="row-fluid">
        {children}
    </div>
}

export function Col({children, span}){
    return <div className={"span"+span}>
        {children}
    </div>
}

