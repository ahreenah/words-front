import styled from "styled-components";

let Capital = styled.h1`
text-shadow: 2px 2px 3px rgba(255,255,255,.5);
    /* -webkit-background-clip: text; */
    /* -webkit-background-clip: text; */
    /* font: bold 200px arial, sans-serif; */
    background-color: #565656;
    /* color: transparent; */
    /* text-shadow: 2px 2px 3px rgba(255,255,255,0.5); */
    /* -webkit-background-clip: text; */
    -moz-background-clip: text;
    background-clip: text;
    color: transparent !important;
    /* background-color: blue; */
    -webkit-background-clip: text;
    @media(max-width:650px){
        font-size:30px !important;
    }`

export default function({loggedIn, onLogin}){
    return (
        <div className=" w-100" style={{width: '100%'}}>
            <div className="hero-unit" style={{boxShadow: '3px -3px 9px #ffffff inset, -3px 3px 7px #c5c5c5 inset'}}>
                <Capital>Welcome to Words</Capital>
                <p>Here you can learn new words in any language you like. {!loggedIn && <><br/>
                    Click login to start </>}</p>
                <p>
                    {!loggedIn && <a className="btn btn-primary btn-large" onClick={onLogin}>
                        Login
                    </a>}
                </p>
            </div>
        </div>
    )
}