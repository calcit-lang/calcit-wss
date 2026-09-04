# Fix Calcit toolchain setup / 修复 Calcit 工具链安装

- Upgrade CI from `calcit-lang/setup-calcit@v1.3.0` to v1.4.0.
- Use the release that installs and caches standalone `calcit-caps` instead of
  requesting a Caps asset from the Calcit release, which returned HTTP 404 for
  Calcit 0.13.76.

- 将 CI 从 `calcit-lang/setup-calcit@v1.3.0` 升级到 v1.4.0。
- 使用独立安装与缓存 `calcit-caps` 的版本，避免为 Calcit 0.13.76 请求不存在的
  Caps release asset 而返回 HTTP 404。

## Validation / 验证

- Confirmed the failed GitHub Actions log stopped in setup before tests.
- Confirmed setup-calcit v1.4.0 release notes describe standalone Caps setup.
- `git diff --check`
