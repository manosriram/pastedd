import React from "react";
import { Callout, Card, Elevation } from "@blueprintjs/core";

const pastes = ["one", "two", "three", "four", "five", "six", "seven"];

function NewPastes() {
    return (
        <>
            {pastes.map(paste => {
                return (
                    <>
                        <Callout>
                            <h5>
                                <a href="#">{paste}</a>
                            </h5>
                            <p>Paste language here!</p>
                        </Callout>
                        <br />
                    </>
                );
            })}
        </>
    );
}

export default NewPastes;
