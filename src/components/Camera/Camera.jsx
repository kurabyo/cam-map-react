import React from "react";
import c from './Camera.module.css'

export const Camera = (props) => {
    return (
        <div className={c.camitem}>
            <iframe className={c.frame} src={props.video} title="video" allowFullScreen>NO SIGNAL</iframe>
        </div>
    )
}