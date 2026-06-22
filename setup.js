const fs = require('fs');

const VERSIONS = ['gpt-5.4', 'gpt-5.5'];

module.exports = async function beforeAll() {
    for (const version of VERSIONS) {
        const dir = `./test/${version}`;

        fs.rmSync(dir, { recursive: true, force: true });
        fs.mkdirSync(dir, { recursive: true });
        fs.cpSync('./fixtures/.agents', `${dir}/.agents`, { recursive: true });
    }
};