// tests/components/DestinationTagList.spec.js
import { mount } from "@vue/test-utils";
import DestinationTagList from "@/components/DestinationTagList.vue";

describe("DestinationTagList.vue", () => {
    // Stub RouterLink to avoid problems in the test environment
    const global = {
        stubs: {
            RouterLink: {
                template: '<a :href="to"><slot /></a>',
                props: ["to"],
            },
        },
    };

    it("renderuje samo tagove koji nisu u excludeTags", () => {
        const tags = ["beach", "mountain", "top", "city"];
        const excludeTags = ["top", "pinned"];

        const wrapper = mount(DestinationTagList, {
            props: { tags, excludeTags },
            global,
        });

        // We remove 'top' from excludeTags, so that other than 'top' are displayed
        expect(wrapper.text()).toContain("beach");
        expect(wrapper.text()).toContain("mountain");
        expect(wrapper.text()).toContain("city");
        expect(wrapper.text()).not.toContain("top");
    });

    it("primenjuje prosleđeni CSS class na tagove", () => {
        const tags = ["beach"];
        const tagClass = "custom-class";

        const wrapper = mount(DestinationTagList, {
            props: { tags, tagClass },
            global,
        });

        const link = wrapper.find("a");
        expect(link.classes()).toContain("custom-class");
    });

    it("default excludeTags su ispravni", () => {
        const tags = ["top", "pinned", "grid", "beach"];

        const wrapper = mount(DestinationTagList, {
            props: { tags },
            global,
        });

        // 'top', 'pinned' and 'grid' should not be displayed
        expect(wrapper.text()).toContain("beach");
        expect(wrapper.text()).not.toContain("top");
        expect(wrapper.text()).not.toContain("pinned");
        expect(wrapper.text()).not.toContain("grid");
    });

    it("rendeuje prazan div ako nema tagova", () => {
        const wrapper = mount(DestinationTagList, {
            props: { tags: [] },
            global,
        });

        expect(wrapper.html()).toContain(
            '<div class="flex flex-wrap gap-1"></div>'
        );
    });
});
