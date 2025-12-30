// Profile to Template mapping
// Maps profile ID (filename without .json) to template ID and optional prompt file
export const profileTemplateMapping = {
    "1": {
        resume: "James Davis",
        template: "Resume-Tech-Teal",
        prompt: "james-davis"
    },
    "2": {
        resume: "Luis Manriquez",
        template: "Resume-Creative-Burgundy",
        prompt: "luis-manriquez"
    },
    "3": {
        resume: "Michael Smith",
        template: "Resume-Bold-Emerald",
        prompt: "michael-smith"
    },
    "4": {
        resume: "Kareem Maize AI",
        template: "Resume-Modern-Green",
        prompt: "kareem-maize-ai"
    },
    "5": {
        resume: "Vinay Matoori",
        template: "Resume-Corporate-Slate",
        prompt: "vinay-matorio"
    },
    "6": {
        resume: "Olexandr Kutakh Verified",
        template: "Resume-Executive-Navy",
        prompt: "olexandr-kutakh"
    }
};

/**
 * Get profile configuration by slug (numeric ID)
 * @param {string} slug - The numeric ID slug (e.g., "1", "2", "3")
 * @returns {object|null} - Profile configuration or null if not found
 */
export const getProfileBySlug = (slug) => {
    if (!slug) return null;
    return profileTemplateMapping[slug] || null;
};

/**
 * Get resume name (profile name) by slug
 * @param {string} slug - The numeric ID slug (e.g., "1", "2", "3")
 * @returns {string|null} - Resume name or null if not found
 */
export const slugToProfileName = (slug) => {
    const config = getProfileBySlug(slug);
    return config?.resume || null;
};

/**
 * Get template for a profile by slug
 * @param {string} slug - The numeric ID slug (e.g., "1", "2", "3")
 * @returns {string} - Template ID or "Resume" as default
 */
export const getTemplateForProfile = (slug) => {
    const config = getProfileBySlug(slug);
    return config?.template || "Resume";
};

/**
 * Get prompt file name for a profile by slug
 * @param {string} slug - The numeric ID slug (e.g., "1", "2", "3")
 * @returns {string} - Prompt file name or "default"
 */
export const getPromptForProfile = (slug) => {
    const config = getProfileBySlug(slug);
    return config?.prompt || "default";
};

/**
 * Get all available slug values (numeric IDs from mapping)
 * @returns {string[]} - Array of available slugs (numeric IDs)
 */
export const getAvailableSlugs = () => {
    return Object.keys(profileTemplateMapping);
};

/**
 * Get profile configuration by profile ID (numeric key)
 * @param {string} profileId - The numeric profile ID
 * @returns {object|null} - Profile configuration or null if not found
 */
export const getProfileById = (profileId) => {
    return profileTemplateMapping[profileId] || null;
};

export default profileTemplateMapping;

