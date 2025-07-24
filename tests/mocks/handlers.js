import { rest } from "msw";

const destinations = [
    {
        id: "1",
        title: "Paris",
        slug: "paris",
        imageUrl: "paris.jpg",
        imageAlt: "Paris",
        tags: ["romantic", "europe"],
    },
    {
        id: "2",
        title: "Paris 1",
        slug: "paris-1",
        imageUrl: "paris1.jpg",
        imageAlt: "Paris 1",
        tags: ["romantic", "europe"],
    },
    {
        id: "3",
        title: "Paris 2",
        slug: "paris-2",
        imageUrl: "paris2.jpg",
        imageAlt: "Paris 2",
        tags: ["romantic", "europe"],
    },
    {
        id: "4",
        title: "Tokyo",
        slug: "tokyo",
        imageUrl: "tokyo.jpg",
        imageAlt: "Tokyo",
        tags: ["city", "asia"],
    },
];

function getDestinationBySlug(slug) {
    return destinations.find((d) => d.slug === slug);
}

function getDestinationsBySlugLike(slugLike) {
    return destinations.filter((d) =>
        d.slug.toLowerCase().includes(slugLike.toLowerCase())
    );
}

export const handlers = [
    rest.get("/api/destinations", (req, res, ctx) => {
        const slug = req.url.searchParams.get("slug");
        const slugLike = req.url.searchParams.get("slug_like");

        if (slug) {
            const destination = getDestinationBySlug(slug);
            return res(
                ctx.status(200),
                ctx.json(destination ? [destination] : [])
            );
        }

        if (slugLike) {
            const matched = getDestinationsBySlugLike(slugLike);
            return res(ctx.status(200), ctx.json(matched));
        }

        // Default: return all destinations
        return res(ctx.status(200), ctx.json(destinations));
    }),

    rest.delete("/api/destinations/:id", (req, res, ctx) => {
        // Simulate successful delete
        return res(ctx.status(204));
    }),

    rest.post("/api/destinations", async (req, res, ctx) => {
        const newItem = await req.json();
        return res(ctx.status(201), ctx.json(newItem));
    }),

    rest.patch("/api/destinations/:id", async (req, res, ctx) => {
        const updatedItem = await req.json();
        return res(ctx.status(200), ctx.json(updatedItem));
    }),
];
