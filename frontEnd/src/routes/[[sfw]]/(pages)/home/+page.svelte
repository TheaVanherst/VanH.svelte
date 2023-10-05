<script>
    import SidebarTexts 	from "$root/components/layout/sidebarTexts.svelte";

	import CharacterFeature from "$root/components/sections/homePage/characters/characterShowcase.svelte";
    import WorkshopFeature 	from "$root/components/sections/homePage/embedded/workshopFeature.svelte";
    import GithubFeature 	from "$root/components/sections/homePage/embedded/githubFeature.svelte";
    import DonationFeature 	from "$root/components/sections/homePage/donationFeature.svelte";
    import QandaFeature 	from "$root/components/sections/homePage/qandaFeature.svelte";

    export let data;
</script>

<SidebarTexts titlecard="Characters" icon="aboutIcon.webp">
	<CharacterFeature dataset={data.characterData}/>
</SidebarTexts>

<SidebarTexts titlecard="Github" icon="githubLogo.webp">
	<GithubFeature dataset={data.githubData}/>
</SidebarTexts>

<SidebarTexts titlecard="Workshop" icon="steamLogo.webp">
	<WorkshopFeature dataset={[data.workshopData, data.workshopSnippet]}/>
</SidebarTexts>

<SidebarTexts titlecard="Support" icon="kofiLogo.webp">
	<DonationFeature global={data.donationData[0].globalTiers} tiers={data.donationData[0].tiers} personal={data.donationData[0].personalMessage} />
</SidebarTexts>

<SidebarTexts titlecard="Q&A" icon="commentIcon.webp">
	<QandaFeature dataset={data.qAndA}/>
</SidebarTexts>