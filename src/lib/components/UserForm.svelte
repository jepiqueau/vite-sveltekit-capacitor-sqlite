<!-- UserForm.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import type { User } from '$lib/databases/models/User';
    
    // Creating event dispatcher to communicate with parent component
    const dispatch = createEventDispatcher();
  
    let name = '';
    let isNameValid = false; // Variable to track if name input is valid
  
    // Function to handle form submission
    const handleSubmit = () => {
      const cleanedName = name.replace(/[^\w\s]/gi, '').trim();
      const nameArray = cleanedName.split(/\s+/);
  
      if (nameArray.length === 2) {
        const newUser: User = {
        id: Date.now(), // do not care about the id value (generated by sqlite)
        name: cleanedName,
        active: 1,
        /*email, //version 2 */
      };

        dispatch('addUser', { newUser: newUser });
        // Reset the input field after form submission
        name = '';

      } else {
        alert('Please enter a name with two words.');
      }
    };
  
    // Function to check if name input is valid
    const checkNameValidity = () => {
        const cleanedName = name.trim(); // Remove leading and trailing spaces
        const nameArray = cleanedName.split(/\s+/);

        isNameValid = nameArray.length === 2 && /^[a-zA-Z0-9\s]+$/.test(cleanedName);
    };
  
    // Run checkNameValidity once on component mount
    onMount(checkNameValidity);
  </script>
  
  <style>
    /* Add your styles here */
  </style>
  
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Name:
      <input type="text" bind:value={name} on:input={checkNameValidity} placeholder="Rose Miller"/>
    </label>
    <button type="submit" disabled={!isNameValid}>Submit</button>
  </form>