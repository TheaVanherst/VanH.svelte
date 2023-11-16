<script>
	import RainbowButtonWrap from "$root/components/generic/wrappers/rainbowButtonWrap.svelte";
    import GenericButton from "$root/components/generic/wrappers/genericButton.svelte";

    import { urlSerializer } from "$lib/controllers/searchController.js";
    import { directoryData } from "$lib/pageSettings/redirectHandling.js";

    export let
		rows, trimmedRows, perPage,
		goto, currentPage = 0,
        lastPage;

    let totalRows, totalPages,
        start, end;

    $: totalRows = rows.length;
    $: totalPages = Math.ceil(totalRows / perPage);
    $: currentPage  = Number(goto) ?? 0;

	const
		toTop = () => {
            window.scrollTo({top: 0, behavior: 'smooth'});},
		serializer = () => {
            $directoryData.direction = [0,0];
            setTimeout(() => { // this allows the pagination to update
                urlSerializer({'page': currentPage});
            }, 500);},
		nextPage = (next = true) => {
            toTop();
            setTimeout(() => {currentPage = next ? currentPage + 1 : currentPage - 1;}, 500);
            serializer();},
		directPage = (index) => {
            toTop();
            setTimeout(() => {currentPage = index;}, 500);
            serializer();}

    $: start = currentPage * perPage;
    $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;
    $: trimmedRows = rows.slice(start, end + 1) ?? [];

	let fakeArray = Array(totalPages);
    const pageCountUpdate = () => {
        fakeArray = [...Array(totalPages).keys()];
        lastPage = currentPage >= totalPages - 1;};

    $: totalPages && pageCountUpdate();
</script>

<div class='pagination'>
	<div class="directionButton"
		 on:click={() => nextPage(false)}
		 class:disabled={currentPage === 0}>
		<GenericButton hovered={currentPage === 0}>
			<img src="/icons/leftIcon.webp">
		</GenericButton>
	</div>

	{#each fakeArray as _, index (index)}
		<div class="pageButton"
			 class:disabled={currentPage === index}
			 on:click={() => directPage(index)}>
			<GenericButton hovered={currentPage === index}>
				<div class="pageNumber">
				</div>
			</GenericButton>
		</div>
	{/each}

	<div class="directionButton"
		 on:click={() => nextPage(true)}
		 class:disabled={lastPage}>
		<GenericButton hovered={lastPage}>
			<img src="/icons/rightIcon.webp">
		</GenericButton>
	</div>
</div>

<style lang="scss">
	.pagination {
		display: 			flex;
		align-items: 		center;
		justify-content: 	center;
		pointer-events: 	all;
		gap: 				5px;}


	.pageButton {
		&.disabled {
			pointer-events: none;}
		.pageNumber {
			height: 22px;
			width: 	12px;}
		h4 {
			width: 	max-content;
			margin: -3px auto 0 auto;
			color: 	black;}}

	.directionButton {
		&.disabled {
			pointer-events: none;
			img {
				filter: invert(1);}}
		img {
			margin: 0 0 -4px 1px;
			transition: filter ease .4s;}
		&:hover {
			img {
				filter: invert(1);}}}
</style>