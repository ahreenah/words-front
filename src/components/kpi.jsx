import ShadowBlock from '../components/shadowBlock'

export default function Kpi({name, value}){
    return <ShadowBlock style={{paddingTop:12, paddingBottom:21}}>
        <div style={{fontSize:22, marginBottom:16, fontWeight:300, lineHeight:'18px'}}>
            {name}
        </div>
        <div style={{fontSize:36,lineHeight:'36px'}}>
            {value}
        </div>
    </ShadowBlock>
}