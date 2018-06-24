(async function () {

    //wrap value to promise
    async function demoAsync() {
        return 1;
    }

    let ret = demoAsync();
    console.log(ret);

    let ret2 = await ret;
    console.log(ret2);

    //wrap returned promise
    let ret3 = null;
    async function demo2Async() {
        ret3 = demoAsync();
        return ret3;
    }

    let ret4 = demo2Async();
    console.log(await ret3);
    console.log(await ret4);
    console.log(ret4 === ret3);

    //await
    async function demo3Async() {
        let val = await demoAsync();
        console.log(val);

        val = await 2;
        console.log(val);

        try {
            val = await (async () => {
                throw new Error("I'm uncaughted exception!");
            })();
            console.log(val);
        } catch (error) {
            console.log("error is handled!");
        }

        val = await 3;
        console.log(val);
    }
    await demo3Async();
})();