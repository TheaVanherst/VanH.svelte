<script>
    import { goto } from "$app/navigation";
    import { galleryChange } from "$lib/settings/pageSettings.js";

    import {
        directoryProcessing,
        directoryStatus,
        navigationControls,
        navigationDirectories
    } from '$lib/settings/navigationHandling.js';

    import { pageName } from "$lib/layout/titlebarScoller.js";

    export let url = undefined;
    export let redirectName = undefined;
    export let nsfwPointer = undefined;

    // Helper to find the page root
    const findPageRoot = (path) => {
        const
			indices = navigationDirectories.map((dir) =>
				dir.pages
					? dir.pages.findIndex((page) => page.path === path)
					: dir.path === path),
       		dirIndex =
				indices.findIndex((idx) => idx !== -1 && idx !== false);
        return dirIndex !== -1
            ? navigationDirectories[dirIndex]?.pages?.[indices[dirIndex]] ||
            navigationDirectories[dirIndex]
            : false;
    };

    // Main redirect handler
    const redirectCheck = (route = "", customName, forceNSFW = undefined) => {
        let newRoute;

        // Fallback to current root if no route is provided
        if (!route) route = $directoryStatus.currentRoot;

        if (forceNSFW !== undefined) {
            $navigationControls.nsfw = forceNSFW;

            if (!forceNSFW) {
                // Handle SFW redirection
                const pageRoot = findPageRoot(route);
                $directoryStatus.nsfwOptional = "";
                newRoute = pageRoot?.nsfw
                    ? "/featured"
                    : $directoryStatus.strippedUrl
                        ? `${$directoryStatus.strippedUrl}${$directoryStatus.query}`
                        : "/";
            } else {
                // Handle NSFW redirection
                $directoryStatus.nsfwOptional = $directoryStatus.nsfwKeyword;
                newRoute = `/${$directoryStatus.nsfwKeyword}${$directoryStatus.strippedUrl}${$directoryStatus.query}`;
            }
        } else {
            // Default redirection logic
            newRoute = $directoryStatus.nsfwUrlCheck() + route;
        }

        // Execute the redirection if necessary
        if (newRoute !== $directoryStatus.rawDirectory && !$navigationControls.transitioning) {
            galleryChange();
            directoryProcessing($directoryStatus.rawDirectory, newRoute);

            $navigationControls.transitioning = true;
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(async () => {
                await goto(newRoute);
                $navigationControls.transitioning = false;
            }, 250);
        }

        // Update page name if provided
        if (customName) $pageName = customName;
    };
</script>

<a
		href="{$navigationControls.nsfw ? `/${$directoryStatus.nsfwKeyword}` : ''}{url}"
		target=""
		on:click|preventDefault={() => redirectCheck(url, redirectName, nsfwPointer)}>
	<slot />
</a>

<style lang="scss">
	a {
		color: inherit;
	}
</style>

