<script lang="ts">
    import { goto } from '$app/navigation';
    export let items: string[] = [];
    export let onItemClick: any;

    const handleItemClick = (item: string) => {
      // Handle item click action here
      onItemClick(); // Call the function passed as prop

      const route: string = item.toLowerCase();
      if (route === "home") {
        goto('/');
      } else {
        goto(`/${route}`);
      }

    }
  </script>
  
  <div class="popup-menu">
    {#each items as item}
      <button on:click={() => handleItemClick(item)}>{item}</button>
    {/each}
  </div>
  
  <style>
  .popup-menu {
    position: fixed;
    top: 60px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* Align items to the right */
    padding: 10px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  .popup-menu button {
    margin-bottom: 5px; /* Add some space between items */
  }  </style>