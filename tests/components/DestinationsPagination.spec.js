// tests/components/DestinationsPagination.spec.js
import { mount } from "@vue/test-utils";
import DestinationsPagination from "@/components/DestinationsPagination.vue";

describe("DestinationsPagination.vue", () => {
    const factory = (props = {}) => {
        return mount(DestinationsPagination, {
            props: {
                currentPage: 1,
                totalPages: 1,
                ...props,
            },
        });
    };

    it("does not render if totalPages is 1 or less", () => {
        const wrapper = factory({ totalPages: 1 });
        expect(wrapper.find("div").exists()).toBe(false);

        const wrapper2 = factory({ totalPages: 0 });
        expect(wrapper.find("div").exists()).toBe(false);
    });

    it("renders correct number of page buttons if totalPages <= 5", () => {
        const wrapper = factory({ totalPages: 3, currentPage: 2 });
        const buttons = wrapper.findAll("button");
        // Prev + Next + 3 pages = 5 buttons
        expect(buttons.length).toBe(5);

        // Stranice su 1,2,3
        expect(wrapper.text()).toContain("1");
        expect(wrapper.text()).toContain("2");
        expect(wrapper.text()).toContain("3");
    });

    it("renders correct visiblePages with ellipsis for many pages", () => {
        const wrapper = factory({ totalPages: 10, currentPage: 1 });
        expect(wrapper.text()).toContain("...");
        expect(wrapper.text()).toContain("10");

        // Current page 5 should show ellipsis on both sides
        wrapper.setProps({ currentPage: 5 });
        // wait for update
        return wrapper.vm.$nextTick().then(() => {
            expect(wrapper.text()).toContain("...");
            expect(wrapper.text()).toContain("1");
            expect(wrapper.text()).toContain("5");
            expect(wrapper.text()).toContain("10");
        });
    });

    it("Prev button is disabled on first page and Next button is disabled on last page", () => {
        let wrapper = factory({ currentPage: 1, totalPages: 5 });
        const buttons = wrapper.findAll("button");

        const prevBtn = buttons[0];
        const nextBtn = buttons[buttons.length - 1];

        expect(prevBtn.attributes("disabled")).toBeDefined();
        expect(nextBtn.attributes("disabled")).toBeUndefined();

        wrapper = factory({ currentPage: 5, totalPages: 5 });
        const buttons2 = wrapper.findAll("button");
        const prevBtn2 = buttons2[0];
        const nextBtn2 = buttons2[buttons2.length - 1];

        expect(prevBtn2.attributes("disabled")).toBeUndefined();
        expect(nextBtn2.attributes("disabled")).toBeDefined();
    });

    it("emits 'page-change' event with correct page on page button click", async () => {
        const wrapper = factory({ currentPage: 3, totalPages: 5 });

        const buttons = wrapper.findAll("button");

        // buttons order: Prev, pages..., Next
        // Click page 2 button (index 2, after Prev at index 0)
        await buttons[2].trigger("click");

        expect(wrapper.emitted("page-change")).toBeTruthy();
        expect(wrapper.emitted("page-change")[0]).toEqual([2]);
    });

    it("does not emit 'page-change' if page is out of range", async () => {
        const wrapper = factory({ currentPage: 1, totalPages: 5 });

        const buttons = wrapper.findAll("button");
        // Prev button tries to go to page 0 (out of range)
        await buttons[0].trigger("click");
        expect(wrapper.emitted("page-change")).toBeFalsy();

        // Next button on last page tries to go beyond totalPages
        await wrapper.setProps({ currentPage: 5 });
        await buttons[buttons.length - 1].trigger("click");
        expect(wrapper.emitted("page-change")).toBeFalsy();
    });
});
