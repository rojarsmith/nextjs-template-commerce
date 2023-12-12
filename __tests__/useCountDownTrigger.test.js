const { renderHook, act } = require("@testing-library/react");
const { default: useCountDownTrigger } = require("@/hooks/useCountDownTrigger");

describe('useCountDownTrigger', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it('complete after 3 seconds', () => {
        const { result } = renderHook(() => useCountDownTrigger({ seconds: 3 }));
        // check initial value
        expect(result.current[0]).toBe(false); // isCompleted
        expect(result.current[1]).toBe(false); // isCounting

        act(() => {
            result.current[2](); // startCountDown
        });

        expect(result.current[1]).toBe(true);

        act(() => {
            jest.advanceTimersByTime(3000);
        });
        console.log(result)
        expect(result.current[0]).toBe(true); // isCompleted
        expect(result.current[1]).toBe(false); // isCounting
    })

    afterAll(() => {
        jest.useRealTimers();
    });
})