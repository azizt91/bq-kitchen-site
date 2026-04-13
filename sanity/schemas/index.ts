/**
 * Sanity Schema Index
 * Register all schema types here. Order determines sidebar order in Studio.
 */
import blockContent  from "./blockContent";
import project       from "./project";
import service       from "./service";
import siteSettings  from "./siteSettings";

const schemas = [
  // Singleton
  siteSettings,
  // Collections
  project,
  service,
  // Reusable types
  blockContent,
];

export default schemas;
