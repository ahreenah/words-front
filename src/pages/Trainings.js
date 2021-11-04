import react, {useContext, useState} from "react";

import { Link } from "react-router-dom";
import Auth from "./auth";
import Header from "../components/Header";
import authContext from "../context/authContext";

export default function(){
    let auth = useContext(authContext)
    return <div className="w-100">  
        <div className="w-100" style={{width:'100%'}}>
            <div class="hero-unit">
                <h1>trainings</h1>
                <p>Tagline</p>
                
            </div>
        </div>
        <ul class="thumbnails">
            <li class="span4">
                <div class="thumbnail">
                {/* <img data-src="holder.js/300x200" alt=""> */}
                <h3>Thumbnail label</h3>
                <p>Thumbnail caption...</p>
                </div>
            </li>
            <li class="span4">
                <div class="thumbnail">
                {/* <img data-src="holder.js/300x200" alt=""> */}
                <h3>Thumbnail label</h3>
                <p>Thumbnail caption...</p>
                </div>
            </li>
            <li class="span4">
                <div class="thumbnail">
                {/* <img data-src="holder.js/300x200" alt=""> */}
                <h3>Thumbnail label</h3>
                <p>Thumbnail caption...</p>
                </div>
            </li>
        </ul>
    </div>
}