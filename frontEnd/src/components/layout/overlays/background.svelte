<script>
    import { scrollPos } from '$lib/controllers/pageControllers.js';
    import { deviceType } from "$lib/controllers/pageControllers.js";

    // TODO: NOTE;
    // Not using --ypos, and trying to use $scrollPos causes a slight delay when scrolling.
    // do not change this - I promise you this is the most reliable.

    const levels = [4,3,2]
</script>

{#if $deviceType > 0}
    <parallax>
        {#each levels as level}
            <div class="spaceBg{level - 1}"
                style="background-position-y: calc({-$scrollPos * (0.3 * level)}px);"></div>
        {/each}
    </parallax>
{:else}
    <parallax>
        {#each levels as level}
            <div class="spaceBg{level - 1}"></div>
        {/each}
    </parallax>
{/if}

<style lang="scss">
    // gif resolutions
    $res1: 234px;
    $res2: 400px;

    parallax {
        div {   width: 		100%;
                top: 		0;
                position: 	fixed;}}

    @mixin cgm($st, $sd, $hm, $zh, $ov, $lp){
        -webkit-animation: 	backgroundSpeed+$st $sd linear infinite;
        animation: 			backgroundSpeed+$st $sd linear infinite;
        background-image: 	url("/branding/stars"+($st)+".gif");

        background-position-x: -$lp;
        height: calc(100vh + $hm);

        position: 	fixed;
        z-index:   -$zh;
        opacity: 	$ov;}

    .spaceBg1 {    @include cgm(1,45s,$res1,3,0.5,0);}
    .spaceBg2 {    @include cgm(2,35s,$res2,2,0.7,250px);}
    .spaceBg3 {    @include cgm(1,18s,$res1,1,1,355px);}

	@keyframes backgroundSpeed1 {
		0% {  	transform: translateY($res1 * -1);}
		100% {  transform: translateY(0px);} }
	@keyframes backgroundSpeed2 {
		0% {  	transform: translateY($res2 * -1);}
		100% {  transform: translateY(0px);} }
</style>