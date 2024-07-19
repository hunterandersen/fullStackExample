# Super Hero Full Stack Example

A web app that allows access to super hero data. 
Users can easily view and manipulate the data as they see fit, all within our custom made client views.
The clients communicate with the server, which in turn, communicates with the database.

## Installing and Running Locally

### Git
- `git clone `
### MySQL
- Run the `marvel_heros.sql` script inside of `sqlDB/` to create a local instance of the database
    - See the `sqlInfo.md` file for more help
### NPM Install & Run
#### Server
- `cd src/server`
- `npm install`
- > Also create a `.env` file inside the `server` folder with a `PORT` number
- `npm run dev`


#### Client
- `cd src/clients/vite-react-client`
- `npm install`
- > Also create a `.env` file inside the `vite-react-client` folder with a `VITE_PORT` number
- `npm run dev`
- Open your browser to the now running react app