// src/api/destinations.js
import { v4 as uuidv4 } from "uuid";

let BASE_URL = "/api/destinations"; // default

// Vitest
if (import.meta.env.MODE === "test" && import.meta.env.VITE_API_BASE_URL) {
    BASE_URL = import.meta.env.VITE_API_BASE_URL;
}

/**
 * Fetches all destinations from the API.
 *
 * @returns {Promise<Object[]>} Promise that resolves to an array of destination objects.
 * @throws {Error} If the API request fails.
 */
export async function getAllDestinations() {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`Failed to fetch destinations`);
    return await response.json();
}

/**
 * Fetches a destination by its slug from the API.
 *
 * @param {string} slug Slug of the destination to fetch.
 * @returns {Promise<Object | null>} Promise that resolves to the destination object
 *                                  if found, or null if not found.
 * @throws {Error} If the API request fails.
 */
export async function getDestinationBySlug(slug) {
    const response = await fetch(`${BASE_URL}?slug=${slug}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data[0] || null;
}

/**
 * Deletes a destination by its ID from the API.
 *
 * @param {string} id ID of the destination to delete.
 * @returns {Promise<void>} Promise that resolves when the destination is deleted.
 * @throws {Error} If the API request fails.
 */
export async function deleteDestinationById(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

    if (!res.ok && res.status !== 204) {
        throw new Error(
            `Failed to delete destination with status: ${res.status}`
        );
    }
}

/**
 * Saves a destination to the API.
 *
 * @param {Object} data Destination data to save.
 * @param {Object} existingData Existing destination data, if any.
 * @returns {Promise<string>} Promise that resolves to the saved destination's slug.
 * @throws {Error} If the API request fails.
 */
export async function saveDestination(data, existingData) {
    const method = existingData ? "PATCH" : "POST";
    const url = existingData ? `${BASE_URL}/${existingData.id}` : BASE_URL;

    const { imageFile, ...cleanData } = data;
    const payload = { ...cleanData };

    if (existingData) {
        payload.slug = existingData.slug;
    } else {
        payload.slug = await generateUniqueSlug(data.title);
        payload.id = uuidv4();
    }

    if (data.imageFile) {
        payload.imageUrl = data.imageFile.name;
        payload.imageAlt = generateImageAlt(data.imageFile.name);
    } else if (payload.imageUrl && !payload.imageAlt) {
        payload.imageAlt = generateImageAlt(payload.imageUrl);
    } else if (!payload.imageAlt) {
        payload.imageAlt = "Destination image";
    }

    const parsedTags = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

    payload.tags = parsedTags;

    const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to save destination");
    }

    console.log("[Saving destination]", { method, url, payload });

    return payload.slug;
}

/**
 * Generates a unique slug based on a given title.
 * @param {string} title
 * @returns {Promise<string>} The generated slug
 */
export async function generateUniqueSlug(title) {
    const baseSlug = title.toLowerCase().trim().replace(/\s+/g, "-");
    const response = await fetch(`${BASE_URL}?slug_like=${baseSlug}`);
    const data = await response.json();

    if (!data.length) return baseSlug;

    let counter = 1;
    let newSlug = `${baseSlug}-${counter}`;
    const existingSlugs = data.map((d) => d.slug);

    while (existingSlugs.includes(newSlug)) {
        counter++;
        newSlug = `${baseSlug}-${counter}`;
    }

    return newSlug;
}

/**
 * Generates an image alt text from a filename.
 *
 * If the filename is blank or is unsuitable, returns "Destination image". Otherwise,
 * returns the filename without extension, with dashes and underscores replaced
 * with spaces, and with the first letter of each word capitalized.
 *
 * @param {string} filename - The image filename
 * @returns {string} The generated image alt text
 */
export function generateImageAlt(filename) {
    if (!filename) return "Destination image";

    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

    const isUnsuitableFilename =
        /^[\d\W_]+$/.test(nameWithoutExt) ||
        (/^[a-z0-9_-]{3,}$/.test(nameWithoutExt) &&
            !/[aeiou]/i.test(nameWithoutExt));

    if (isUnsuitableFilename) return "Destination image";

    return nameWithoutExt
        .replace(/[-_]/g, " ")
        .replace(/\s+/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .trim();
}
