"use client";

import Link from "next/link";
import { Navigation } from "../components/nav";

import React from "react";
import { InlineWidget } from "react-calendly";

export default function BookAppointment() {
	return (
		<div className="content-center bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-1 lg:gap-16">
					<InlineWidget url="https://calendly.com/carvidonet/free-consultancy-session" />
				</div>
			</div>
		</div>
	);
}
