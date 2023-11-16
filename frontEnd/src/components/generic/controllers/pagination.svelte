<script>
	import RainbowButtonWrap from "$root/components/generic/wrappers/rainbowButtonWrap.svelte";

    import { urlSerializer } from "$lib/controllers/searchController.js";
    import { directory } from "$lib/pageSettings/redirectHandling.js";

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
            $directory.direction = [0,0];
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
	<div on:click={() => nextPage(false)}
		 class:disabled={currentPage === 0}>
		<RainbowButtonWrap>
			<img src="/icons/leftIcon.webp">
		</RainbowButtonWrap>
	</div>

	{#each fakeArray as _, index (index)}
		<div class:disabled={currentPage === index}
			 on:click={() => directPage(index)}>
			<RainbowButtonWrap>
				<div class="pageNumber">
					<h4>{index + 1}</h4>
				</div>
			</RainbowButtonWrap>
		</div>
	{/each}

	<div on:click={() => nextPage(true)}
		 class:disabled={lastPage}>
		<RainbowButtonWrap>
			<img src="/icons/rightIcon.webp">
		</RainbowButtonWrap>
	</div>
</div>

<style lang="scss">
	.pagination {
		display: 			flex;
		align-items: 		center;
		justify-content: 	center;
		pointer-events: 	all;
		gap: 				5px;}

	.disabled {
		opacity: 		0.6;
		pointer-events: none;}

	.pageNumber {
		height: 22px;
		width: 	12px;
		h4 {
			width: max-content;
			margin: -3px auto 0 auto;
			color: 	black;	}}
</style>