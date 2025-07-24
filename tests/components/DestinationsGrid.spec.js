// tests/components/DestinationsGrid.spec.js
import { mount, flushPromises } from "@vue/test-utils";
import DestinationsGrid from "@/components/DestinationsGrid.vue";
import DestinationCard from "@/components/DestinationCard.vue";
import DestinationsPagination from "@/components/DestinationsPagination.vue";
import Spinner from "@/components/Spinner.vue";

vi.mock("@/api/destinations", () => ({
    getAllDestinations: vi.fn(),
}));

import { getAllDestinations } from "@/api/destinations";

describe("DestinationsGrid.vue", () => {
    const mockDestinations = [
        {
            id: 1,
            title: "Rome",
            tags: ["history"],
            slug: "rome",
            price: 100,
            excerpt: "",
            imageUrl: "",
        },
        {
            id: 2,
            title: "Paris",
            tags: ["romantic"],
            slug: "paris",
            price: 200,
            excerpt: "",
            imageUrl: "",
        },
        {
            id: 3,
            title: "Tokyo",
            tags: ["modern"],
            slug: "tokyo",
            price: 300,
            excerpt: "",
            imageUrl: "",
        },
    ];

    const mountComponent = async (props = {}) => {
        getAllDestinations.mockResolvedValue([...mockDestinations]);

        const wrapper = mount(DestinationsGrid, {
            props,
            global: {
                stubs: {
                    DestinationCard: true,
                    DestinationsPagination: true,
                    Spinner: true,
                },
            },
        });

        await flushPromises();
        return wrapper;
    };

    it("shows Spinner while loading", async () => {
        getAllDestinations.mockReturnValue(new Promise(() => { }));

        const wrapper = mount(DestinationsGrid, {
            props: {},
            global: { stubs: { Spinner: true } },
        });

        expect(wrapper.findComponent(Spinner).exists()).toBe(true);
    });

    it("shows error message if API call fails", async () => {
        getAllDestinations.mockRejectedValue(new Error("API failed"));

        const wrapper = mount(DestinationsGrid, {
            global: {
                stubs: {
                    Spinner: true,
                },
            },
        });

        await flushPromises();

        expect(wrapper.text()).toContain("API failed");
    });

    it('shows "No destinations found" if API returns empty list', async () => {
        getAllDestinations.mockResolvedValue([]);

        const wrapper = mount(DestinationsGrid, {
            global: {
                stubs: {
                    Spinner: true,
                },
            },
        });

        await flushPromises();

        expect(wrapper.text()).toContain("No destinations found");
    });

    it("renders DestinationCard for each destination", async () => {
        const wrapper = await mountComponent();

        const cards = wrapper.findAllComponents(DestinationCard);
        expect(cards).toHaveLength(3);
    });

    it("filters destinations by tag", async () => {
        const wrapper = await mountComponent({ filterTag: "romantic" });

        const cards = wrapper.findAllComponents(DestinationCard);
        expect(cards).toHaveLength(1);
    });

    it("limits destinations if limit prop is set", async () => {
        const wrapper = await mountComponent({ limit: 2 });

        const cards = wrapper.findAllComponents(DestinationCard);
        expect(cards).toHaveLength(2);
    });

    it("paginates destinations if postsPerPage is set and limit is not", async () => {
        const wrapper = await mountComponent({ postsPerPage: 2 });

        const pagination = wrapper.findComponent(DestinationsPagination);
        expect(pagination.exists()).toBe(true);
        expect(pagination.props("currentPage")).toBe(1);
        expect(pagination.props("totalPages")).toBe(2);
    });
});
