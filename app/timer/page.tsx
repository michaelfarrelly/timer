"use client";

import { BackspaceIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import cx from "classnames";
import React from "react";

import { TimeData, Timer } from "./timer";

interface TimerInfo {
    maxTime: TimeData;
    label: string;
}

export function KeyPadLabel({ value, label, hasValue }: { value: string; label: string; hasValue: boolean }) {
    return (
        <div>
            <span
                className={cx("text-4xl content-bottom", {
                    "text-slate-700": !hasValue,
                    "text-cyan-400": hasValue
                })}
            >
                {value}
            </span>
            <span
                className={cx("text-sm  content-bottom", {
                    "text-slate-700": !hasValue,
                    "text-cyan-400": hasValue
                })}
            >
                {label}
            </span>
        </div>
    );
}

export function KeyPad({
    onSubmit,
    isOpen,
    onOpenChange
}: {
    onSubmit: (input: TimeData) => void;
    isOpen: boolean;
    onOpenChange: any;
}) {
    const [value, setValue] = React.useState<string>("");

    const onNumberPress = React.useCallback((input: string) => {
        setValue(prevValue => {
            return `${prevValue}${input}`;
        });
    }, []);

    const onBackspace = React.useCallback(() => {
        // remove the last character
        setValue(prevValue => {
            return prevValue.length > 0 ? prevValue.substring(0, prevValue.length - 1) : "";
        });
    }, []);

    const onSubmitPress = React.useCallback(() => {
        const paddedValue = value.padStart(6, "0");
        const hours = paddedValue.substring(0, 2);
        const minutes = paddedValue.substring(2, 4);
        const seconds = paddedValue.substring(4);

        // const submitValue = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

        onSubmit({ hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds) });
        onOpenChange();
    }, [onOpenChange, onSubmit, value]);

    const formattedValue = React.useMemo(() => {
        const paddedValue = value.padStart(6, "0");
        const hours = paddedValue.substring(0, 2);
        const minutes = paddedValue.substring(2, 4);
        const seconds = paddedValue.substring(4);

        const hasHours = hours != "00";
        const hasMinutes = minutes != "00" || hasHours;
        const hasSeconds = seconds != "00" || hasMinutes || hasHours;

        return (
            <div className="flex flex-row gap-2">
                <KeyPadLabel value={hours} label="h" hasValue={hasHours} />
                <KeyPadLabel value={minutes} label="m" hasValue={hasMinutes} />
                <KeyPadLabel value={seconds} label="s" hasValue={hasSeconds} />
            </div>
        );
    }, [value]);

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add New Timer</ModalHeader>
                            <ModalBody>
                                {formattedValue}

                                <div className="flex flex-col flex-wrap gap-5">
                                    <div className="flex flex-row gap-5">
                                        <Button onPress={() => onNumberPress("1")}>1</Button>
                                        <Button onPress={() => onNumberPress("2")}>2</Button>
                                        <Button onPress={() => onNumberPress("3")}>3</Button>
                                    </div>
                                    <div className="flex flex-row gap-5">
                                        <Button onPress={() => onNumberPress("4")}>4</Button>
                                        <Button onPress={() => onNumberPress("5")}>5</Button>
                                        <Button onPress={() => onNumberPress("6")}>6</Button>
                                    </div>
                                    <div className="flex flex-row gap-5">
                                        <Button onPress={() => onNumberPress("7")}>7</Button>
                                        <Button onPress={() => onNumberPress("8")}>8</Button>
                                        <Button onPress={() => onNumberPress("9")}>9</Button>
                                    </div>
                                    <div className="flex flex-row gap-5">
                                        <Button onPress={() => onNumberPress("00")}>00</Button>
                                        <Button onPress={() => onNumberPress("0")}>0</Button>
                                        <Button onPress={() => onBackspace()}>
                                            <BackspaceIcon />
                                        </Button>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onSubmitPress}>
                                    Start
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default function TimerPage() {
    const [timers, setTimers] = React.useState<TimerInfo[]>([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onAddTimer = React.useCallback((input: TimeData) => {
        const label = `${input.hours > 0 ? `${input.hours}:` : ``}${input.minutes > 0 ? `${input.minutes}:` : ``}${
            input.seconds > 0 ? `${input.seconds}:` : ``
        }`;

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
        <div className="container flex flex-col flex-wrap gap-10">
            <div>
                <h1 className="text-8xl font-sans font-black tracking-wide">Timer</h1>
            </div>
            <div className="container flex flex-row flex-wrap gap-10">
                {timers.map((t, i) => {
                    return <Timer key={i} maxTime={t.maxTime} label={t.label} onDelete={() => onDeleteTimer(i)} />;
                })}
            </div>
            <div>
                <Button isIconOnly onPress={onOpen}>
                    <PlusIcon />
                </Button>

                <KeyPad onSubmit={onAddTimer} isOpen={isOpen} onOpenChange={onOpenChange} />
            </div>
        </div>
    );
}
