# We love hack News!

Hello!, yoy can see every story or news that you want to check!!

## Some info

We asume that you have node and mongodb already installed and running.

## Quickstart

1.- Clone repo: `git clone https://github.com/Kaladinstorm/news.git`.

2.- Install with npm: `npm install`

3.- Configure DB:

    You have to change the next file with your database configs:
    
        `./config/config.json`

            `{
                "hostname": "yourHostName",
                "port": "yourPort",
                "dbName": "yourDbName",
                "username": "YourUsername", // If you are not using one, just let it blank <"">
                "password": "yourPassword" // If you are not using one, just let it blank <"">
            }`

4.- Init application: `npm start`.

5.- Getting news: Using your favorite browser, go to the next URL: `http://<localhost>:<3000>/getApi`.

6.- Enjoy `http://<localhost>:<3000>/news` !

## Features

    * Once an hour, and in the minute 30, the app will request the Api. You can change this in app.js, line 29:
        `30 * * * *`   
 
