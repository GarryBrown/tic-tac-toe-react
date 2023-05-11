import React, { ReactElement, RefObject } from 'react';
import useWebAnimations from "@wellyshen/use-web-animations";
import './Win-line.css';


interface IProps {

}

export function WinLine({}: IProps): ReactElement {

    // @ts-ignore
    const { ref, playState } = useWebAnimations({
        keyframes: {
            transform: "translate3d(5%, 60px,0)", // Move by 500px
            background: ["red", "blue", "green"], // Go through three colors
        },
        animationOptions: {
            delay: 500, // Start with a 500ms delay
            duration: 1000, // Run for 1000ms
            // iterations: 1, // Repeat once
            // direction: "normal", // Run the animation forwards and then backwards
            easing: "ease-in-out", // Use a fancy timing function,
            fill: 'forwards'
        },
        // @ts-ignore
        onReady: ({ playState, animate, animation }) => {
            // Triggered when the animation is ready to play
        },
        // @ts-ignore
        onUpdate: ({ playState, animate, animation }) => {
            // Triggered when the animation enters the running state or changes state
        },
        // @ts-ignore
        onFinish: ({ playState, animate, animation }) => {
            // Triggered when the animation enters the finished state
        },
        // More useful options...
    });

    return (
        <tbody className='win-line'>
            <div className='win-line--line' ref={ref as RefObject<HTMLDivElement>}></div>
        </tbody>
    )
}