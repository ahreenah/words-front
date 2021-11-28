import ShadowBlock from '../components/shadowBlock'

export default function Kpi({name, value}){
    return <ShadowBlock style={{paddingTop:12, paddingBottom:21, height:90, display:'flex', flexDirection:'row', alignItems:'center'}}>
        <div style={{fontSize:22, padding:10, fontWeight:300, lineHeight:'18px', borderRight:'1px solid #808080', flexGrow:1, height:'fit-content'}}>
            {name}
        </div>
        <div style={{fontSize:36,lineHeight:'36px', margin:5, padding:6,height:'fit-content'}}>
            {value}
        </div>
    </ShadowBlock>
}