<script>
    import { scrollPos } from '$lib/accessibilityController.js';

    // TODO: NOTE;
    // Not using --ypos, and trying to use $scrollPos causes a slight delay when scrolling.
    // do not change this - I promise you this is the most reliable.

    const levels = [4,3,2]
</script>

<parallax>
    {#each levels as level}
        <div
            class="spaceBg{level - 1}"
            style="background-position-y: calc({-$scrollPos * (0.3 * level)}px);"></div>
    {/each}
</parallax>

<style lang="scss">
    // gif resolutions
    $res1: 234px;
    $res2: 400px;

    parallax {
        div {
            width: 		150%;
            top: 		0;
            position: 	fixed;}
    }

    @mixin cgm($st, $sd, $hm, $zh, $ov, $lp){
        -webkit-animation: 	backgroundSpeed+$st $sd linear infinite;
        animation: 			backgroundSpeed+$st $sd linear infinite;
        background-image: 	url("/stars"+($st)+".gif");

        left:  -$lp;
        height: calc(100vh + $hm);

        position: 	fixed;
        z-index:   -$zh;
        opacity: 	$ov;
    }

    .spaceBg1 {    @include cgm(1,15s,$res1,3,1,0);}
    .spaceBg2 {    @include cgm(2,45s,$res2,2,0.7,250px);}
    .spaceBg3 {    @include cgm(1,45s,$res1,1,0.5,355px);}

	@keyframes backgroundSpeed1 {
		0% {  	transform: translateY(calc($res1 * -1));}
		100% {  transform: translateY(0px);} }
	@keyframes backgroundSpeed2 {
		0% {  	transform: translateY(calc($res2 * -1));}
		100% {  transform: translateY(0px);} }
</style>