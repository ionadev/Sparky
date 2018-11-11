echo off
echo [Sparky]: Cloning Project
git clone https://github.com/Sparky-Discord-Bot/Sparky
cd Sparky 
cls
echo [Sparky]: Installing Packages
npm install
cls
echo [Sparky]: Setup Bot
pause
node sparky.js
pause
