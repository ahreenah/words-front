import Styled, {keyframes} from 'styled-components'

const rotate360 = keyframes`
    0%,
    100% {
        box-shadow: 15px 15px rgb(79,77,73), -15px 15px rgb(223,223,223), -15px -15px rgb(79,77,73), 15px -15px rgb(223,223,223);
    }
    25% {
        box-shadow: -15px 15px rgb(223,223,223), -15px -15px rgb(79,77,73), 15px -15px rgb(223,223,223), 15px 15px rgb(79,77,73);
    }
    50% {
        box-shadow: -15px -15px rgb(79,77,73), 15px -15px rgb(223,223,223), 15px 15px rgb(79,77,73), -15px 15px rgb(223,223,223);
    }
    75% {
        box-shadow: 15px -15px #dfdfdf, 15px 15px #4f4d49, -15px 15px #dfdfdf, -15px -15px #4f4d49;
    }
`;

const Spinner = Styled.div`
	margin: auto;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	width: 15px;
	height: 15px;
	border-radius: 100%;
	box-shadow: 15px 15px rgb(79,77,73), -15px 15px rgb(223,223,223), -15px -15px rgb(79,77,73), 15px -15px rgb(223,223,223);
	animation:  ${rotate360} ease infinite 4.6s;
`;

let Wrapper = Styled.div`
padding:50px;
`

export default function(){
    return (
        <Wrapper>
            <Spinner/>
        </Wrapper>
    );
}