<script lang="ts">
    import { Product, products } from "$lib/products";
    import { is_empty } from "svelte/internal";

    function getProduct(slug: string) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].slug == slug) {
                return products[i];
            }
        }
    }

    let cart = new Map<Product, number>();
    let subtotal = Number(0);
    let printEmptyCartMessage = true;

    function loadCart() {
        cart = new Map();
        if (typeof localStorage !== "undefined") {
            printEmptyCartMessage = localStorage.length < 1;
            for (let i = 0; i < localStorage.length; i++) {
                let slug = localStorage.key(i);
                if (slug !== null) {
                    let product = getProduct(slug);
                    if (product) {
                        cart.set(product, Number(localStorage.getItem(slug)));
                    }
                }
            }
        }
        calculateSubtotal();
    }

    function calculateSubtotal() {
        subtotal = 0;
        for (let [product, quantity] of cart.entries()) {
            let price = Number(product.price.substring(1));
            subtotal += price * quantity;
        }
        subtotal = Number(subtotal.toFixed(2));
    }

    function removeFromCart(slug: string) {
        let x = Number(localStorage.getItem(slug));
        localStorage.setItem(slug, String(x-1))
        if (x-1 < 1) {
            localStorage.removeItem(slug);
        }
        loadCart();
    }

    function addToCart(slug:string) {
        let x = Number(localStorage.getItem(slug));
        localStorage.setItem(slug, String(x+1))
        loadCart();
    }

    function clearCart() {
        localStorage.clear();
        loadCart();
    }

    function makeBody() {
        let bodyString = "";
        let i = 0;
        cart.forEach(function (quantity, product) {
            bodyString +=
                "line_items[" +
                i +
                "][price]=" +
                product.price_id +
                "&line_items[" +
                i +
                "][quantity]=" +
                quantity +
                "&";
            i = i + 1;
        });
        return bodyString;
    }
    ``;
    function onCheckout() {
        console.log(makeBody());
        fetch("https://api.stripe.com/v1/payment_links", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Bearer " +
                    atob(
                        "cmtfdGVzdF81MU5GNzBvS2ZqTHdhc0RlZ09FcHZCbnNoT0k1QzNvdmFSakVTbVlpdmVxUlVrVEJQRjVhVk1mU2hySDlnNzlZR3JnTjFzdGNOSW4wV1pESnNKZnNEMm5lbjAwd1BEV2hXeWw="
                    ),
            },
            body: makeBody(),
        }).then((response) => {
            if (response.ok) {
                response
                    .json()
                    .then((body) => window.location.replace(body.url));
            } else {
                console.log("response from stripe did not come back ok");
                clearCart();
            }
        });
    }

    function isCartEmpty() {
        return localStorage.length < 1;
    }

    loadCart();
</script>

<section class="mx-auto px-6" style="max-width:600px">
    <h1 class="text-3xl font-large text-gray-900" id="slide-over-title">
        Shopping cart
    </h1>

    <div class="my-8">
        <div class="flow-root">
            <ul class="-my-6 divide-y divide-gray-200">
                <div></div>
                {#if printEmptyCartMessage }
                <div class="text-2xl font-large text-900 py-2 px-4 text-center">
                    Your cart is empty
                    <p class="mt-0.5 text-sm text-gray-500">
                    You need add products to your cart before you can checkout. Use the View our products button at the bottom of the page.

                    </p>
                </div>
                {/if}
                {#each [...cart] as [product, value]}
                    <li class="flex py-6">
                        <div
                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                        >
                            <a href="/products/{product.slug}">
                                <img
                                    src={product.image}
                                    alt="product"
                                    class="h-full w-full object-cover object-center aspect-square"
                                />
                            </a>
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                            <div>
                                <div
                                    class="flex justify-between text-base font-medium text-gray-900"
                                >
                                    <h3>
                                        <a href="/products/{product.slug}"
                                            >{product.title}</a
                                        >
                                    </h3>
                                    <p class="ml-4">{product.price}</p>
                                </div>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                                
                                <p class="text-gray-500">Qty {value}</p>
                                <div class="flex">
                                    <button
                                        on:click={() =>
                                            addToCart(product.slug)}
                                        type="button"
                                        class="font-medium text-indigo-600 hover:text-indigo-500"
                                        >Add</button
                                    >
                                </div>
                                <div class="flex">
                                    <button
                                        on:click={() =>
                                            removeFromCart(product.slug)}
                                        type="button"
                                        class="font-medium text-indigo-600 hover:text-indigo-500"
                                        >Remove</button
                                    >
                                </div>
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    
    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
        {#if !printEmptyCartMessage }
        <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${subtotal}</p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
        </p>
        <div class="mt-6">
            <button
                on:click={onCheckout}
                class="flex items-center justify-center bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded text-center"
                >Checkout</button
            >
        </div>
        {/if}
        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
                <a
                    href="/#products"
                    class="font-medium text-yellow-700 hover:text-yellow-500"
                >
                    View our products
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </p>
        </div>
    </div>
</section>
