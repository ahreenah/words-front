import Styled from "styled-components";

let ShadowBlock = Styled.div`
background-color:#e5e5e5;
color:#707070;
  // box-shadow: inset 4px -4px 8px rgba(0, 0, 0, 0.25), inset -4px 4px 8px #ffffff, 2px 2px #323232 2px;
  box-shadow: 3px 4px 8px #CDCDCD, inset 5px -5px 4px -3px rgba(71, 69, 69, 0.3), inset -3px 4px 8px rgba(255, 255, 255, 0.8);
filter:drop-shadow(0px 4px 4px rgba(0, 0, 0, 0));   
transition:.5s;
border-radius: 5px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 24px !important;
line-height: 28px;
// width:100%;
margin-bottom:15px;
line-height:51px;
padding-left:10px;
box-sizing:border-box;  
`

export default ShadowBlock