"use client"
import useCountDownTrigger from "@/hooks/useCountDownTrigger";
import { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [isCompleted1, isCounting1, startCountDown1] = useCountDownTrigger({ seconds: 3 });

  const cb = useCallback(() => startCountDown1(), [startCountDown1]);

  useEffect(() => {
    if (!isCounting1 && !isCompleted1) {
      cb()
    }
  }, [cb, isCounting1, isCompleted1])

  useEffect(() => {
    if (isCompleted1) {
      console.log('isCompleted1')
    }
  }, [isCompleted1])

  return (
    <main className="">
      <div className="">
        <div>
          isCompleted1 = {isCompleted1 ? "true" : "false"}
        </div>
        <div>
          isCounting1 = {isCounting1 ? "true" : "false"}
        </div>
        <button onClick={startCountDown1}
          className="bg-yellow-400 text-black rounded-3xl px-3"
        >onClick startCountDown1</button>
      </div>
    </main>
  )
}

export default Page;
