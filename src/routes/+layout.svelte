<script lang="ts">
    import { afterUpdate } from 'svelte';
    import Header from '../lib/components/Header.svelte';
    import AppInitializer from '../lib/components/AppInitializer.svelte';
    import { data } from '$lib/core/store';
    import { Capacitor } from '@capacitor/core';
    import {
        defineCustomElements as jeepSqlite,
        applyPolyfills,
    } from 'jeep-sqlite/loader';
    import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';

    let toRender = false;
    const platform = Capacitor.getPlatform();

    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
        applyPolyfills().then(() => {
            pwaElements(window);

            jeepSqlite(window);
        });
        if (platform === "web") {
            const jeepEl = document.createElement("jeep-sqlite");
            document.body.appendChild(jeepEl);
            customElements.whenDefined('jeep-sqlite').then(() => {
                toRender = true;
            })
            .catch ((err) => {
                console.error(`Error: ${err}`);
                throw new Error(`Error: ${err}`)
            });
        } else {
            toRender = true;
        }
    } else {
        toRender = true;
    }
    // Wait until after the component updates to check if `jeep-sqlite` is defined
    afterUpdate(() => {
        if (!toRender) {
            return;
        }
    });
</script>
{#if toRender}
    <AppInitializer />
{/if}
{#if $data.showBack}
<Header title={$data.title} showBackButton showMenuButton></Header>
{:else}
<Header title={$data.title}  showMenuButton></Header>
{/if}
<slot></slot>
