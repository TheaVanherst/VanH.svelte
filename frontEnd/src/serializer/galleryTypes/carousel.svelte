<script>
    import SanityImage from "$root/serializer/sanityImage.svelte";
    //TODO: THIS ALL NEEDS RE-DOING BECAUSE IT'S REALLY BAD

    let randomId = Math.floor(Math.random() * 999);

    const scrollIntoView = async ({target}) => {
        document.querySelector("#a"+randomId).scrollLeft =
        document.querySelector(target.getAttribute('href')).offsetLeft;}

    let x = 0;
    export let push;
</script>

<div class="carousel" id="a{randomId}"
     on:scroll={({target}) => {x = target.scrollLeft}}>
    <div class="row" style="--yWid: {push.length}">
        {#each push as image, e}
            <div class="{e === 0 ? 'image active' : 'image'}" id="a{randomId}-{e}">
                <label  class="next"
                        on:click|preventDefault={scrollIntoView}
                        href="#a{randomId}-{(e === push.length - 1 ? 0 : e + 1)}">
                    <img src="/icons/rightRouteArrow.webp"/>
                </label>
                <label  class="prev"
                        on:click|preventDefault={scrollIntoView}
                        href="#a{randomId}-{(e !== 0 ? e - 1 : push.length - 1)}">
                    <img src="/icons/rightRouteArrow.webp"/>
                </label>

                <SanityImage image={image}/>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
	.carousel {
		overflow:       scroll hidden;
		background:     var(--backgroundAccent2);

		scrollbar-width:    thin;
		-webkit-overflow-scrolling: touch;

		scroll-snap-align:  start;
		scroll-snap-type:   x mandatory;
		scroll-snap-stop:   always;
		scroll-behavior:    smooth;

		&::-webkit-scrollbar {
			height: 		var(--innerRaidus);}
		&::-webkit-scrollbar-track {
			background: 	var(--backgroundAccent2);}
		&::-webkit-scrollbar-thumb {
			border-radius: 	2px;
			border: 		1px solid var(--background);
			background: 	var(--accent6);}
		&::-webkit-scrollbar-thumb:hover {
			background: 	var(--darkAccent1);}
    }

    .row {
	    vertical-align: bottom;
	    display:        inline-flex;
	    width:          calc(100% * var(--yWid));

	    .image {
		    scroll-behavior:    smooth;
		    scroll-snap-align:  start;
		    width:      100%;
		    position:   relative;
            background: var(--TransBlack);

		    label {
			    padding:    10px 10px;

                transform:  translateY(-50%);
			    top:        50%;

			    position:   absolute;
			    z-index:    100;
                background: var(--accent6);
			    transition: background .2s ease-out;

                > * {
                    width:      15px;
                    height:     15px;
                    display:    block;
                    pointer-events: none;}

			    &.next {    right:      0;}
			    &.prev {    left:       0;
                    > * {   transform:  scale(-1, 1);}}
			    &:hover {   background: var(--accent7);
                    > * {   filter:     invert(1);} }
            }
        }
    }
</style>