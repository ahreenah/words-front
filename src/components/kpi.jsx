import ShadowBlock from '../components/shadowBlock'

export default function Kpi({name, value}){
    return <ShadowBlock>
        <div>
            {name}
        </div>
        <div>
            {value}
        </div>
    </ShadowBlock>
}