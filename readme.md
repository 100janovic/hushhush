# REPO URL
https://github.com/100janovic/hushhush

1) Install node from https://nodejs.org/en (check if you have already installed by running command bellow)
- after installation run command `node -v` to confirm that you have installed correctly

2) Install all packages
- navigate in "server" folder in terminal and run command `npm install`

3) In server folder add file .env with this content (Database URL and secret will be provided)
DATABASE_URL=""
TOKENSECRET=""

4) Pull database schema in terminal (still in the server folder)
- `npx prisma db pull`

5) Run initialization for database in terminal (still in the server folder)
- `npx prisma generate`

6) Start the server by running this command in terminal (still in the server folder)
- `npm run start`

7) Confirm that server is running by visiting this URL: `http://localhost:3000/api/secrets`
(you should see "Unauthorized" message)