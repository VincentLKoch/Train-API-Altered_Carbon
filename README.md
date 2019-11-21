# <center>Train-API-Altered_Carbon</center>

### `npm install`

install this project node dependancy

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

## <center>Docker command</center>

### Command to run the container on port 3306 in a detached mode
```bash
docker container run -d -p 3306:3306 --name alteredcarbon flotorel/mysql_alteredcarbon:5
```

### Command to enter in the running container using the name that we gave it
```bash
docker container exec -it alteredcarbon bin/bash
```
Once you are in the container you could use any mysql command. For example to connect to the mysql instance:

```bash
mysql -u root  -p
```
## <center>How to access your database ?</center>

Once you have running container on a specific port, from the previous command line you're running your container on the 3306.


    user: root
    password: root
    host: 0.0.0.0
    port: 3306
    database: db_alteredCarbon

You could access your database using the mysql command:

```bash
mysql -u root -P 3306 -h 0.0.0.0 -D db_alteredCarbon -p
```
### <center> Common Command </center>

`list all docker :`<br>

```bash
Docker ps
```
`list all docker including killed one :`<br>

```bash
Docker ps -l
```
`kill docker :`<br>

```bash
Docker kill [docker ID]
```
`Remove docker :`<br>
```bash
Docker rm [docker ID]
```