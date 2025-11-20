"use client"

import {useContext} from 'react';
import { AudioContext } from '../contexts/AudioContext';

export default function MyComponent({}){
    const testBool = useContext(AudioContext);
    console.log("hellooo");

    console.log(testBool);

    return (
        <div>
        {testBool && (<div>helloo</div>)}
        {!testBool && (<div>goodbye</div>)}
        </div>

        
    )
}