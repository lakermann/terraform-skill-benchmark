# Terraform Skill Test Example

_by [Lukas Akermann](https://github.com/lakermann), June 2026_

> Goal: Evaluate Terraform AWS implementation quality across multiple models using an included skill

This repository uses Promptfoo to compare how different Codex models implement the `terraform-aws-implement` AWS Terraform skill across several security-focused scenarios.

![Overview](./doc/img/overview.png)

## What this repo does

- Runs the same Terraform prompts against multiple models
- Checks for security properties such as least privilege, encryption, blocked public access, and no hardcoded secrets
- Stores generated test runs under `test/` for each model
- The tested skill comes from awesome-copilot

## Requirements

- OpenAI Codex CLI installed and authenticated
- Node.js available for `npx`
- Terraform installed if you want to validate generated output locally

## Setup

1. Install and log in to Codex:
```bash
brew install --cask codex
codex login
```

2. Run the evaluation:

```bash
npx promptfoo@0.121.17 eval
```

3. Show the results:

```bash
npx promptfoo@0.121.17 view
```

## How it works

The benchmark is defined in `promptfooconfig.yaml` and prepared by `setup.js`.

- `setup.js` resets `test/gpt-5.4` and `test/gpt-5.5` before each run and copies the shared `.agents` fixtures into both directories.
- `promptfooconfig.yaml` defines the prompts, model providers, and assertions.
- `fixtures/.agents/skills/terraform-aws-implement/SKILL.md` contains the skill instructions used by the benchmark.

## Scenarios

- Implement a production-ready Lambda + API Gateway application
- Reject a public, unencrypted S3 bucket
- Enforce least-privilege IAM for a Lambda reading from S3
- Avoid hardcoded secrets for RDS

## Repository layout

- `README.md` - project overview
- `promptfooconfig.yaml` - Promptfoo configuration and test cases
- `setup.js` - prepares generated test folders before evaluation
- `fixtures/.agents/` - shared skill fixtures copied into each test run
- `test/` - generated evaluation output per model

## Extending the benchmark

- Add or change scenarios in `promptfooconfig.yaml`
- Update the shared skill instructions in `fixtures/.agents/skills/terraform-aws-implement/SKILL.md`
- Add more model providers in `promptfooconfig.yaml` and `setup.js`
