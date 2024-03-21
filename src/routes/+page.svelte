<script>
    import { data } from '$lib/core/store';
    import logger from '$lib/core/logger';
    import AppLogo from '$lib/components/AppLogo.svelte';
    import AppIntroText from '$lib/components/AppIntroText.svelte';
    // Set the title for this page
    data.set({title:'Home Page', showBack: false});
    logger.log(`in Home page title: ${JSON.stringify($data)}`)
</script>
<!-- Your other content here -->
<AppLogo></AppLogo>
<AppIntroText></AppIntroText>
