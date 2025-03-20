"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/ui/header";
import { CardWithForm } from "@/components/ui/car-with-form";
import CardTest from "@/components/ui/card-test";
import { CardDemo } from "@/components/ui/card-demo";

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="flex flex-col items-center gap-4 w-full p-4">
        <CardTest />
        <CardWithForm />
        <CardDemo/>
      </div>
    </div>
  );
}
