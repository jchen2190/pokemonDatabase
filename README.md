# pokemonDatabase

## General Info
Created an application where users can login, check out and favorite their pokemon. 

<br><br>
## Setup

### Node Installation
Go to [Official Node.js Website](https://nodejs.org) and download the installer per your operating system.

After node is installed, install the modules by running the following commands in the terminal to install package dependencies.
<br><br>

### MongoDB
Use MongoDB database. Import file `allPokemon.json` in the folder `./models/` for original data.

Create file `.env` and add the following code into your file:
```
MONGODB_URI="<Your MongoDB Connection String>"
```
`<Your MongoDB Connection String>` is where you connect with your MongoDB database deployment and insert your connection string info.
<br><br>

### Run
Run the following in the terminal to get dependencies:

```
npm install
```
Dependencies that will be installed:<br>
- bcrypt - v5.1.0
- cookie-parser - v1.4.6
- dotenv - v16.0.3
- ejs - v3.1.9
- express - v4.18.2
- express-session - v.1.17.3
- method-override - v3.0.0
- mongoose - v7.0.3
- nodemon - v2.0.22


You can run the application by typing the following in the command line:
```
node index.js
```
The port will be on <b>localhost:8080</b>. Type in the URL to access content.<br><br>

## Usage

- Add new pokemon
- Update pokemon
- Delete pokemon