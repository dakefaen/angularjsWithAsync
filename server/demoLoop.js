(async () => {
    var request = require('request-promise');

    function httpGet(url) {
        return request.get(url).then(html => html.slice(0, 200));
    }

    async function logContent1(urls) {
        for (let url of urls) {
            let content = await httpGet(url);
            console.log(content);
            console.log("\n");
        }
    }

    async function logContent2(urls) {
        urls.forEach(async url => {
            let content = await httpGet(url);
            console.log(content);
            console.log("\n");
        });
        // Not finished here
        console.log("end of logContent2");
    }

    async function logContent3(urls) {
        var promises = urls.map(async url => {
            let content = await httpGet(url);
            console.log(content);
            console.log("\n");
        });

        await Promise.all(promises);

        console.log("end of logContent3");
    }

    let urls = ["http://www.baidu.com", "http://www.163.com"];

    await logContent1(urls);

    await logContent2(urls);

    await logContent3(urls);

})();

