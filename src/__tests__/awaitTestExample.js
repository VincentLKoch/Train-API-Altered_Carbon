const timeoutPromise = (second) => {
    return new Promise(resolve => setTimeout(resolve, second * 1000));
};

describe('AWAIT TEST EXAMPLE', () => {
    it("AWAIT TEST EXAMPLE", async () => {
        const stamp = Math.floor(Date.now() / 1000)

        await timeoutPromise(2)
        console.error(Math.floor(Date.now() / 1000) - stamp + "sec")

        expect(true).toBe(true)
    })
})
