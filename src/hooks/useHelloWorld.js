import { useState } from "react";

const useHelloWorld = () => {
    const [var1, setVar1] = useState("Hello");
    const [var2, setVar2] = useState("World");

    return {
        var1,
        var2
    };
}

export default useHelloWorld;