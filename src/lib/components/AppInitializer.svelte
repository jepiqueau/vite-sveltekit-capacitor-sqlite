<script lang="ts">
    import { onMount } from 'svelte';
    import appInitializer from '$lib/core/appinitializer';
    import { Toast } from '@capacitor/toast';

    onMount(async () => {
        try {
            await appInitializer.initialize();
        } catch(err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            Toast.show({
                text: `${msg}`,
                duration: 'long'
            });           

        }
    });
</script>