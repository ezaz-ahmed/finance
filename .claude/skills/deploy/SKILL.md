---
name: deploy
description: Deploy to staging. Use when user says "deploy", "/deploy", "push to staging", or "ship to staging". Runs tests, builds production bundle, then pushes to staging branch.
disable-model-invocation: true
allowed-tools: Bash
---

# Deploy to Staging

## Current State
- Branch: !`git branch --show-current`
- Git status: !`git status --short`
- Last commit: !`git log --oneline -1`

## Steps

Run these steps in order. Stop and report failure if any step fails — do not continue to the next step.

### 1. Run Tests
```
npm test
```
If no test script exists, run lint instead:
```
npm run lint
```
Report result. Abort deploy if this fails.

### 2. Build Production Bundle
```
npm run build
```
Report build output and any warnings. Abort if build fails.

### 3. Push to Staging
Ensure `staging` branch exists and push current branch merged into it:
```
git push origin HEAD:staging
```
If `staging` branch does not exist on remote, create it:
```
git push origin HEAD:staging --force-with-lease
```

## Report

After all steps complete, summarize:
- Tests: pass/fail
- Build: success/fail, bundle size if available
- Staging: pushed commit hash and branch