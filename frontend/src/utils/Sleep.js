/**
 * Responsible for making an asynchronous timeout and with the option to execute a function (possibly async) after the timeout
 * and resolve the promise according to this callback. 
 * @param {number} ms
 * @param {function} func
 * @param {any} func arguments to execute
 * @returns {Promise}
 */
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
