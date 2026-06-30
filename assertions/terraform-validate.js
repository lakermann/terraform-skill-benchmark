const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

module.exports = async (output, context) => {
    const terraformDir = path.resolve('./working-dir');

    if (!fs.existsSync(terraformDir)) {
        return {
            pass: false,
            score: 0,
            reason: `Terraform directory does not exist: ${terraformDir}`,
        };
    }

    try {
        execFileSync('terraform', ['init', '-backend=false', '-input=false'], {
            cwd: terraformDir,
            encoding: 'utf8',
            stdio: 'pipe',
            timeout: 120_000,
        });

        const result = execFileSync('terraform', ['validate', '-no-color'], {
            cwd: terraformDir,
            encoding: 'utf8',
            stdio: 'pipe',
            timeout: 120_000,
        });

        return {
            pass: true,
            score: 1,
            reason: result || 'terraform validate succeeded',
        };
    } catch (err) {
        return {
            pass: false,
            score: 0,
            reason:
                err.stderr?.toString() ||
                err.stdout?.toString() ||
                err.message,
        };
    }
};