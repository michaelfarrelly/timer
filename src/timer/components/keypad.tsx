"use client";

import { BackspaceIcon } from "@heroicons/react/20/solid";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import cx from "classnames";
import React from "react";

import { sanitize, TimeData } from "../types";

export interface KeyPadLabelProps {
    value: string;
    label: string;
    hasValue: boolean;
}

export function KeyPadLabel({ value, label, hasValue }: KeyPadLabelProps): JSX.Element {
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

export interface KeyPadProps {
    onSubmit: (input: TimeData) => void;
    isOpen: boolean;
    onOpenChange: any;
    title?: string;
}

export function KeyPad({ onSubmit, isOpen, onOpenChange, title = "Add New Timer" }: KeyPadProps): JSX.Element {
    const [value, setValue] = React.useState<string>("");

    const onNumberPress = React.useCallback((input: string) => {
        setValue(prevValue => {
            if (prevValue.length < 6) {
                // only allow 6 characters
                return `${prevValue}${input}`;
            } else {
                return prevValue;
            }
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

        onSubmit(sanitize({ hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds) }));
        onOpenChange();

        // reset
        setValue("");
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
                <div className="w-50 grow"></div>
                <KeyPadLabel value={hours} label="h" hasValue={hasHours} />
                <KeyPadLabel value={minutes} label="m" hasValue={hasMinutes} />
                <KeyPadLabel value={seconds} label="s" hasValue={hasSeconds} />

                <div className="w-50 grow"></div>
            </div>
        );
    }, [value]);

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-row">
                                    <div className="w-50 grow"></div>
                                    <div className="w-50 grow-0 text-center">
                                        <div className="flex flex-col flex-wrap gap-5">
                                            {formattedValue}

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
                                    </div>
                                    <div className="w-50 grow"></div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onSubmitPress}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
