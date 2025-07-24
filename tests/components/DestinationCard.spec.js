// tests/components/DestinationCard.spec.js
import { mount } from "@vue/test-utils";
import DestinationCard from "@/components/DestinationCard.vue";
import DestinationTagsList from "@/components/DestinationTagList.vue";

describe("DestinationCard.vue", () => {
    const destination = {
        title: "Santorini",
        excerpt: "A beautiful island in Greece.",
        price: 1200,
        slug: "santorini",
        imageUrl: "santorini.jpg",
        imageAlt: "View of Santorini",
        tags: ["beach", "sunset"],
    };

    const global = {
        stubs: {
            RouterLink: {
                template: '<a :href="to"><slot /></a>',
                props: ["to"],
            },
            DestinationTagsList,
        },
    };

    it("renders destination title, excerpt, price and image", () => {
        const wrapper = mount(DestinationCard, {
            props: { destination },
            global,
        });

        expect(wrapper.text()).toContain("Santorini");
        expect(wrapper.text()).toContain("A beautiful island in Greece.");
        expect(wrapper.text()).toContain("$1200");

        const img = wrapper.find("img");
        expect(img.attributes("src")).toContain(destination.imageUrl);
        expect(img.attributes("alt")).toBe(destination.imageAlt);
    });

    it("renders fallback image and alt if missing", () => {
        const minimalDestination = {
            ...destination,
            imageUrl: null,
            imageAlt: null,
        };

        const wrapper = mount(DestinationCard, {
            props: { destination: minimalDestination },
            global,
        });

        const img = wrapper.find("img");
        expect(img.attributes("src")).toContain(
            "minimalist-destination-card-01.jpg"
        );
        expect(img.attributes("alt")).toBe("Minimalist illustration card");
    });

    it("does not render tags if showTags is false", () => {
        const wrapper = mount(DestinationCard, {
            props: {
                destination,
                showTags: false,
            },
            global,
        });

        expect(wrapper.findComponent(DestinationTagsList).exists()).toBe(false);
    });

    it("renders tags if showTags is true", () => {
        const wrapper = mount(DestinationCard, {
            props: {
                destination,
                showTags: true,
            },
            global,
        });

        const tagsComponent = wrapper.findComponent(DestinationTagsList);
        expect(tagsComponent.exists()).toBe(true);
        expect(tagsComponent.props("tags")).toEqual(destination.tags);
    });

    it("contains a RouterLink with the correct destination URL", () => {
        const wrapper = mount(DestinationCard, {
            props: { destination },
            global,
        });

        const link = wrapper.find("a");
        expect(link.exists()).toBe(true);
        expect(link.attributes("href")).toBe("/destinations/santorini");
    });
});
