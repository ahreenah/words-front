
import DownIcon from '../../assets/images/down.svg';
const OpenChartButton = ({style,onClick, opened}) => <div style={{ width: 20, marginLeft: 20, marginLeft: 'auto', transform: 'rotate(-180deg) translateX(-3px)', ...(opened ? { transform: 'rotate(-90deg) translateY(3px)' } : {}), transition: '.5s' }}>
                                    <img src={DownIcon} style={style} onClick={onClick} />
                                </div>;
export default OpenChartButton;