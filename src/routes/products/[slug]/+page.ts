import { productsBySlug } from '$lib/products';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    let product = productsBySlug.get(params.slug);
    if (product === undefined) {
        throw error(404, 'Not found');
    }

    return {
        product
    };
}