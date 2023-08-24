"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CircularProgress } from "@nextui-org/react";
import cx from "classnames";
import React from "react";
import { clearInterval } from "timers";

interface Row {
    // date of start
    start: Date;
    end?: Date;
    // seconds of active time
    totalTime: number;
    isActive: boolean;
}

export interface TimeData {
    hours: number;
    minutes: number;
    seconds: number;
}

const secondsInHour = 3600;
const secondsInMinute = 60;

export function getSeconds(input: TimeData): number {
    return input.hours * secondsInHour + input.minutes * secondsInMinute + input.seconds;
}

export function getTimeDataFromSeconds(input: number): TimeData {
    const qH = Math.floor(input / secondsInHour);
    const rH = input % secondsInHour;

    const qM = Math.floor(rH / secondsInMinute);
    const rM = rH % secondsInMinute;

    const qS = rM;

    const hours = qH;
    const minutes = qM;
    const seconds = qS;
    return { hours, minutes, seconds };
}

export function sanitize(input: TimeData): TimeData {
    // WARN minutes and seconds would only be up to 2 digits at this point
    const cloned = { ...input };
    if (cloned.seconds > 60) {
        // add extra to minutes
        cloned.minutes++;
        cloned.seconds -= 60;
    }
    if (cloned.minutes > 60) {
        // add extra to hours
        cloned.hours++;
        cloned.minutes -= 60;
    }
    return cloned;
}

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

export interface TimerProps {
    /**
     * seconds
     */
    maxTime: TimeData;
    label: string;
    onDelete: () => void;
}

/**
 * One timer card
 *
 * TimeLeft, Label, Delete, Play/Pause
 */
export function Timer({ maxTime, label, onDelete }: TimerProps): JSX.Element {
    const [active, setActive] = React.useState<boolean>(false);
    const [activeDates, setActiveDates] = React.useState<Row[]>([]);

    const intervalId = React.useRef<NodeJS.Timeout | number | undefined>(undefined);

    const onPause = React.useCallback(() => {
        // pause the current record
        setActive(false);

        setActiveDates(prevDates => {
            return prevDates.map(p => {
                if (p.isActive) {
                    return {
                        ...p,
                        end: new Date(),
                        isActive: false
                    };
                } else {
                    return p;
                }
            });
        });
    }, []);

    const onStart = React.useCallback(() => {
        setActive(true);
        setActiveDates(prevDates => [...prevDates, { start: new Date(), totalTime: 0, isActive: true }]);
    }, []);

    const onInterval = React.useCallback(() => {
        setActiveDates(prevDates => {
            const timeLeft1 = prevDates.reduce((prev, curr) => {
                return prev - curr.totalTime;
            }, getSeconds(maxTime));

            if (timeLeft1 <= 0) {
                // pause timer?
                clearInterval(intervalId.current);
                intervalId.current = undefined;

                setActive(false);
            }
            return prevDates.map(p => {
                if (p.isActive) {
                    return {
                        ...p,
                        totalTime: timeLeft1 > 0 ? p.totalTime + 1 : getSeconds(maxTime),
                        isActive: timeLeft1 > 0 ? p.isActive : false
                    };
                } else {
                    return p;
                }
            });
        });
    }, [maxTime]);

    React.useEffect(() => {
        let intervalId1: any = undefined;
        if (active) {
            intervalId1 = setInterval(onInterval, 1000);
            intervalId.current = intervalId1;
        } else {
            // stop interval
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = undefined;
            }
        }
        return () => clearInterval(intervalId1);
    }, [active, onInterval]);

    const timeLeft = React.useMemo(() => {
        if (active) {
            return getTimeDataFromSeconds(
                activeDates.reduce((prev, curr) => {
                    return prev - curr.totalTime;
                }, getSeconds(maxTime))
            );
        } else {
            // when activeDates set, find time remaining.
            if (activeDates.length > 1) {
                return getTimeDataFromSeconds(
                    activeDates.reduce((prev, curr) => {
                        return prev - curr.totalTime;
                    }, getSeconds(maxTime))
                );
            } else {
                // format?
                return getTimeDataFromSeconds(getSeconds(maxTime));
            }
        }
    }, [active, activeDates, maxTime]);

    return (
        <Card>
            <CardHeader>
                <div className="container flex flex-row gap-10 items-center">
                    <h1 className="text-3xl">{label}</h1>

                    <Button onPress={onDelete} isIconOnly>
                        <XMarkIcon />
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <div className="container flex flex-row gap-10 items-center">
                    {active && <CircularProgress />}
                    {active && <TimerLabel time={timeLeft} />}
                </div>
            </CardBody>

            <CardFooter>
                <div className="flex flex-wrap gap-4 items-center center grow-0">
                    <ButtonGroup className="items-center">
                        {active && (
                            <Button onPress={onPause} isDisabled={!active}>
                                <PauseIcon />
                            </Button>
                        )}
                        {!active && (
                            <Button onPress={onStart} isDisabled={active} color={!active ? "primary" : undefined}>
                                <PlayIcon />
                            </Button>
                        )}
                    </ButtonGroup>
                </div>
            </CardFooter>
        </Card>
    );
}
