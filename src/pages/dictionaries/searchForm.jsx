export const SearchForm = ({style, onChangeSearch, search}) =>
    <form className="navbar-search" style={style}>
        <input type="text" className="search-query" avlue={search} style={style} placeholder="Search" onInput={(e)=>onChangeSearch(e.target.value)}/>
    </form>;    