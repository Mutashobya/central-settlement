'use strict';

const Boom = require('boom');
const dataAccess = require('../../data/settlementWindows/{settlementWindowId}.js')

/**
 * Operations on /settlementWindows/{settlementWindowId}
 */
module.exports = {
    /**
     * summary: If the settlementWindow is open, it can be closed and a new window created. If it is already closed, return an error message. Returns the new settlement window.
     * description: 
     * parameters: settlementWindowId, settlementWindowClosurePayload
     * produces: application/json
     * responses: 200, 400, 401, 404, 415, default
     */
    post: async function closeSettlementWindow(request, h) {
        const getData = new Promise((resolve, reject) => {
            switch (request.server.app.responseCode) {
                case 200:
                case 400:
                case 401:
                case 404:
                case 415:
                    dataAccess.post[`${request.server.app.responseCode}`](request, h, (error, mock) => {
                        if (error) reject(error)
                        else if (!mock.responses) resolve()
                        else if (mock.responses && mock.responses.code) resolve(Boom.boomify(new Error(mock.responses.message), {statusCode: mock.responses.code}))
                        else resolve(mock.responses)
                    })
                    break
                default:
                    dataAccess.post[`default`](request, h, (error, mock) => {
                        if (error) reject(error)
                        else if (!mock.responses) resolve()
                        else if (mock.responses && mock.responses.code) resolve(Boom.boomify(new Error(mock.responses.message), {statusCode: mock.responses.code}))
                        else resolve(mock.responses)
                    })
            }

        })
        try {
            return await getData
        } catch (e) {
            throw (Boom.boomify(e))
        }

    }
};
