<script>
    import { navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import SidebarTexts 	from "$root/components/layout/pageLayout/sidebarTexts.svelte";

	import CharacterFeature from "$root/components/pageSpecific/homePage/characters/characterShowcase.svelte";
    import WorkshopFeature 	from "$root/components/pageSpecific/homePage/embedded/workshopFeature.svelte";
    import GithubFeature 	from "$root/components/pageSpecific/homePage/embedded/githubFeature.svelte";
    import KofiCards 		from "$root/components/pageSpecific/homePage/kofiCards.svelte";
    import QandaFeature 	from "$root/components/pageSpecific/homePage/qandaFeature.svelte";

    export let data;
</script>

<SidebarTexts titlecard="Characters" icon="profileIcon.webp">
	<CharacterFeature dataset={data.characterData.characters}/>
</SidebarTexts>

<SidebarTexts titlecard="Github" icon="githubLogoLined.webp">
	<GithubFeature dataset={data.githubData}/>
</SidebarTexts>

<SidebarTexts titlecard="Workshop" icon="steamLogoLined.webp">
	<WorkshopFeature dataset={{full: data.workshopData, snippets: data.workshopSnippet}}/>
</SidebarTexts>

{#if $navigationControls.nsfw}
	<SidebarTexts titlecard="Support" icon="kofiLogo.webp">
		<KofiCards tiers={data.donationData.tiers}/>
	</SidebarTexts>
{/if}

<SidebarTexts titlecard="Q&A" icon="commentIcon.webp">
	<QandaFeature dataset={data.qAndA}/>
</SidebarTexts>