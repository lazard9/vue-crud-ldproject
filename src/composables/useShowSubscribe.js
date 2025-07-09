import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useShowSubscribe() {
    const route = useRoute();

    const excludedPaths = [
        '/admin',
        '/destinations/edit',
        '/destinations/add',
        // add other excluded paths as needed
    ];

    const showSubscribeForm = computed(() => {
        return !excludedPaths.some(path => route.path.startsWith(path));
    });

    return { showSubscribeForm };
}
