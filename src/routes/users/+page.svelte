<!-- src/routes/Users.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { data } from '$lib/core/store';
    import UserForm from '$lib/components/UserForm.svelte';
    import UserList from '$lib/components/UserList.svelte';
    import { userService } from '$lib/databases/UserService';
    import { sqliteService } from '$lib/databases/SQLiteService';
    import type { User } from '$lib/databases/models/User';
    import { Toast } from '@capacitor/toast';
	import type { SQLiteDBConnection } from '@capacitor-community/sqlite';

    // Set the title for this page
    data.set({title: 'Users Page', showBack: true});

    let initCompleted = false; // Initialize a local variable to store the value of isInitCompleted
    let subscription; // Define a variable to store the subscription
    let userSubscription;
    let refreshListener;;
    let users: User[];
    let userStore;
    let db: SQLiteDBConnection;
    const platform = sqliteService.getPlatform();
    const dbUsersName = userService.getDatabaseName();
    const msgDb = `Database ${dbUsersName} not opened`;


    // Function to open the user database
    const openDatabase = () => {
        try {
            const version = userService.getDatabaseVersion();

            sqliteService.openDatabase(dbUsersName, version, false).then(async (database) => {
                db = database;
                await fetchingData();
            });
        } catch (error) {
            const msg = `Error open database:: ${error}`;
            console.error(msg);
            Toast.show({
                text: `${msg}`,
                duration: 'long'
            });           
        }
    }

    // Function to handle adding user
    const addUser = async (event) => {
        if (db) {
            const newUser: User = event.detail.newUser;

            const lastId = await userService.addUser(newUser);
            newUser.id = lastId;

            userStore.update((users) => {
                return [...users, newUser];
            });
        } else {
            console.error(msgDb);
            Toast.show({
                text: `${msgDb}`,
                duration: 'long'
            });           
        }
    };

    // Function to handle updating user
    const handleUpdateUser = async (event) => {
        if (db) {
            const { updatedUser } = event.detail;
            await userService.updateUserById(updatedUser.id,updatedUser.active);
            userStore.update(users => {
                return users.map(user => {
                    if (user.id === updatedUser.id) {
                    return { ...user, active: updatedUser.active };
                    }
                    return user;
                });
            });
        } else {
            console.error(msgDb);
            Toast.show({
                text: `${msgDb}`,
                duration: 'long'
            });           
        }
    };

    // Function to handle deleting user
    const handleDeleteUser = async (event) => {
        if(db) {
            const { deletedUser } = event.detail;
            await userService.deleteUserById(deletedUser.id);
            userStore.update(users => {
                return users.filter(user => user.id !== deletedUser.id);
            });
        } else {
            console.error(msgDb);
            Toast.show({
                text: `${msgDb}`,
                duration: 'long'
            });           
        }
    };
    const fetchingData = async () => {
        if (db) {
            try {
                const stmt = 'SELECT * FROM users';
                const fetchData =  await db.query(stmt);
                // Define a writable store to hold the users state
                userStore = writable(fetchData.values);
                userSubscription = userStore.subscribe(value => {
                    users = value;
                });
            } catch (error) {
                const msg = `Error fetching user data: ${error}`;
                console.error(msg);
                throw new Error(msg)
            };

        }

    }
    // Subscribe to changes in the isInitCompleted store
    onMount(() => {
        subscription = userService.isInitCompleted.subscribe(async (value) => {
            initCompleted = value; // Update the local variable with the new value emitted by the store
            
            if (initCompleted) {
                if(platform === "web") {
                      // Listen for the window:beforeunload event to detect when the page is about to be refreshed
                    refreshListener = window.addEventListener('beforeunload', () => {
                        sqliteService.closeDatabase(dbUsersName,false).then(() => {
                        })
                        .catch((error) => {
                            const msg = `Error close database:: ${error}`;
                            console.error(msg);
                            Toast.show({
                            text: `${msg}`,
                            duration: 'long'
                            });           
                        });
                    });

                    customElements.whenDefined('jeep-sqlite').then(() => {
                        openDatabase();
                    })
                    .catch ((error) => {
                        const msg = `Error open database:: ${error}`;
                        console.error(`msg`);
                        Toast.show({
                            text: `${msg}`,
                            duration: 'long'
                        });           
                    });

                } else {
                    try {
                        openDatabase();
                    } catch (error) {
                        const msg = `Error open database:: ${error}`;
                        console.error(`msg`);
                        Toast.show({
                            text: `${msg}`,
                            duration: 'long'
                        });           
                    }
                }

            }
        });
        // Unsubscribe from the store when the component is unmounted to avoid memory leaks
        return () => {
            subscription.unsubscribe(); // Call the unsubscribe method on the subscription
            userSubscription;
            sqliteService.closeDatabase(dbUsersName,false).then(() => {
            })
            .catch((error) => {
                const msg = `Error close database:: ${error}`;
                console.error(msg);
                Toast.show({
                text: `${msg}`,
                duration: 'long'
                });           
            });
            window.removeEventListener('beforeunload', refreshListener);
         };
    });

    // Close the database connection before the component updates (including refresh)
/*    beforeUpdate(() => {
        if (platform === "web" && isRefreshing) {
            sqliteService.closeDatabase(dbUsersName,false).then(() => {
                            })
            .catch((error) => {
                const msg = `Error close database:: ${error}`;
                console.error(msg);
                Toast.show({
                text: `${msg}`,
                duration: 'long'
                });           
            });
        }
    });
    */
    // Unsubscribe from the store and close the database connection when the component is destroyed
/*    onDestroy(() => {
        window.removeEventListener('beforeunload', () => {
        isRefreshing = true;
        });
    });
    */

</script>
<div class="addnewuser">
    <h2>Add New User</h2>
    <UserForm on:addUser={addUser} />  
</div>
<div class="currentusers">
    <h2>Current Users</h2>
    <UserList {users} on:updateUser={handleUpdateUser} on:deleteUser={handleDeleteUser} />
</div>
    