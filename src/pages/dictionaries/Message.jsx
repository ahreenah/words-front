export default function ({children}){
    return  <div className="navbar">
    <div className="navbar-inner">
        <span className="brand flex-grow-1">{children}</span>
    </div>
</div>
}