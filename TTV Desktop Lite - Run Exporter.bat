@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Do you want to export a local TTV Desktop Lite build (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END
cls
echo --- EXPORTING TTV DESKTOP LITE ---
echo (This can take a while! CMD will close itself when the process is finished.)
echo.
npm run build
:END
endlocal
