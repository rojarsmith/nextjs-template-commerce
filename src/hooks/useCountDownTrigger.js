"use client"
import { useCallback, useEffect, useState } from "react";

/**
 * @seconds {Number} Totail
 */
const useCountDownTrigger = ({ seconds }) => {
    const [isCounting, setIsCounting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    let createTimeout =  useCallback(() => {},[]);

    useEffect(() => {
        if (isCounting) {
            console.debug('isCounting =', isCounting);
            let timerId = createTimeout();
            return () => clearTimeout(timerId)
        }
    }, [isCounting, createTimeout]);

    createTimeout = useCallback(
        () => {
            let timerId;
            timerId = setTimeout(() => {
                setIsCounting(false);
                setIsCompleted(true);
            }, seconds * 1000);

            return timerId;
        }
        , [seconds])

    const startCountDown = useCallback(() => {
        if (isCounting) {
            return;
        }

        setIsCounting(true);
        setIsCompleted(false);
    }, [isCounting]);

    return [isCompleted, isCounting, startCountDown];
};

export default useCountDownTrigger;