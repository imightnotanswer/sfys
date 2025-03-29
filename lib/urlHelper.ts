export function urlFor(image: { asset: { _ref: string } }) {
    return {
        url: () => image.asset._ref
    };
} 