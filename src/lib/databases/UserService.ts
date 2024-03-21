import type { User } from '$lib/databases/models/User';
import { BehaviorSubject } from 'rxjs';
import { UserUpgradeStatements } from '$lib/databases/upgrades/user.upgrade.statements';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { sqliteService } from '$lib/databases/SQLiteService';
import { dbVersionService } from '$lib/databases/DbVersionService';

export interface IUserService {
    initializeDatabase(): Promise<void>
    getUsers(): Promise<User[]>
    addUser(user: User): Promise<number>
    updateUserById(id: number, active: number): Promise<void> 
    deleteUserById(id: number): Promise<void>
    getDatabaseName(): string
    getDatabaseVersion(): number
}
class UserService implements IUserService {
    versionUpgrades = UserUpgradeStatements;
    loadToVersion = UserUpgradeStatements[UserUpgradeStatements.length-1].toVersion;
    db!: SQLiteDBConnection;
    database: string = 'myuserdb';
    isInitCompleted = new BehaviorSubject(false);
    platform = sqliteService.getPlatform();

    async initializeDatabase(): Promise<void> {
        // create upgrade statements
        try {
            await sqliteService.addUpgradeStatement({database: this.database,
                                                  upgrade: this.versionUpgrades});
            this.db = await sqliteService.openDatabase(this.database, this.loadToVersion, false);
            const isData = await this.db.query("select * from sqlite_sequence");
            if(isData.values!.length === 0) {
            // create database initial users if any

            }

            dbVersionService.setDbVersion(this.database,this.loadToVersion);
            if( this.platform === 'web') {
              await sqliteService.saveToStore(this.database);
            }
            this.isInitCompleted.next(true);
        } catch(err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`userService.initializeDatabase: ${msg}`);
        }
    }
    async getUsers(): Promise<User[]> {
        return (await this.db.query('SELECT * FROM users;')).values as User[];
    }
    async addUser(user: User): Promise<number> {
        const sql = `INSERT INTO users (name) VALUES (?);`;
        const res = await this.db.run(sql,[user.name]);
        if (res.changes !== undefined
            && res.changes.lastId !== undefined && res.changes.lastId > 0) {
            return res.changes.lastId;
        } else {
            throw new Error(`storageService.addUser: lastId not returned`);
        }
    }
    async updateUserById(id: number, active: number): Promise<void> {
        const sql = `UPDATE users SET active=${active} WHERE id=${id}`;
        await this.db.run(sql);
    }
    async deleteUserById(id: number): Promise<void> {
        const sql = `DELETE FROM users WHERE id=${id}`;
        await this.db.run(sql);
    }
    getDatabaseName(): string {
        return this.database;
    }
    getDatabaseVersion(): number {
        return this.loadToVersion;
    }
}
// Singleton instance of the service
export const userService = new UserService();