import React from "react";
import { Callout, Card, Elevation } from "@blueprintjs/core";

const pastes = ["one", "two", "three", "four", "five", "six", "seven"];

function NewPastes() {
    return (
        <>
            {pastes.map(paste => {
                return (
                    <>
                        <div className="bp3-callout .modifier">
                            <h4 className="bp3-heading">Callout Heading</h4>
                            It's dangerous to go alone! Take this.
                        </div>
                        <br />
                    </>
                );
            })}
        </>
    );
}

export default NewPastes;
