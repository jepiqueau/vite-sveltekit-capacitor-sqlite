
# Creating a Vite SvelteKit project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create vite@latest my-app
```

 - Select `Svelte` as Framework and `SvelteKit` as variant

 - Select `Skeleton project` as `Svelte app template`

 - Select `Yes, using TypeScript syntax`

 - Select `Add ESLint for code linting` and `Add Prettier for code formatting`

```bash
    cd my-test
    npm install
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.


## Installing Capacitor

```bash
npm i @capacitor/core @capacitor/cli
npx cap init
```

Fill
 - Name: my-app
 - Package Id: YOUR_PACKAGE_ID  

## Installing others Package

```bash
npm i @capacitor-community/sqlite @capacitor/toast @ionic/pwa-elements rxjs
npm i -D copyfiles rimraf
```

## Package.json

 Edit the scripts in the package.json file like below

 ```json
    "scripts": {
		"dev": "npm run copy:sql:wasm && vite dev",
		"build:web": "npm run copy:sql:wasm && vite build",
		"build:native": "npm run remove:sql:wasm && vite build",
		"copy:sql:wasm": "copyfiles -u 3 node_modules/sql.js/dist/sql-wasm.wasm static/assets",
		"remove:sql:wasm": "rimraf static/assets/sql-wasm.wasm",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"lint": "prettier --check . && eslint .",
		"format": "prettier --write ."
	}, 
 ```

# Running on Web

 ```bash
 npm run dev
 ```
 - In the Home Page, select the menu icon and press on users.

 - In the Users Page 

    - Add some users in the Add User input field
    - The Current Users list will be updated
    - For each row in the list, 
        - you can update the checkbox to tell id the user is active or not 
        - delete the user on pressing on the trash icon


 To see the database created 
 - open the Application tab of the browser tools
 - a `jeepSqliteStore`has been created in IndexedDB 
 - open it and select database folder
 - database myuserdbSQLite.db has been created 

# Running Native (to come)