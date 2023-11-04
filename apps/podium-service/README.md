# podium-service

## Instructions

To install all dependencies:  
`yarn nx install podium-service`

If you have not previously set up the database, make sure Docker is running and run the following command:  
`yarn nx db-setup podium-service`

To start the database when Docker is running:
`yarn nx db-start podium-service`  
By default, the database runs on port 5432

If you have not previously set up the Chalice config, copy `example.config.json` under the `.chalice` folder and rename the new file as `config.json`. Then replace the redacted environment variables.  
If you are running the database locally, the default username and password should be `postgres`.

To start the server locally (make sure the database is running):  
`yarn nx serve podium-service`
