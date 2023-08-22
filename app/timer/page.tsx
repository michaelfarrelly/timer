"use client";

import { Timer } from "./timer";

export default function TimerPage() {
    return (
        <div className="container">
            <h1 className="text-8xl font-sans font-black tracking-wide">Timer</h1>{" "}
            <Timer maxTime={15} label="15 seconds" onDelete={() => {}} />
        </div>
    );
}
