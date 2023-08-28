<script lang="ts">
    import "../app.css";
    import { base } from '$app/paths';

</script>

<head>
    <link
        href="https://fonts.googleapis.com/css?family=Work+Sans:200,400&display=swap"
        rel="stylesheet"
    />
</head>

<!--header-->
<nav id="header" class="w-full z-30 top-0 py-1">
    <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3"
    >
        <div class="order-1 md:order-2">
            <a
                class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
                href="{ base }/"
                >
                <img src = "favicon.svg" height="80px" width="80px" alt="My Happy SVG"/>

                Simple Wood Working
            </a>
        </div>

        <div class="order-2 md:order-3 flex items-center" id="nav-content">
            <nav>
                <ul
                    class="flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0"
                >
                    <li>
                        <a
                            class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                            href="mailto:simplewoodworking.sww@gmail.com">simplewoodworking.sww@gmail.com</a
                        >
                    </li>
                    <li>|</li>
                    <li>
                        <a
                            class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                            href="#about-us">About Us</a
                        >
                    </li>
                    <li>|</li>
                    <li>
                        <a
                            class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                            href="{base}/cart">Cart</a
                        >
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</nav>

<!-- Page contents -->
<slot />

<!-- footer -->
<footer
    id="about-us"
    class="container mx-auto bg-white py-8 border-t border-gray-400"
>
    <div class="container flex px-3 py-8">
        <div class="w-full mx-auto flex flex-wrap">
            <div class="flex w-full lg:w-1/2">
                <div class="px-3 md:px-0">
                    <h3 class="font-bold text-gray-900">About Us</h3>
                    <p class="py-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas vel mi ut felis tempus commodo nec id erat.
                        Suspendisse consectetur dapibus velit ut lacinia. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas vel mi ut felis tempus commodo nec id erat.
                        Suspendisse consectetur dapibus velit ut lacinia.
                    </p>
                </div>
            </div>
            <div class="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
                <div class="px-3 md:px-0">
                    <h3 class="font-bold text-gray-900">Contact Us</h3>
                    <ul class="list-reset items-center pt-3">
                        <li>
                            <a
                                class="inline-block no-underline hover:text-black hover:underline py-1"
                                href="mailto:simplewoodworking.sww@gmail.com">simplewoodworking.sww@gmail.com</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>

<style lang="postcss">
    :global(body) {
        @apply bg-white text-gray-600 leading-normal text-base tracking-normal;
        font-family: "Work Sans", sans-serif;
    }
</style>
