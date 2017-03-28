@ECHO OFF
setlocal EnableDelayedExpansion 

SET /P input=Enter tag to promote to production (e.g. v1.1-rc.1 or testing): 

FOR /F "tokens=1 delims= " %%A IN ('git log -n 1 "--format=format:%%H" %input% 2^>NUL') DO (
    IF errorlevel 0 (
        SET sha1=%%A
    )
    if errorlevel 1 (
        ECHO Unknown tag specified
        GOTO :eof
    )
)

SET /P tagName=Enter next version number (e.g. 1.1): 
SET tag=v%tagName%

echo Production tag with name %tag% will be promoted from %input%

set /p confirmed=You are about to push to PROD, are you sure [y/n]?: 
IF  "%confirmed%" neq "y" (
    echo "Aborting..."
    GOTO :eof
)

set /p secondConfirmed=You are not doing anything stupid now, RIGHT [y/n]?: 
IF "%secondConfirmed%" neq "n" (
    echo "Aborting..."
    GOTO :eof
)

git tag %tag% %sha1% 1> NUL 2> NUL
git push origin %tag% 1> NUL 2> NUL

git tag -d production 1> NUL 2> NUL
git push origin :refs/tags/production 1> NUL 2> NUL
git tag production %sha1% 1> NUL 2> NUL
git push origin production 1> NUL 2> NUL

ECHO Tag created: %tag%