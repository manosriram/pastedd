import React from "react";
import "../Styles/App.css";
import { Helmet } from "react-helmet";

function About() {
    return (
        <>
            <Helmet>
                <title>Pastedd About</title>
                <meta name="description" content="Pastedd About" />
            </Helmet>
            <div className="about">
                <p>
                    Pastedd encrypts every paste so that it is safe and secure.
                    Non-Users can't private paste.
                </p>
                <p>
                    There is a limit of <strong>10</strong> unlisted and{" "}
                    <strong>350</strong> total pastes per day.
                </p>
                <p>
                    If signed-up, you can edit your pastes, clone other pastes
                    and much more. Also, you can private paste!
                </p>
                <p>
                    Right now, as this is an MVP; only 10 private pastes are
                    given to every user. I hope we can allocate much more in the
                    future.
                </p>
                <hr />

                <p>
                    Pastedd uses cookies to improve your user-experience. By
                    using pastedd, you agree to it's cookie policy.
                </p>
            </div>
        </>
    );
}

export default About;
