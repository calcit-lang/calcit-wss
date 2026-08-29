# Ignore local Calcit agent state

`.calcit/` stores local cursor, error, snippet, and PR/Issue draft files used by
Calcit-aware maintenance. It is now ignored so these machine-local artifacts do
not make the worktree dirty or enter module releases.

`.calcit/` 用于保存本机 cursor、error、snippet 以及 PR/Issue 草稿；现在统一忽略，
避免 Agent 本地状态污染模块发布提交。
