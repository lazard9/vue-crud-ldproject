// tests/api.test.js
import { describe, it, expect } from "vitest";
import {
    getAllDestinations,
    getDestinationBySlug,
    deleteDestinationById,
    generateUniqueSlug,
    saveDestination,
} from "../src/api/destinations";

describe("API: getAllDestinations", () => {
    it("returns an array of destinations from the mocked API", async () => {
        const destinations = await getAllDestinations();
        expect(Array.isArray(destinations)).toBe(true);
        expect(destinations.length).toBe(4);
    });
});

describe("API: getDestinationBySlug", () => {
    it("returns a destination object from the mocked API", async () => {
        const destination = await getDestinationBySlug("paris");
        expect(destination).toHaveProperty("slug", "paris");
        expect(destination).toHaveProperty("title", "Paris");
    });

    it("returns null if destination is not found", async () => {
        const destination = await getDestinationBySlug("non-existent-slug");
        expect(destination).toBeNull();
    });
});

describe("API: deleteDestinationById", () => {
    it("succeeds without throwing an error", async () => {
        await expect(deleteDestinationById("1")).resolves.not.toThrow();
    });
});

describe("API: generateUniqueSlug", () => {
    it("generates the base slug if unique", async () => {
        const slug = await generateUniqueSlug("New Unique Place");
        expect(slug).toBe("new-unique-place");
    });

    it("generates a unique slug by appending a number if needed", async () => {
        const slug = await generateUniqueSlug("Paris");
        expect(slug).toBe("paris-3");
    });
});

describe("API: saveDestination", () => {
    it("creates a new destination and returns slug", async () => {
        const newDest = {
            title: "New York",
            tags: "city, usa",
            imageFile: null,
        };
        const slug = await saveDestination(newDest, null);
        expect(slug).toBeDefined();
        expect(typeof slug).toBe("string");
        expect(slug).toContain("new-york");
    });

    it("updates an existing destination and returns the same slug", async () => {
        const existing = { id: "1", slug: "paris" };
        const updatedDest = {
            title: "Paris Updated",
            tags: "romantic, europe",
            imageFile: null,
        };
        const slug = await saveDestination(updatedDest, existing);
        expect(slug).toBe(existing.slug);
    });
});
