<script>
    import { goto } from "$app/navigation";
    import { galleryChange } from "$lib/controllers/layoutControllers/pageSettings.js";

    import { directoryProcessing, directoryStatus, navigationControls, navigationDirectories } from '$lib/controllers/layoutControllers/navigationHandling.js';
    import { pageName } from "$lib/controllers/stylingControllers/titlebarScoller.js";

    export let
        url = undefined,
		redirectName = undefined,
		nsfwPointer = undefined;

    const redirectCheck = (e = "", n, p = undefined) => {
        let newRoute;

        if (e === undefined) { // url fallback
            e = $directoryStatus.currentRoot;}

        if (p !== undefined) { // forced NSFW change
            $navigationControls.nsfw = p;

            if (p === false) { // SFW redirect
                const
                    arrayCheck1 = navigationDirectories.map(
                        i => !!i.pages ?
                            i.pages.findIndex(a => a.path === e) :
                            i.path === e),
                    arrayCheck2 = arrayCheck1.findIndex(i => i !== -1 && i !== false),
                    pageRoot = navigationDirectories[arrayCheck2]?.pages ?
                        navigationDirectories[arrayCheck2]?.pages[arrayCheck1[arrayCheck2]] :
                        navigationDirectories[arrayCheck2] ?? false;

                newRoute = pageRoot.nsfw ? '/featured' : !!$directoryStatus.strippedUrl ? ($directoryStatus.strippedUrl + $directoryStatus.query) : "/";
                $directoryStatus.nsfwOptional = $directoryStatus.nsfwKeyword;}
            else { // NSFW redirect
                newRoute = "/" + $directoryStatus.nsfwKeyword + $directoryStatus.strippedUrl + $directoryStatus.query;
                $directoryStatus.nsfwOptional = "";}}
        else {
            newRoute = $directoryStatus.nsfwUrlCheck() + e;}

        // this allows plain redirects via. eg. /artwork, and adds the NSFW filter keyword.

        if (newRoute + "/" !== $directoryStatus.rawDirectory && !$navigationControls.transitioning) {
            galleryChange();
			directoryProcessing($directoryStatus.rawDirectory, newRoute);

            $navigationControls.transitioning = true;
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(
                async () => {
					await goto(newRoute);
					$navigationControls.transitioning = false;
				}, 250);}

    	if (n) { // this sets a custom page name.
            $pageName = n;}}
</script>

<a href="{$navigationControls.nsfw ? `/${$directoryStatus.nsfwKeyword}`  : ''}{url}" target=""
   on:click|preventDefault={() => redirectCheck(url, redirectName, nsfwPointer)}> <!-- NEEDS to be a click, otherwise it doesn't register queries. -->
		<slot/>
</a>

<style lang="scss">
	a {
		color: inherit;}
</style>