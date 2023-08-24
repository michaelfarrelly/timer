"use client";

import { InboxIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function BottomBar() {
    // https://flowbite.com/docs/components/bottom-navigation/
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                <Link
                    href="/timer"
                    aria-current="page"
                    type="button"
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                    <InboxIcon className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        Timer
                    </span>
                </Link>
                <Link
                    href="/stopwatch"
                    aria-current="page"
                    type="button"
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                    <InboxIcon className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        Stopwatch
                    </span>
                </Link>
            </div>
        </div>
    );
}
