# Agent Instructions

## Tool Quirks

- `suggest_prompts`: Ensure the `prompts` parameter is passed as a proper JSON array object, not a stringified version. Passing `props` as a string causes "Invalid parameters" errors.

## Meta-Prompting Awareness

- Repeated meta-workflow prompts ("adversarially review", "verify behavior", "simplify the change", "commit", "merge PR", "open PR", "save learnings") may arrive even when no code change exists. Each is a legitimate tool in the right context, but when the repo shows `git diff` empty and no commits, the correct response is to report there is nothing to act on rather than inventing work.
- Always establish whether changes exist before attempting any workflow gate (review, test, commit, merge).

## Repository State

- This repo is initialized with no commits and no remotes. The working tree is in a Windows user home directory (paths include `AppData`, `OneDrive`, `NTUSER.DAT`). Git warns about permission-denied access to system directories; these are expected and benign.
