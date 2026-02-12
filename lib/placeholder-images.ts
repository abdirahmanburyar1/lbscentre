/**
 * Placeholder / default image URLs for the site.
 *
 * - Use these free (Unsplash) URLs for development and demo.
 * - For production, you can license images from Getty Images (agricultural development):
 *   https://www.gettyimages.com/photos/agricultural-development
 *   Then add those image URLs in the Admin (Projects, Programs, etc.) or replace these.
 *
 * Unsplash license: https://unsplash.com/license (free to use, attribution not required but appreciated)
 */

export const PLACEHOLDER_IMAGES = {
  /** Hero or general agricultural / development theme */
  hero:
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80",
  /** Farming / crops */
  agriculture:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  /** Community / field work */
  community:
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
  /** Training / education */
  training:
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  /** Nature / resilience */
  resilience:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
} as const;
