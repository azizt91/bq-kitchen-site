/**
 * Sanity Studio Configuration
 *
 * This file configures the embedded Sanity Studio.
 * Studio is accessible at: /studio (configured as a Next.js route)
 *
 * To run standalone studio: npx sanity dev
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import schemas from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "bq-kitchen-studio",
  title: "BQ Kitchen — CMS Studio",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("BQ Kitchen CMS")
          .items([
            // Singleton: Site Settings (always one document)
            S.listItem()
              .title("Pengaturan Website")
              .id("siteSettings")
              .icon(() => "⚙️")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),

            S.divider(),

            // Collections
            S.listItem()
              .title("Proyek / Portfolio")
              .icon(() => "🏠")
              .child(
                S.documentTypeList("project")
                  .title("Daftar Proyek")
              ),

            S.listItem()
              .title("Layanan / Service")
              .icon(() => "🛠")
              .child(
                S.documentTypeList("service")
                  .title("Daftar Layanan")
              ),
          ]),
    }),
    visionTool(), // GROQ query explorer — useful for debugging
  ],

  schema: {
    types: schemas,
  },
});
