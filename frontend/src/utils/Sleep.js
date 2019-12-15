export default class Sleep {
    static async run(ms, func, ...args) {
        let __exec = undefined;
        return new Promise((resolve, reject) => {
            console.log(`[SLEEP] - Awaiting for ${ms} ms...`);
            setTimeout(async () => {
                console.log(`[SLEEP] - Executing your function now.`)
                if (typeof func === 'function') {
                    try {
                        const isAsync = func.constructor.name === "AsyncFunction";
                        if (isAsync) __exec = await func(...args);
                        else __exec = func(...args);
                    } catch (e) {
                        if (!__exec) reject(`[SLEEP] - Callback crashed with the error ${e.message}.`)
                    }
                    if (!__exec) return reject("[SLEEP] - Callback returned a falsy input.");
                    return resolve(__exec);
                }
                resolve();
            }, ms);
        });
    }
}
