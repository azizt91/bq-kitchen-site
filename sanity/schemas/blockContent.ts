import { defineType, defineArrayMember } from "sanity";

/**
 * blockContent schema
 * Reusable rich text definition used in the Project "description" field.
 */
export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal",    value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote",     value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong",    value: "strong" },
          { title: "Emphasis",  value: "em" },
          { title: "Underline", value: "underline" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Deskripsi gambar untuk SEO dan aksesibilitas",
        },
      ],
    }),
  ],
});
