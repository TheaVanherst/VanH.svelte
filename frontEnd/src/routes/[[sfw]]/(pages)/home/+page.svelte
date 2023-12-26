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

<SidebarTexts titlecard="Characters" icon="aboutIcon.webp">
	<CharacterFeature
			dataset={data.characterData[0].characters}/>
</SidebarTexts>

<SidebarTexts titlecard="Github" icon="githubLogo.webp">
	<GithubFeature
			dataset={data.githubData}/>
</SidebarTexts>

<SidebarTexts titlecard="Workshop" icon="steamLogo.webp">
	<WorkshopFeature
			dataset={{full: data.workshopData, snippets: data.workshopSnippet}}/>
</SidebarTexts>

{#if $navigationControls.nsfw}
	<SidebarTexts titlecard="Support" icon="kofiLogo.webp">
		<KofiCards
				tiers={data.donationData[0].tiers}/>
	</SidebarTexts>
{/if}

<SidebarTexts titlecard="Q&A" icon="commentIcon.webp">
	<QandaFeature
			dataset={data.qAndA}/>
</SidebarTexts>