import react, {useContext, useEffect, useState} from "react";

import Grid, {Col} from '../baseComponents/Grid'
import authContext from "../context/authContext";
import AuthContext from '../context/authContext'
import Kpi from '../components/kpi'

import {Calendar} from 'react-multi-date-picker'
import {gql, useQuery} from "@apollo/client";
import {Row, Column, Elem} from '../baseComponents/Flex'
import DashboardTop from '../components/DashboardTop'

const STATS_QUERY = gql`
    query stats{
        stats{
            trainingDates
            inProgress
            pending
            learned
        }
    }
`

export default function({onLogin}){
    const { loading, error, data, refetch } = useQuery(STATS_QUERY);
    let [dates,setDates] = useState([]);
    let [kpiData,setKpiData]=useState({})
    useEffect(()=>{
        if(localStorage.token) {
            console.log('stats data:', data);
            if (data && data.stats){
                setDates(data.stats.trainingDates.map(i => new Date(i)))
                setKpiData({
                    inProgress:data.stats.inProgress,
                    learned:data.stats.learned,
                    pending:data.stats.pending,
                    total:data.stats.inProgress+data.stats.learned+data.stats.pending
                })
            }
        }
    },[loading])
    let authData = useContext(AuthContext)
    let [isAuth, setIsAuth]=useState(false);
    let loggedIn = authData.authData.token; 
    // <Header />
    let auth = useContext(authContext)

    
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    const tomorrow = new Date()
    let streak = 0;
    let num = dates.length-1;
    let delta=0, lastDelta=0;
    console.log(dates)
    console.log('before')
    let deltas = []
    dates.map(i=>{

        i.setHours(0)
        i.setMinutes(0)
        i.setSeconds(0)
        // console.log('d_i',i)
        delta = (today-i);
        deltas.push(delta)
        console.log('diff',  delta, lastDelta)
        lastDelta=delta;
    })
    let deltas2=[];
    for(let i of dates) {
        console.log('di:', today, i, (today - i) / 60 / 24 / 60 / 1000)
        deltas2.push(Math.round((today - i) / 60 / 24 / 60 / 10)/100)
    }
    deltas = deltas.reverse();
    console.log('deltas',  deltas2)
    deltas2 = deltas2.reverse()

    console.log('deltas2',  deltas2)
    let count = 0;
    if(deltas2[0]==0) count = 1;
    for (let i of deltas2){
        if(i==count+1)
            count++
        else
            break
    }
console.log('count',count)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const [values, setValues] = useState([today, tomorrow])

    
    return <div className="w-100">
            <DashboardTop onLogin={onLogin} loggedIn={loggedIn}/>
            {loggedIn &&<Row gap={20}>
                <Elem grow={1}>
                    <Grid>
                        {[
                            {name:'total words', value:kpiData.total},
                            {name:'learned words',value:kpiData.learned},
                            {name:'not started to learn',value:kpiData.pending},
                            {name:'words in progress',value:kpiData.inProgress},
                            {name:'day streak',value: count},
                        ].map(i=>
                            <Col span={4}>
                                <Kpi {...i}/>
                            </Col>
                        )}
                        <Col span={4}>
                            <Kpi/>
                        </Col>
                        <Col span={4}>
                            <Kpi/>
                        </Col>
                    </Grid>
                </Elem>
                <Elem grow={0}>
                     <Calendar
                        multiple
                        value={dates}
                        onChange={setValues}
                        />
                </Elem>
            </Row>}
    </div>
}

let s=`
.rmdp-day.rmdp-selected {
    background-color: #0074d9;
    padding-left: 5px;
    box-shadow: 0 0 3px #8798ad;
    transform: translateX(-5px);
    /* border-top-right-radius: 5px; */
    width: 29px;
    box-shadow: unset;
    border-radius: 5px;
    height: 30px;
}
.rmdp-day.rmdp-selected span:not(.highlight) {
    background-color: #0074d9;
    color: #fff;
    transform: translate(0, -3.5px);
    height: calc(100% + 0px);
    box-shadow: none;
    border-radius: 0;
}
.rmdp-selected + .rmdp-selected span {
    transform: translate(-7px, -3.5px) !important;
    padding-left: 18px;
}
`