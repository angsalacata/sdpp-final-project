"use client"

import {useContext} from 'react';
import { RadioAudioContext } from '../contexts/AudioContext';

export default function MyComponent({}){
    const testBool = useContext(RadioAudioContext);
    console.log("hellooo");

    console.log(testBool);

    return (
        <div>
        {testBool && (<div>helloo</div>)}
        {!testBool && (<div>goodbye</div>)}
        </div>

        
    )
}