"use client"
import React, { useState, useRef, useMemo, useCallback } from "react";

const Page = () => {
    const [buttonState, setButtonState] = useState(false);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const handleClickButton = () => {
        setButtonState(!buttonState);
    }

    const increment1 = () => {
        setCount1(count1 + 1);
    };

    const increment2 = useCallback(() => {
        setCount2(count2 + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count1]);

    return (
        <>
            <button className="bg-yellow-400 text-black rounded-3xl px-3"
                onClick={handleClickButton}>
                click
            </button>
            <div>buttonState={buttonState ? "true" : "false"}</div>
            <CommonComponent prop={"CommonComponent"} />
            <UnmemorizedComponent prop={"UnmemorizedComponent"} />
            <MemorizedComponent prop={"MemorizedComponent"} />
            <UnmemorizedObjectComponent prop={{ content: "UnmemorizedObjectComponent" }} />
            <MemorizedObjectComponent prop={{ content: "MemorizedObjectComponent" }} />
            <ComponentWithoutUseMemo />
            <ComponentWithUseMemo />
            <div>
                <button className="bg-yellow-400 text-black rounded-3xl px-3"
                    onClick={increment1}>
                    ComponentWithoutUseCallback click1
                </button>
                Count: {count1}
            </div>
            <div>
                <button className="bg-yellow-400 text-black rounded-3xl px-3"
                    onClick={increment2}>
                    ComponentWithUseCallback click2
                </button>
                Count: {count2}
            </div>
        </>
    )
}

const CommonComponent = ({ prop }) => {
    let refCount = 0;
    refCount++;

    return (
        <div>
            {prop}, count = {refCount}
        </div>
    )
}

const UnmemorizedComponent = ({ prop }) => {
    const refCount = useRef(0);
    refCount.current++;

    return (
        <div>
            {prop}, count = {refCount.current}
        </div>
    )
}

const MemorizedComponent = React.memo(UnmemorizedComponent)

const areEqual = (prevProp, nextProp) => {
    if (prevProp.content === nextProp.content) {
        return true
    } else {
        return false
    }
}

const UnmemorizedObjectComponent = ({ prop }) => {
    const refConunt = React.useRef(0)
    refConunt.current++

    return (
        <div>{prop.content}, count = {refConunt.current}</div>
    );
}

const MemorizedObjectComponent = React.memo(UnmemorizedObjectComponent, areEqual)

const ComponentWithoutUseMemo = () => {
    const refCount = useRef(0);

    const complexCalculation = () => {
        refCount.current++;
        return refCount.current;
    }

    const value = complexCalculation();

    return (
        <div>ComponentWithoutUseMemo, value={value}</div>
    )
}

const ComponentWithUseMemo = () => {
    const refCount = useRef(0);

    const complexCalculation = () => {
        refCount.current++;
        return refCount.current;
    }

    const value = useMemo(() => complexCalculation(), [])

    return (
        <div>ComponentWithUseMemo, value = {value}</div>
    );
}

export default Page;