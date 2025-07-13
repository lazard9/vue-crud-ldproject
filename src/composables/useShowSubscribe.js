import { computed } from 'vue';
import { useRoute } from 'vue-router';

/**
 * Composable that returns a computed property that indicates whether or not to display
 * the subscribe form on a given route.
 *
 * The subscribe form is hidden on certain routes, such as the admin dashboard, the
 * destination edit and add pages, and any other routes added to the excludedPaths array.
 *
 * @returns {Object} An object containing a single property, `showSubscribeForm`, which is
 * a computed boolean indicating whether or not the subscribe form should be shown on the
 * current route.
 */
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
