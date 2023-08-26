<script lang="ts">
    export let title: string;
    export let link: string;
</script>

<div class="h-96 w-full md:w-1/1 xl:w-1/2 p-6">
    <p class="text-xl">{title}</p>
    <iframe
        class="w-full h-full object-cover"
        {title}
        src={link}
        frameborder="0"
        allowfullscreen
    />
</div>
