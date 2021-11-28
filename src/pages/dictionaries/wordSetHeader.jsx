import { SearchForm } from "./searchForm";
import OpenChartButton from './openChartButton'
import { StartButton } from "./StartButton";
import Pie from "../../components/charts/pie"
import { useState } from "react"

export default function({wordsNum, onStart, name, stats, onChangeSearch}){
    let [statsShown, setStatsShown] = useState(false);
    return <div className="navbar" style={{position:'sticky', top:67}}>
        <div className="navbar-inner" style={{height:1000,maxHeight:statsShown?272:42, transition:'0.6s', overflow:"hidden"}}>
            <div style={{display:'flex', width:'100%', alignItems:'center'}}> 
                <span className="brand" style={{display:'flex'}}>
                    {name}
                </span>
                {wordsNum>=3&&<StartButton onClick={onStart} />}
                

            
                <SearchForm style={{ marginTop: 0 }} onChangeSearch={onChangeSearch}/>
                <OpenChartButton 
                    opened={statsShown}
                    onClick={() => setStatsShown(v => !v)} />
            </div>
            <Pie learned={stats.leanded} inProgress={stats.inProrgess} pending={stats.pending}/>    
        </div>
    </div>
    }