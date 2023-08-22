"use client";

import { Button } from "@nextui-org/button";
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React from "react";

interface TimerData {
    timeLeft: number;
    timeTotal: number;
}

export default function Home() {
    return <main className="flex min-h-screen flex-col items-center justify-between p-24">Welcome to Timer</main>;
}
