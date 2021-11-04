export const SearchForm = ({style, onChangeSearch}) =>
    <form className="navbar-search" style={style}>
        <input type="text" className="search-query" style={style} placeholder="Search" onInput={(e)=>onChangeSearch(e.target.value)}/>
    </form>;    