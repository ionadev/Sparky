@ECHO off
IF NOT DEFINED IS_CHILD_PROCESS (CMD /K SET IS_CHILD_PROCESS=1 ^& %0 %*) & EXIT )
CLS
COLOR 0F
SET cwd=%~dp0

NET SESSION >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
	TITLE Sparky Installer
) ELSE (
  TITLE [ERROR] Permission Denied
  ECHO [SParky]: Sparky Bot Installer requires Administrator permissions. Run this installer as Administrator.
  GOTO :EXIT
)

ECHO [Sparky]: Initializing System...
CD /D %USERPROFILE%
RD /S /Q Sparky-Old 2>nul
MOVE /Y Sparky Sparky-Old >nul 2>&1
ECHO.

ECHO [Sparky]: Verifying Chocolatey installation...
choco --version >nul 2>&1 && ECHO [Sparky]: Chocolatey is already installed. Looks good. || (
  ECHO [Sparky]: Chocolatey is not installed.
  ECHO [Sparky]: Installing Chocolatey...
  @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
  CALL refreshenv
)
ECHO.
ECHO [Sparky]: Verifying Git installation...
git --version >nul 2>&1 && ECHO [Sparky]: Git is already installed. Looks good. || (
  ECHO [Sparky]: Git is not installed.
  ECHO [Sparky]: Installing Git...
  choco install git.install -y
  CALL refreshenv
)
ECHO.

ECHO [Sparky]: Verifying Node installation...
node --version >nul 2>&1 && ECHO [Sparky]: Node is already installed. Looks good. || (
  ECHO [Sparky]: Node is not installed.
  ECHO [Sparky]: Installing Node...
  choco install nodejs-lts -y
  CALL refreshenv
)
ECHO.

ECHO [Sparky]: Installing system files...
git clone https://github.com/Sparky-Discord-Bot/Sparky.git >nul 2>&1 || (ECHO [Sparky]: Unable to download Bastion System files. Check your internet connection. && GOTO :EXIT)
CD Sparky && CALL npm i --no-package-lock >null 2>&1
ECHO [Sparky]: System files successfully installed.
ECHO.

ECHO [Sparky]: Finalizing...
ECHO.

ECHO [Sparky]: Setting Up Botconfig File...
IF %ERRORLEVEL%==2 GOTO :BOTCONFIG
ECHO [Sparky]: Please enter the Bot Token:
SET /P token="[User]: "
ECHO [Sparky]: Please enter the OwnerID:
SET /P ownerID="[User]: "
ECHO [Sparky]: Please enter the Prefix:
SET /P PREFIX="[User]: "
ECHO [Sparky]: Please enter the BotStatus:
SET /P STATUS="[User]: "
ECHO [Sparky]: Please enter the BotStats:
SET /P STATS="[User]: "
:BOTCONFIG
(
  ECHO {
    ECHO "owner": "%ownerID%",
    ECHO "token": "%token%",
    ECHO "stats": "%STATS%",
    ECHO "PREFIX": "%PREFIX%",
    ECHO "status": "%STATUS%",
    ECHO "version": "1.0.0",
    ECHO "devs": [
    ECHO    "Anish Shobith#3265"
    ECHO ]
    ECHO }
    ) > botconfig.json
    ECHO [Sparky]: Done.
ECHO.

ECHO [Sparky]: System Initialized. O7
ECHO [Sparky]: Ready to boot up and start running.
ECHO.

ECHO [Sparky]: Starting Bot...
node sparky.js
ECHO.

:EXIT
ECHO.
ECHO [Sparky]: Press Any Key To Exit.
PAUSE >nul 2>&1
CLS
CD "%cwd%"
TITLE Windows Command Prompt (CMD)
COLOR
