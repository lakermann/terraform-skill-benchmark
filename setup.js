import fs from 'node:fs';
import {randomUUID} from "node:crypto";
import path from "node:path";

const FIXTURES_DIR = './fixtures/.agents';
const WORKING_DIR = './working-dir';
const TEST_RUNS_DIR = './test-runs'

function sanitizeFolderName(value) {
    return String(value).replace(/[^a-zA-Z0-9._-]/g, '-');
}

export async function beforeEach(context) {
    context.test.vars ??= {};
    context.test.vars.run_id = randomUUID();
    
    fs.rmSync(WORKING_DIR, { recursive: true, force: true });
    fs.mkdirSync(WORKING_DIR, { recursive: true });
    fs.cpSync(FIXTURES_DIR, `${WORKING_DIR}/.agents`, { recursive: true });
}

export async function afterEach(context) {
    const { test, result } = context;
    
    const providerLabel = result.provider.label;
    const caseId = sanitizeFolderName(test.description.toLowerCase());

    const destination = path.join(
        TEST_RUNS_DIR,
        sanitizeFolderName(providerLabel),
        caseId,
        test.vars.run_id,
    );

    fs.cpSync(WORKING_DIR, destination, { recursive: true });
}