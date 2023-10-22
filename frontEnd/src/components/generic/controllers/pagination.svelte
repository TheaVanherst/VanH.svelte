<script>
	import RainbowButtonWrap from "$root/components/generic/buttons/rainbowButtonWrap.svelte";

    import { urlSerializer } from "$lib/controllers/searchController.js";

    export let
		rows, trimmedRows,
		perPage, lastPage,
		goto, currentPage;

    let totalRows, totalPages,
        start, end;

    $: totalRows = rows.length;
    $: totalPages = Math.ceil(totalRows / perPage);

    $: currentPage  = Number(goto) ?? 0;

    $: start = currentPage * perPage;
    $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;

	$: trimmedRows = rows.slice(start, end + 1);
    $: lastPage = currentPage === totalPages - 1;

    $: totalPages - 1 < currentPage ? currentPage = 0 : false;

	const
		toTop = () => {
            window.scrollTo({top: 0, behavior: 'smooth'});},
		pageSet = () => {
            urlSerializer({'page': currentPage});
            trimmedRows = rows.slice(start, end + 1);},
		nextPage = (next = true) => {
            toTop();
        	setTimeout(() => {
                currentPage = next ? currentPage + 1 : currentPage - 1;
                pageSet();
			}, 450);},
		directPage = (index) => {
            toTop();
            setTimeout(() => {
                currentPage = index;
                pageSet();
            }, 450);}

	let fakeArray = Array(totalPages);
    $: fakeArray = Array(totalPages);
</script>

<div class='pagination'>
	<div on:click={() => nextPage(false)}
		 class:disabled={currentPage === 0}>
		<RainbowButtonWrap>
			<img src="/icons/leftIcon.webp">
		</RainbowButtonWrap>
	</div>

	<p style="margin: 0 15px">
		{start + 1} - {end + 1} of {totalRows}
	</p>

	<!--{#each fakeArray as _, index (index)}-->
	<!--	<div class:disabled={currentPage === index}-->
	<!--		 on:click={() => directPage(index)}>-->
	<!--		<RainbowButtonWrap>-->
	<!--			<div class="pageNumber">-->
	<!--				<h4>{index + 1}</h4>-->
	<!--			</div>-->
	<!--		</RainbowButtonWrap>-->
	<!--	</div>-->
	<!--{/each}-->

	<div on:click={() => nextPage(true)}
		 class:disabled={lastPage}>
		<RainbowButtonWrap>
			<img src="/icons/rightIcon.webp">
		</RainbowButtonWrap>
	</div>
</div>

<!--<div class="center">-->
<!--	<p>{start + 1} - {end + 1} of {totalRows}</p>-->
<!--</div>-->

<style lang="scss">
	.center {
		margin: 7px auto 0 auto;
		width: max-content;
		display: flex;}

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