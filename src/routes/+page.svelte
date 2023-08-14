<script>
    import SidebarTexts 	from "../components/generic/sidebarTexts.svelte";

	import CharacterFeature from "../components/characterFeature.svelte";
    import WorkshopFeature 	from "../components/workshopFeature.svelte";
    import GithubFeature 	from "../components/githubFeature.svelte";
    import DonationFeature 	from "../components/donationFeature.svelte";
    import QandaFeature 	from "../components/qandaFeature.svelte";
</script>

<SidebarTexts titlecard="Characters" icon="furaffinityLogo.webp">
	<CharacterFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Github" icon="githubLogo.webp">
	<GithubFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Workshop" icon="steamLogo.webp">
	<WorkshopFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Support" icon="kofiLogo.webp">
	<DonationFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Q&A">
	<QandaFeature/>
</SidebarTexts>

<style lang="scss">

</style>