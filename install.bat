@echo off
md "C:\\data\\db"
md "C:\\mongo\\logs"
call mongod --logpath C:\\mongo\\logs\\server.log --install
call npm install
call npm run build
call npm install -g qckwinsvc
call npm install -g bower
call npm install -g bower-installer
call bower-installer
call qckwinsvc --name "ims" --description "Inventory Management System" --script "build/server.js" --startImmediately
echo "Done"
