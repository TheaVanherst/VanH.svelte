<script>
    import { screenType } 	from '$lib/accessibilityController.js';
    export let push = "";
    let active = false;
</script>

<a href={push.path} target="_blank"
    on:mouseenter={()=>{active = true}}
    on:mouseleave={()=>{active = false}}
    class="{active ? 'hovered' : ''}">
    <div class="title">
        {#if $screenType > 2}
            <p> {push.title} </p>
        {/if}
        <div class="icon">
            <img src="/icons/{push.imagePath}.webp">
        </div>
    </div>
</a>

<style lang="scss">

    * {
        transition: ease .3s;
    }

    .hovered {
        .title {
            filter:
                drop-shadow(0px 0px 1px var(--accent9))
                brightness(0) 	saturate(100%)
                invert(15%) 	sepia(75%)
                saturate(5273%) hue-rotate(271deg)
                brightness(97%) contrast(132%);}}

    a {
        .title {
            margin:         0 12px 0 10px;
            display:        inline-flex;

            p {
                padding:    5px 12px 5px 5px;
                transform:  scale(1, 1.35);

                font-size:      20px;
                text-transform: uppercase;
                font-weight:    800;}

            > .icon  {
                display: flex;

                > img {
                    width:  26px;
                    height: 26px;
                    margin: auto 0;}}
        }
    }
</style>