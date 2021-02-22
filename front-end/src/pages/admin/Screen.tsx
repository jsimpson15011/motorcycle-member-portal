import React from "react";
import {useParams} from "react-router-dom";
import * as screenComponents from "./screens";

const Screen = () => {

    console.log(screenComponents.Users)

    let {screenId} = useParams<Record<string, string | undefined>>();
    const screens = [
        {
            id: "users",
            content:
            <screenComponents.Users/>
        },
        {
            id: "entry-forms",
            content:
            <screenComponents.EntryForms/>
        }
    ]

    const currentContent = screens.filter(screen => {
        return screen.id === screenId
    })[0].content


    return (
        <div>
            <h3>{currentContent}</h3>
        </div>
    )
}

export default Screen