<!-- src/routes/About.svelte -->
<style>
  ul {
    font-size: large;
    font-weight: bold;
    padding-left: 10%; /* Set left padding to 10% */
    list-style-type: none; /* Remove default list styling */
  }

  li {
    padding-left: 10%; /* Set left padding to 10% */
    margin-bottom: 0.5rem; /* Add some bottom margin for spacing */
  }
</style>

<script lang="ts">
  import { data } from '$lib/core/store';

  // Set the title for this page
  data.set({title: 'About Page', showBack: true});
</script>

<ul>This is a full example of a CRUD app</ul>
<li>Framework: Sveltekit</li>
<li>Frontend build tool: Vite</li>
<li>Native Runtime: Capacitor 5</li>
<li>SQLite: @capacitor-community/sqlite</li>
<li>Version: 0.0.1</li>
