"use client";

import {
    CircularProgress,
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
} from "@nextui-org/react";
import moment from "moment";

import React from "react";

interface Row {
    // date of start
    start: Date;
    // seconds of active time
    totalTime: number;
    isActive: boolean;
}

export function CountRow() {
    const [rows, setRows] = React.useState<Row[]>([]);

    const d = new Date();

    const onPause = React.useCallback(() => {
        // pause the current record
        setRows((prevRows) =>
            prevRows.map((p) => {
                return {
                    start: p.start,
                    totalTime: p.totalTime,
                    isActive: false,
                };
            })
        );
    }, []);
    const onStart = React.useCallback(() => {
        // add a record to rows.
        setRows([{ start: new Date(), totalTime: 0, isActive: true }]);
    }, []);
    const onLap = React.useCallback(() => {
        // add a new record to row, set other rows to isActive: false
        setRows((prevRows) => [
            { start: new Date(), totalTime: 0, isActive: true },
            ...prevRows.map((p) => {
                return {
                    start: p.start,
                    totalTime: p.totalTime,
                    isActive: false,
                };
            }),
        ]);
    }, []);

    return (
        <>
            <Button onPress={onPause}>Pause</Button>
            <Button onPress={onStart}>Start</Button>
            <Button onPress={onLap}>Lap</Button>
            <Table aria-label="Laps">
                <TableHeader>
                    <TableColumn>START</TableColumn>
                    <TableColumn>TOTAL TIME</TableColumn>
                    <TableColumn>EDIT</TableColumn>
                </TableHeader>
                <TableBody>
                    {rows.map((r, i) => {
                        return (
                            <TableRow key="1">
                                <TableCell>
                                    {moment(r.start).format("h:mm:ss a")}
                                </TableCell>
                                <TableCell>
                                    {r.isActive && (
                                        <CircularProgress aria-label="Loading..." />
                                    )}
                                    {r.isActive &&
                                        i + 1 < rows.length &&
                                        moment(rows[i + 1].start).diff(
                                            r.start,
                                            "seconds"
                                        )}
                                    {r.isActive &&
                                        i + 1 === rows.length &&
                                        moment().diff(r.start, "seconds")}
                                    {!r.isActive &&
                                        moment(
                                            rows[rows.length - 1].start
                                        ).diff(r.start, "seconds")}
                                </TableCell>
                                <TableCell>
                                    <Button>Edit</Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}
