<script lang="ts">
    import type { Product } from "$lib/products";

    export let product: Product;
</script>

<div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
    <a href={`/products/${product.slug}`}>
        <img
            class="hover:grow hover:shadow-lg h-full w-full object-cover aspect-square"
            src={product.image}
            alt={product.title}
        />
        <div class="pt-3 flex items-center justify-between">
            <p class="">{product.title}</p>
            <p class="pt-1 text-gray-900">{product.price}</p>
        </div>
    </a>
</div>

<style lang="postcss">
    .hover\:grow {
        transition: all 0.3s;
        transform: scale(1);
    }

    .hover\:grow:hover {
        transform: scale(1.02);
    }
</style>
