"use client";

import { BackspaceIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import React from "react";

import { Timer } from "./timer";

interface TimerInfo {
    maxTime: number;
    label: string;
}

export function KeyPad({
    onSubmit,
    isOpen,
    onOpenChange
}: {
    onSubmit: (input: number) => void;
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
        setValue(prevValue => {
            return prevValue.length > 0 ? prevValue.substring(0, prevValue.length - 1) : "";
        });
    }, []);

    const onSubmitPress = React.useCallback(() => {
        onSubmit(parseInt(value));
        onOpenChange();
    }, [onOpenChange, onSubmit, value]);

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add New Timer</ModalHeader>
                            <ModalBody>
                                {value}

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

    const onAddTimer = React.useCallback((input: number) => {
        setTimers(prevTimers => {
            return [...prevTimers, { maxTime: input, label: `${input} seconds` }];
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
