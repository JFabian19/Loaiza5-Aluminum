/**
 * Centralized image constants.
 * 
 * To replace these with clearer, faster web URLs:
 * 1. Upload your images to a CDN (like Cloudinary, ImgBB, or AWS S3).
 * 2. Get the direct URL (e.g., https://res.cloudinary.com/.../image.jpg).
 * 3. Replace the local path strings below with the new URLs.
 * 
 * To improve quality/speed:
 * - Use a CDN that auto-optimizes (Cloudinary does this).
 * - Use "Smart Upscaler" tools (like icons8.com/upscaler) before uploading if the source is blurry.
 */

export const IMAGES = {
    LOGO: "/logo.webp",
    FAVICON: "/favicon.png",
    MAIN_HERO: "/hero_main.webp",
    MAIN_HERO_MOBILE: "/hero_main_mobile.webp",

    // Service Hero Images
    SERVICES: {
        POOL_CAGES: "/image_10.webp",
        REPAIRS: "/image_4.webp",
        GLASS_ROOMS: "/image_3.webp",
        LANAIS: "/image_1.webp",
        PORCHES: "/image_7.webp",
    },

    // Project Gallery Images
    PROJECTS: {
        MODERN_POOL_CAGE: "/image_9.webp",
        FULL_RESCREEN: "/image_10.webp",
        WHITE_GLASS_ROOM: "/image_2.webp",
        STORM_REPAIR: "/image_4.webp",
        DOUBLE_CARPORT: "/image_6.webp",
        FRONT_PORCH: "/image_5.webp",
    }
} as const;
