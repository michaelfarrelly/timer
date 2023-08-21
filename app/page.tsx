"use client";

import { Button } from "@nextui-org/button";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
} from "@nextui-org/react";
import React from "react";

interface TimerData {
    timeLeft: number;
    timeTotal: number;
}

export default function Home() {
    const [timers, setTimers] = React.useState<TimerData[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valueHour, setValueHour] = React.useState<string>("0");
    const [valueMinute, setValueMinute] = React.useState<string>("0");
    const [valueSecond, setValueSecond] = React.useState<string>("0");

    // callbacks
    const onAddTimer = React.useCallback(() => {
        setTimers((prevTimers) => [
            ...prevTimers,
            { timeLeft: parseInt(valueHour), timeTotal: parseInt(valueHour) },
        ]);
        onOpenChange();
    }, [onOpenChange, valueHour]);

    const onPromptNewTimer = React.useCallback(() => {
        // trigger dialog to show new timer settings instead of just adding.
        onOpen();
    }, [onOpen]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button onClick={onPromptNewTimer}>Add Timer</Button>

            {timers.map((t, i) => (
                <div key={`${i}`}>
                    Time Left: {t.timeLeft}/{t.timeTotal}
                </div>
            ))}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add New Timer
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    type="number"
                                    label="Hours"
                                    value={valueHour}
                                    onValueChange={setValueHour}
                                ></Input>
                                <Input
                                    type="number"
                                    label="Minutes"
                                    value={valueMinute}
                                    onValueChange={setValueMinute}
                                ></Input>
                                <Input
                                    type="number"
                                    label="Seconds"
                                    value={valueSecond}
                                    onValueChange={setValueSecond}
                                ></Input>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onAddTimer}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    );
}
