@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Do you want to re/install the NPM modules (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END
cls
echo --- STARTING NPM RE/INSTALLATION ---
echo (This can take a while! CMD will close itself when the process is finished.)
echo.
npm i
:END
endlocal