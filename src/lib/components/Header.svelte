<!-- Header.svelte -->
<script lang="ts">
    import { goto } from '$app/navigation';
    import PopupMenu from './PopupMenu.svelte';
    export let title = '';
    export let showBackButton = false;
    export let showMenuButton = false;
    let isMenuOpen = false;

    const items = ['Home', 'Users', 'About'];

    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
    function closeMenu() {
      isMenuOpen = false;
    }

    function handleBack() {
      goto('/');
    }
    
  </script>
  
  <header class="header">
    {#if showBackButton}
      <button class="back-button" on:click={handleBack}>
        <img src="/arrow-back.svg" alt="Back" />
      </button>
    {:else} 
      <button class="back-button-hidden" on:click={handleBack}>
        <img src="/arrow-back.svg" alt="Back" />
      </button>
    {/if}
    
    <h1 class="title">{title}</h1>
    
    {#if showMenuButton}
      <button class="menu-button" on:click={toggleMenu}>
        <img src="/menu.svg" alt="Menu" />
      </button>
    {/if}
    {#if isMenuOpen}
      <PopupMenu items={items} onItemClick={closeMenu}/>
    {/if}
  </header>

  
  <style>
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 50px;
      padding-left: 20px;
      padding-right: 20px;
      background-color: #f0f0f0;
    }
    .back-button {
    padding-left: 20px;
    background-image: url('/arrow-back.svg');
    background-repeat: no-repeat;
    background-position: left center;
    border: none;
    visibility: visible;
    cursor: pointer;
    }
    .back-button-hidden {
    padding-left: 20px;
    background-image: url('/arrow-back.svg');
    background-repeat: no-repeat;
    background-position: left center;
    border: none;
    visibility: hidden;
    cursor: pointer;
    }
  
    .menu-button {
      padding-left: 20px;
      border: none;
      background-image: url('/menu.svg');
      background-repeat: no-repeat;
      background-position: left center;
      cursor: pointer;
    }

    .title {
      margin: 0;
      font-size: 1.2rem;
    }
  </style>