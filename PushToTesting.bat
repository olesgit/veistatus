setlocal EnableDelayedExpansion 

SET /P input=Enter next version number (e.g. 1.1): 
SET tagName=v%input%-rc.
SET increment=1

FOR /l %%I IN (1,1,10) DO (
    FOR /F "tokens=1 delims= " %%A IN ('git tag -l %tagName%%%I') DO SET /A increment+=1
)

IF %increment% EQU 10 (
    ECHO All tag-variations for %input% have been taken; you're doing something wrong
    GOTO :eof
)

:next

SET tag=%tagName%%increment%

git tag %tag% 1> NUL 2> NUL
git push origin %tag% 1> NUL 2> NUL

git tag -d testing 1> NUL 2> NUL
git push origin :refs/tags/testing 1> NUL 2> NUL
git tag testing 1> NUL 2> NUL
git push origin testing 1> NUL 2> NUL

ECHO Tag created: %tag%