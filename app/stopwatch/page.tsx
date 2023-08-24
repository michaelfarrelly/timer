import { Stopwatch } from "@/src/components/stopwatch";

export default function StopwatchPage() {
    return (
        <div className="flex flex-col gap-4 justify-center text-center">
            <div className="shrink h-40">
                <h1 className="text-2xl font-sans font-black">Stopwatch</h1>
            </div>
            <div className="grow h-40">
                <Stopwatch />
            </div>
        </div>
    );
}
