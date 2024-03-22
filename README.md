
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

# Running Native 


## Package.json

 Add the following scripts to the `package.json` file

 ```json
 "scripts": {
	...

    "ios:start": "npm run remove:sql:wasm && npm run build:native && npx cap sync && npx cap copy && npx cap open ios",
    "android:start": "npm run remove:sql:wasm && npm run build:native && npx cap sync && npx cap copy && npx cap open android",
    "electron:install": "cd electron && npm install && cd ..",
    "electron:prepare": "npm run remove:sql:wasm && npm run build && npx cap sync @capacitor-community/electron && npx cap copy @capacitor-community/electron",
    "electron:start": "npm run electron:prepare && cd electron && npm run electron:start",
	...
 }
 ```

## Update the svelte.config.js

 Modify the adapter from `adapter-auto` to `adaper-static` too get an `index.html` file required by Capacitor during the build process.

 ```bash
 npm i @sveltejs/adapter-static
 ```

 The `svelte.config.js`should look like this

 ```js
	import adapter from '@sveltejs/adapter-static';
	import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

	/** @type {import('@sveltejs/kit').Config} */
	const config = {
		// Consult https://kit.svelte.dev/docs/integrations#preprocessors
		// for more information about preprocessors
		preprocess: vitePreprocess(),

		kit: {
			// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
			// If your environment is not supported or you settled on a specific environment, switch out the adapter.
			// See https://kit.svelte.dev/docs/adapters for more information about adapters.
			adapter: adapter({
				fallback: 'index.html'
			}),
		}
	};

	export default config;
 ```

## Update the capacitor.config.ts

 Add the plugin parameters to the `capacitor.congig.ts` file

 ```ts
const config: CapacitorConfig = {
    appId: 'YOUR_APP_ID',
    appName: 'YOUR_APP_NAME',
    webDir: 'build',
/*    loggingBehavior: 'debug', */
    server: {
        androidScheme: "http"
    },
    plugins: {
        CapacitorSQLite: {
        iosDatabaseLocation: 'Library/CapacitorDatabase',
        iosIsEncryption: false,
        iosKeychainPrefix: 'ionic7-react-sqlite-app',
        iosBiometric: {
            biometricAuth: false,
            biometricTitle : "Biometric login for capacitor sqlite"
        },
        androidIsEncryption: false,
        androidBiometric: {
            biometricAuth : false,
            biometricTitle : "Biometric login for capacitor sqlite",
            biometricSubTitle : "Log in using your biometric"
        },
        electronIsEncryption: false,
        electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
        electronMacLocation: "/Volumes/Development_Lacie/Development/Databases",
        electronLinuxLocation: "Databases"
        }
    }
};
```
## Add a `+layout.ts` File in the `routes` directory. 

 ```ts
	export const ssr = false;
	export const prerender = false;
 ```

## iOS Platform

 ```bash
	npm i @capacitor/ios
	npm run build:native
	npx cap add ios
	npm run ios:start
 ```

 In Xcode build and run the App

## Android Platform

 ```bash
	npm i @capacitor/android
	npm run build:native
	npx cap add android
	npm run android:start
 ```

 In Xcode build and run the App
