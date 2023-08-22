"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TitleBar() {
    const pathname = usePathname();
    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">MF TIMER</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={pathname === "/timer"}>
                    <Link href="/timer" aria-current="page">
                        Timer
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathname === "/stopwatch"}>
                    <Link href="/stopwatch">Stopwatch</Link>
                </NavbarItem>
            </NavbarContent>
            {/* <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent> */}
        </Navbar>
    );
}
