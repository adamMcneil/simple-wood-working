<script lang="ts">
    import type { Product } from "$lib/products";

    export let product: Product;  

    function onAddToCart(slug: string, title: string) {
        if (slug in localStorage) {
            let prev = Number(localStorage.getItem(slug))
            localStorage.setItem(slug, String(prev + 1))
        } else {
            localStorage.setItem(slug, "1")
        }
        alertTimer();
        printCart()   
    }
    
    let showAlertMessage = false;
    let alertMessage = "";
    const timerLengthMils = 2500;
    function alertTimer() {
        showAlertMessage = true;
        alertMessage = "Quantity in your cart: " + localStorage.getItem(product.slug)
        let numberInCart = localStorage.getItem(product.slug);
        setTimeout(() => {
            if (numberInCart == localStorage.getItem(product.slug)) {
                showAlertMessage = false;
            }
        }, timerLengthMils);
    }

    function printCart() {
        console.log(localStorage)
    }
</script>

<section>
    <div class="relative mx-auto max-w-screen-xl px-4 py-8">
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-1">
                <img
                    alt="primary"
                    src={product.image}
                    class="aspect-square w-full object-cover"
                />
                <a href={product.stripe_link} 
                class="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded text-center">
                    Buy Now
                </a>
                <button on:click={() => onAddToCart(product.slug, product.title)} class="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded text-center">
                    Add to Cart
                </button>
                {#if showAlertMessage}
                    <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 box-overlay" role="alert">
                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                        <p>{alertMessage}</p>
                    </div>
                {/if}
            </div>

            <div>
                <div class="mt-8 flex justify-between">
                    <div class="max-w-[35ch] space-y-2">
                        <h1 class="text-xl font-bold sm:text-2xl">
                            {product.title}
                        </h1>
                    </div>

                    <p class="text-lg font-bold">{product.price}</p>
                </div>

                <div class="mt-4 mb-6">
                    <div class="prose max-w-none text-justify">
                        <p>{product.description}</p>
                    </div>
                </div>
                <div>
                    <table>
                        {#each [...product.stats] as [key, value]}
                            <tr>
                                <td class="border px-4 py-2 text-gray-700"
                                    >{key}</td
                                >
                                <td class="border px-4 py-2 text-gray-700"
                                    >{value}</td
                                >
                            </tr>
                        {/each}
                    </table>
                </div>
            </div>
        </div>
        <div
            class="grid gap-4 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
            {#each product.images as image}
                <img
                    alt="additional"
                    src={image}
                    class=" w-full object-cover"
                />
            {/each}
        </div>
    </div>
</section>
