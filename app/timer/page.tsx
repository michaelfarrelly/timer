"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";
import useLocalStorage from "use-local-storage";

import { KeyPad } from "@/src/timer/components/keypad";
import { Timer } from "@/src/timer/components/timer";
import { TimeData } from "@/src/timer/types";

interface TimerInfo {
    maxTime: TimeData;
    label: string;
    active: boolean;
}

export default function TimerPage(): JSX.Element {
    const [timers, setTimers] = useLocalStorage<TimerInfo[]>("timers", []);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onAddTimer = React.useCallback(
        (input: TimeData) => {
            const labelParts = [
                `${input.hours > 0 ? `${input.hours}h` : ``}`,
                `${input.minutes > 0 ? `${input.minutes}m` : ``}`,
                `${input.seconds > 0 ? `${input.seconds}s` : ``}`
            ];
            const label = labelParts.join(" ");

            setTimers(prevTimers => {
                return [...(prevTimers ?? []), { maxTime: input, label: label, active: false }];
            });
        },
        [setTimers]
    );

    const onDeleteTimer = React.useCallback(
        (index: number) => {
            // remove timer at index
            setTimers(prevTimers => {
                return (prevTimers ?? []).filter((_v, i) => i !== index);
            });
        },
        [setTimers]
    );
    const onActiveTimer = React.useCallback(
        (index: number, activeValue: boolean) => {
            // remove timer at index
            setTimers(prevTimers => {
                return (prevTimers ?? []).map((v, i) => {
                    if (i === index) {
                        return { ...v, active: activeValue };
                    }
                    return v;
                });
            });
        },
        [setTimers]
    );

    return (
        <div className="container flex flex-col flex-wrap gap-10 text-center">
            <div className="flex flex-row">
                <div className="grow w-50"></div>
                <div className="grow-0">
                    <div className="grid grid-cols-4 gap-4">
                        {timers.map((t, i) => {
                            return (
                                <Timer
                                    key={i}
                                    maxTime={t.maxTime}
                                    label={t.label}
                                    active={t.active}
                                    onDelete={() => onDeleteTimer(i)}
                                    onActiveChanged={v => onActiveTimer(i, v)}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="grow w-50"></div>
            </div>
            <div className="flex flex-row">
                <div className="grow w-50"></div>
                <div className="grow-0">
                    <Button isIconOnly onPress={onOpen}>
                        <PlusIcon />
                    </Button>

                    <KeyPad onSubmit={onAddTimer} isOpen={isOpen} onOpenChange={onOpenChange} />
                </div>

                <div className="grow w-50"></div>
            </div>
        </div>
    );
}
