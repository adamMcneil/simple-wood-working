<script lang="ts">
    import { products } from "$lib/products";
    import ProductLink from "./ProductLink.svelte";
</script>

<!-- hero image -->
<section
    class="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
    style="max-width:1600px; height: 32rem; background-image: url('');"
>
    <div class="container mx-auto">
        <div
            class="flex flex-col w-full lg:w-1/2 justify-center items-start px-6 tracking-wide"
        >
            <h1 class="text-black text-3xl my-4">Stuff Made Out of Wood</h1>
            <div>
                <a
                    class="text-2xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
                    href="#products">The stuff</a
                >
                <!-- <span class="text-2xl">|</span> -->
                <!-- <a -->
                <!--     class="text-2xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" -->
                <!--     href="videos">See them in action</a -->
                <!-- > -->
            </div>
        </div>
    </div>
</section>

<!-- products -->
<section id="products" class="bg-white py-8">
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        {#each products as product}
            <ProductLink {product} />
        {/each}
    </div>
</section>
