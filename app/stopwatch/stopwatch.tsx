"use client";

import { FlagIcon } from "@heroicons/react/20/solid";
import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon } from "@heroicons/react/24/outline";
import {
    Button,
    ButtonGroup,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import moment from "moment";
import React from "react";
import Moment from "react-moment";

interface Row {
    // date of start
    start: Date;
    end?: Date;
    // seconds of active time
    totalTime: number;
    isActive: boolean;
}

export function Stopwatch() {
    const [rows, setRows] = React.useState<Row[]>([]);
    const [active, setActive] = React.useState<boolean>(false);

    const onPause = React.useCallback(() => {
        // pause the current record
        setActive(false);
        setRows(prevRows =>
            prevRows.map(p => {
                return {
                    start: p.start,
                    totalTime: p.totalTime,
                    isActive: false
                };
            })
        );
    }, []);

    const onStart = React.useCallback(() => {
        // add a record to rows.
        setActive(true);
        setRows([{ start: new Date(), totalTime: 0, isActive: true }]);
    }, []);

    const onLap = React.useCallback(() => {
        // add a new record to row, set other rows to isActive: false
        setRows(prevRows => [
            { start: new Date(), totalTime: 0, isActive: true },
            ...prevRows.map(p => {
                return {
                    start: p.start,
                    totalTime: p.totalTime,
                    isActive: false,
                    // set the end time of the timer.
                    end: p.end ?? new Date()
                };
            })
        ]);
    }, []);

    const completeRows = rows
        .filter(r => !r.isActive)
        .map((r, i) => {
            return (
                <TableRow key={`complete_${i}`}>
                    <TableCell> </TableCell>
                    <TableCell>{moment(r.start).format("h:mm:ss a")}</TableCell>
                    <TableCell>
                        <Moment duration={r.start} date={r.end}></Moment>
                    </TableCell>
                    <TableCell>
                        <Button>Edit</Button>
                    </TableCell>
                </TableRow>
            );
        });
    const activeRow = rows
        .filter(r => r.isActive)
        .map((r, i) => {
            return (
                <TableRow key={`active_${i}`}>
                    <TableCell>
                        {r.isActive && <CircularProgress aria-label="Loading..." className="inline" />}
                    </TableCell>
                    <TableCell>{moment(r.start).format("h:mm:ss a")}</TableCell>
                    <TableCell>
                        <Moment interval={1000} durationFromNow>
                            {r.start}
                        </Moment>
                    </TableCell>
                    <TableCell>
                        <Button>Edit</Button>
                    </TableCell>
                </TableRow>
            );
        });

    return (
        <div className="flex flex-col justify-between max-h-full">
            <div>
                <h1 className="text-8xl">
                    {active && <Moment interval={1000} durationFromNow date={rows[rows.length - 1].start} />}
                    {!active && "00:00:00"}
                </h1>
            </div>

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
                    <Button onPress={onLap} isDisabled={!active} color={active ? "primary" : undefined}>
                        <FlagIcon />
                    </Button>
                </ButtonGroup>
            </div>
            <Table aria-label="Laps" className="grow">
                <TableHeader>
                    <TableColumn> </TableColumn>
                    <TableColumn>START</TableColumn>
                    <TableColumn>TOTAL TIME</TableColumn>
                    <TableColumn>EDIT</TableColumn>
                </TableHeader>
                <TableBody>{[...activeRow, ...completeRows]}</TableBody>
            </Table>
        </div>
    );
}
