cd /d %~dp0
git tag -d staging
git push origin :refs/tags/staging
git tag staging
git push origin staging