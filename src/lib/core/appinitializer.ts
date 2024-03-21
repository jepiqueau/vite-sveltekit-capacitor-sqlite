import logger from '$lib/core/logger';
import { sqliteService } from '$lib/databases/SQLiteService';
import { userService } from '$lib/databases/UserService';

class AppInitializer {
    platform: string = sqliteService.getPlatform();
    async initialize() {
        // Perform initialization tasks, such as setting up plugin
        await this.setupPlugin();

        await this.setupUserDatabase();

    }

    private async setupPlugin() {
        // Set up plugins here (e.g., initialize Capacitor, initialize other plugins)
        logger.log('Setting up plugins...');
        try {
            if (this.platform === 'web') {
                await sqliteService.initWebStore();
            }
            return;
        } catch(err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`AppInitializer setupPlugin: ${msg}`);        
        }
    }

    private async setupUserDatabase() {
        try {
            await userService.initializeDatabase();
            if (this.platform === 'web') {
                await sqliteService.saveToStore(userService.getDatabaseName());
            }
            return;
        } catch(err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`AppInitializer setupUserDatabase: ${msg}`);        
        }

    }
}

// Create a singleton instance of the AppInitializer service
const appInitializer = new AppInitializer();

export default appInitializer;