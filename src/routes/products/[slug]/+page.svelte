<script lang="ts">
    import ProductDetails from "./ProductDetails.svelte";
    export let data;
    const product = data.product;
</script>

<ProductDetails {product} />
