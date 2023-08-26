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
