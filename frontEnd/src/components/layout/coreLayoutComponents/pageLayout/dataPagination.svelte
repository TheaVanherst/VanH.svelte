<script>
    import { urlSerializer } 		from "$lib/controllers/searchController.js";
    import { navigationControls } 	from "$lib/settings/navigationHandling.js";

    export let
		rows, trimmedRows, perPage,
		goto, currentPage = 0, lastPage;

    let totalRows, totalPages,
        start, end;

    $: totalRows = rows.length;
    $: totalPages = Math.ceil(totalRows / perPage);
    $: currentPage  = Number(goto) ?? 0;

    let fakeArray = Array(totalPages);

	const
		directPage = (index) => {
            window.scrollTo({top: 0, behavior: 'smooth'});
            $navigationControls.direction = 0;
            setTimeout(() => {
                currentPage = index;}, 500);
            setTimeout(() => {
                $navigationControls.transitioning = true;}, 250);
            setTimeout(() => {
                urlSerializer({'page': currentPage});
                $navigationControls.transitioning = false;}, 500);},
        pageCountUpdate = () => {
            fakeArray = [...Array(totalPages).keys()];
            lastPage = currentPage >= totalPages - 1;};

    $: start = currentPage * perPage;
    $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;
    $: trimmedRows = rows.slice(start, end + 1) ?? [];
    $: totalPages && pageCountUpdate();
</script>

<div class='pagination'>
	{#each fakeArray as _, index (index)}
		<div class="pagingDot"
			 class:active={index === currentPage}
			 on:click={() => directPage(index)}>
		</div>
	{/each}
</div>

<slot/>

<div class='pagination'>
	{#each fakeArray as _, index (index)}
		<div class="pagingDot"
			 class:active={index === currentPage}
			 on:click={() => directPage(index)}>
		</div>
	{/each}
</div>

<style lang="scss">
	.pagination {
		margin: 	-4px auto;
		gap: 		5px;
		display: 	flex;
		flex-wrap: 	wrap;

		align-items: 		center;
		justify-content: 	center;
		pointer-events: 	all;}
</style>