"use client";

import cx from "classnames";

import { TimeData } from "../types";

export interface TimerLabelPartProps {
    value: number;
    label: string;
}

export function TimerLabelPart({ value, label }: TimerLabelPartProps): JSX.Element {
    return (
        <div>
            <span className={cx("text-4xl content-bottom text-cyan-400")}>{value}</span>
            <span className={cx("text-sm content-bottom text-cyan-400")}>{label}</span>
        </div>
    );
}

export interface TimerLabelProps {
    time: TimeData;
}

export function TimerLabel({ time }: TimerLabelProps): JSX.Element {
    return (
        <div className="flex flex-row gap-2">
            {time.hours > 0 && <TimerLabelPart value={time.hours} label="h" />}
            {(time.minutes > 0 || time.hours > 0) && <TimerLabelPart value={time.minutes} label="m" />}
            <TimerLabelPart value={time.seconds} label="s" />
        </div>
    );
}
