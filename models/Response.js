const { errorLog } = require('../helper')

module.exports = class Response {
    #status
    #ok
    #body
    #count
    /**
     * @param {Number} status status code
     * @param {JSON} body request body
     * @param {Number} count number of response
     */
    constructor(status, body, count = -1) {
        this.#status = status
        this.#body = body
        this.#count = count

        this.#ok = Math.floor(status / 100) === 2

        if (Math.floor(status / 100) === 5) {
            errorLog(this.#body)
        }
    }

    /**
     * status code
     */
    get status() {
        return this.#status
    }
    /**
     * true if the response is ok else false
     */
    get ok() {
        return this.#ok
    }
    /**
     * the response body
     */
    get body() {
        return this.#body
    }
    /**
     * the number of response
     */
    get count() {
        return this.#count
    }

    /**
     * transform the response Object to JSON
     * @returns JSON version of the response
     */
    toJson() {
        return {
            status: this.#status,
            ok: this.#ok,
            body: this.#body,
            count: this.#count,
        }
    }
}
