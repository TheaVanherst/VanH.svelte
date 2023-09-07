<script>
    import SidebarTexts 	from "$root/components/layout/sidebarTexts.svelte";

	import CharacterFeature from "$root/components/sections/characters/characterSlide.svelte";
    import WorkshopFeature 	from "$root/components/sections/Workshop/workshopFeature.svelte";
    import GithubFeature 	from "$root/components/sections/homePage/githubFeature.svelte";
    import DonationFeature 	from "$root/components/sections/homePage/donationFeature.svelte";
    import QandaFeature 	from "$root/components/sections/homePage/qandaFeature.svelte";
</script>

<SidebarTexts titlecard="Characters" icon="aboutIcon.webp">
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

<SidebarTexts titlecard="Q&A" icon="commentIcon.webp">
	<QandaFeature/>
</SidebarTexts>
