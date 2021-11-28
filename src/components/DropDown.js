export function DropDown({ open, togglePron, value, variants, setOpen, onChange }) {
    return <div className={"btn-group" + (open ? ' open' : '')} style={{ width: '100%', display: 'flex' }}>
        <div onClick={togglePron}>
            {value && variants[value]}
            {/* {pronouns[pronoun]?pronouns[pronoun].nativeName:'select a language'} */}
        </div>
        <div className="btn" style={{ flexGrow: 1, opacity: 0 }} onClick={togglePron}></div>

        <div className="btn dropdown-toggle" style={{ background: 'none', border: 'none', outline: 'none', display: 'flex', alignItems: 'center' }} data-toggle="dropdown" onClick={togglePron}>
            <span className="caret"></span>
        </div>
        <ul className={"dropdown-menu w-100"} style={{ background: 'white', maxHeight: 199, 'overflow-y': 'scroll' }}>
            {Object.keys(variants).map((i,num) => <li key={num} style={{ marginBottom: 0 }} onClick={() => { setOpen(false); onChange(i); }}><a style={{ margin: 0 }}>{variants[i]}</a></li>)} {/**/}
        </ul>
    </div>;
}
