import React from "react";
import { Callout, Card, Elevation } from "@blueprintjs/core";

const pastes = ["one", "two", "three", "four", "five", "six", "seven"];

function NewPastes() {
    return (
        <>
            {pastes.map(paste => {
                return (
                    <>
                        <Card interactive={true}>{paste}</Card>
                        <br />
                    </>
                );
            })}
        </>
    );
}

export default NewPastes;
