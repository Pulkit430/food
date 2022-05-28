#/bin/bash
cd /home/ubuntu/foodsenso
sudo npm install --force
killall node
 forever start -c "npm start" ./ 
