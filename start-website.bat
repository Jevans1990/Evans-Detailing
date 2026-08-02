@echo off
cd /d "%~dp0"
echo Starting website...
call npm run dev
echo If you see this, npm failed to start.
pause