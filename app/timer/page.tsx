"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";

import { KeyPad } from "@/src/components/keypad";

import { TimeData, Timer } from "../../src/components/timer";

interface TimerInfo {
    maxTime: TimeData;
    label: string;
}

export default function TimerPage(): JSX.Element {
    const [timers, setTimers] = React.useState<TimerInfo[]>([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onAddTimer = React.useCallback((input: TimeData) => {
        const labelParts = [
            `${input.hours > 0 ? `${input.hours}h` : ``}`,
            `${input.minutes > 0 ? `${input.minutes}m` : ``}`,
            `${input.seconds > 0 ? `${input.seconds}s` : ``}`
        ];
        const label = labelParts.join(" ");

        setTimers(prevTimers => {
            return [...prevTimers, { maxTime: input, label: label }];
        });
    }, []);
    const onDeleteTimer = React.useCallback((index: number) => {
        // remove timer at index
        setTimers(prevTimers => {
            return prevTimers.filter((_v, i) => i !== index);
        });
    }, []);

    return (
        <div className="container flex flex-col flex-wrap gap-10 text-center">
            <div>
                <h1 className="text-8xl font-sans font-black tracking-wide">Timer</h1>
            </div>
            <div className="flex flex-row">
                <div className="grow w-50"></div>
                <div className="grow-0">
                    <div className="flex flex-row flex-wrap gap-10">
                        {timers.map((t, i) => {
                            return (
                                <Timer key={i} maxTime={t.maxTime} label={t.label} onDelete={() => onDeleteTimer(i)} />
                            );
                        })}
                    </div>
                    <div>
                        <Button isIconOnly onPress={onOpen}>
                            <PlusIcon />
                        </Button>

                        <KeyPad onSubmit={onAddTimer} isOpen={isOpen} onOpenChange={onOpenChange} />
                    </div>
                </div>
                <div className="grow w-50"></div>
            </div>
        </div>
    );
}
