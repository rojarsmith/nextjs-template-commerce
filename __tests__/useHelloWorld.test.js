const { renderHook } = require("@testing-library/react")
const { default: useHelloWorld } = require("@/hooks/useHelloWorld");

describe('useHelloWorld', () => {
    it('execute 1 time', () => {
        const { result } = renderHook(() => useHelloWorld());
        expect(result.current.var1).toBe('Hello');
        expect(result.current.var2).toBe('World');
    })
})