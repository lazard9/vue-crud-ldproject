// tests/components/DestinationsSlider.spec.js
import { mount, flushPromises } from "@vue/test-utils";
import DestinationsSlider from "@/components/DestinationsSlider.vue";
import { getAllDestinations } from "@/api/destinations";

// Mock API call
vi.mock("@/api/destinations", () => ({
    getAllDestinations: vi.fn(),
}));

describe("DestinationsSlider.vue", () => {
    const destinations = [
        {
            id: 1,
            title: "Rome",
            tags: ["popular", "history"],
            excerpt: "Explore Rome",
            slug: "rome",
            imageUrl: "rome.jpg",
            imageAlt: "Rome Alt",
            price: 120,
        },
        {
            id: 2,
            title: "Paris",
            tags: ["romantic"],
            excerpt: "Discover Paris",
            slug: "paris",
            imageUrl: "",
            imageAlt: "",
            price: 180,
        },
    ];

    const mountComponent = async (tag = "popular") => {
        getAllDestinations.mockResolvedValue([...destinations]);

        const wrapper = mount(DestinationsSlider, {
            props: { tag },
            global: {
                stubs: {
                    Swiper: {
                        template: "<div><slot /></div>",
                    },
                    SwiperSlide: {
                        template: '<div class="swiper-slide"><slot /></div>',
                    },
                    RouterLink: {
                        template: "<a><slot /></a>",
                    },
                    Spinner: true,
                },
            },
        });

        await flushPromises();
        return wrapper;
    };

    it("shows Spinner while loading", () => {
        getAllDestinations.mockReturnValue(new Promise(() => {}));
        const wrapper = mount(DestinationsSlider, {
            props: { tag: "any" },
            global: {
                stubs: { Spinner: true },
            },
        });

        expect(wrapper.findComponent({ name: "Spinner" }).exists()).toBe(true);
    });

    it("shows error message if API fails", async () => {
        getAllDestinations.mockRejectedValue(new Error("API failed"));

        const wrapper = mount(DestinationsSlider, {
            props: { tag: "any" },
            global: {
                stubs: { Spinner: true },
            },
        });

        await flushPromises();
        expect(wrapper.text()).toContain("Error: API failed");
    });

    it("filters destinations by tag", async () => {
        const wrapper = await mountComponent("romantic");
        expect(wrapper.text()).toContain("Paris");
        expect(wrapper.text()).not.toContain("Rome");
    });

    it("renders destination cards inside slides", async () => {
        const wrapper = await mountComponent("popular");
        expect(wrapper.text()).toContain("Rome");
        expect(wrapper.findAll(".swiper-slide").length).toBeGreaterThanOrEqual(
            1
        );
    });

    it("uses fallback image if imageUrl is missing", async () => {
        const wrapper = await mountComponent("romantic");

        const img = wrapper.find("img");
        expect(img.attributes("src")).toBe(
            "/media/minimalist-destination-card-01.jpg"
        );
    });

    it("renders all required content (title, price, excerpt)", async () => {
        const wrapper = await mountComponent("popular");
        const text = wrapper.text();

        expect(text).toContain("Rome");
        expect(text).toContain("$120");
        expect(text).toContain("Explore Rome");
    });
});
