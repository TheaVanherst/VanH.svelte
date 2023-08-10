<script>
    import { screenType } 	from '$lib/accessibilityController.js';
    export let push = "";
    let active = false;
</script>

<a href={push.path} target="_blank"
    on:mouseenter={()=>{active = true}}
    on:mouseleave={()=>{active = false}}>
    <div class="title">
        {#if $screenType > 2}
            <div class="tag">
                <h3> {push.title} </h3>
            </div>
        {/if}
        <div class="icon">
            <img src="/icons/{push.imagePath}.webp">
        </div>
    </div>
</a>

<style lang="scss">
    @import "./src/commonStyles.scss";

    * { transition: ease .3s;}

    a {
        &:hover {
            @include rainbowTransition();}

        .title {
            padding:        10px;
            display:        inline-flex;

            > * {
                display: flex;}

            .tag {
                margin: auto 8px auto 0;
                h3 {
                    margin: -4px 0 0 0;
                    text-transform: uppercase;}}

            .icon  {
                margin: auto 0;
                img {
                    width:  26px;
                    height: 26px;}}
        }
    }
</style>