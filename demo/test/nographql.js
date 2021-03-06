const test = require('test');
test.setup();

const { serverBase } = require('../')

const http = require('http');
const util = require('util');

describe("nographql", () => {
    const testData = {
        foo: Date.now(),
        bin: new Buffer(123)
    }
    it('init data', () => {
        var rep = http.post(serverBase + '/1.0/app/nographql', {
            json: testData
        });
        assert.equal(rep.statusCode, 201);
        assert.property(rep.json(), "id");
    })

    it('error for when graphql-query', () => {
        var rep = http.post(serverBase + `/1.0/app`, {
            headers: {
                'Content-Type': 'application/graphql'
            },
            body: `{
                nographql{
                    foo,
                    bin
                }
            }`
        });

        assert.equal(rep.statusCode, 200);
        const response = rep.json()
        assert.property(response, 'errors');
        assert.isArray(response.errors);
        assert.equal(response.errors[0].message, `Cannot query field "nographql" on type "Query".`);
    });

    it('success in rest', () => {
        var rep = http.get(serverBase + '/1.0/app/nographql');

        const response = rep.json()
        assert.isArray(response)
        const item = response[0]

        assert.property(item, 'id');
        assert.property(item, 'foo');
        assert.isTrue(util.isBuffer(item.bin));

        assert.deepEqual(item.bin, testData.bin)
    })
});
