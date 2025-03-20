"use state"

import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

export default function CardTest() {
    return (
        <Card className="w-full max-w-80">
            <CardHeader>
                <CardTitle>CARD TITLE</CardTitle>
                <CardDescription>CARD DESCRIPTION</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
                <Button className="m-2">BUTTON</Button>
            </CardContent>
            <CardFooter>
                <p>Card footer</p>
            </CardFooter>
        </Card>
    )
    
}