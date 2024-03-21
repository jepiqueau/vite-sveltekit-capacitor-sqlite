<!-- UserList.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
 
    export let users = []; // Array of users passed as a prop from the parent component
  
    // Create event dispatchers for updating and deleting users
    const dispatchUpdateUser = createEventDispatcher();
    const dispatchDeleteUser = createEventDispatcher();
  
    // Function to handle updating user
    const handleUpdateUser = (user) => {
      // Emit an event with the updated user
      dispatchUpdateUser('updateUser', { user });
    };
  
    const handleCheckboxChange = (user) => {
        const updatedUser = { ...user, active: user.active === 1 ? 0 : 1 };
        dispatchUpdateUser('updateUser', { updatedUser });
    }
    // Function to handle deleting user
    const handleDeleteUser = (user) => {
      // Emit an event with the user to be deleted
      const deletedUser = { ...user}
      dispatchDeleteUser('deleteUser', { deletedUser });
    };
  </script>
  
  <style>
    /* Remove bullet points from the list */
    ul {
        list-style-type: none;
        padding: 0;
    }

    /* Style each list item */
    li {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    /* Style the user name */
    .user-data {
        padding-left: 10px; /* Adjust the padding as needed */
        flex-grow: 1; /* Occupy the available space */
    }

    /* Style update and delete buttons */
    .button-group {
        display: flex;
        gap: 10px;
    }
    /*
    .update-button {
      padding-left: 20px;
      border: none;
      background-image: url('/brush.svg');
      background-repeat: no-repeat;
      background-position: left center;
      cursor: pointer;
    }
*/
    .delete-button {
      padding-left: 20px;
      border: none;
      background-image: url('/trash.svg');
      background-repeat: no-repeat;
      background-position: left center;
      cursor: pointer;
    }

  </style>
  
  <ul>
    {#each users as user}
      <li>
        <input type="checkbox" checked={user.active === 1} on:change={() => handleCheckboxChange(user)} />
        <span class="user-data">{user.id} {user.name}</span>
        <div class="button-group">
            <!--
            <button class="update-button" on:click={() => handleUpdateUser(user)}>
                <img src="/brush.svg" alt="Back" />
            </button>
            -->
            <button class="delete-button" on:click={() => handleDeleteUser(user)}>
                <img src="/trash.svg" alt="Back" />
            </button>
        </div>
      </li>
    {/each}
  </ul>