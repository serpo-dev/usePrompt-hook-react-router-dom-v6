import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

/*
    CURRENT_PATH - a current router's path that user tries to leave
    MESSAGE - the message which will be seen by user in browser alert dialogue
*/


export function usePrompt(CURRENT_PATH, MESSAGE) {
    const blocker = useBlocker(({ nextLocation }) =>
        nextLocation.pathname !== CURRENT_PATH
    );

    useEffect(() => {
        if (blocker.state === "blocked") {
            const confirmResult = window.confirm(MESSAGE);
            if (confirmResult) {
                blocker.proceed();
            } else {
                blocker.reset();
            }
        }
    }, [blocker]);

    useEffect(() => {
        function handleBeforeUnload(event) {
            event.preventDefault();
            event.defaultValue = MESSAGE;
        }

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);
}