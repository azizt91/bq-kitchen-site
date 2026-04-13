import { defineField, defineType } from "sanity";

/**
 * service schema
 * Represents a service offering (e.g. Kitchen Set, Wardrobe Custom).
 * Used as a category reference in the 'project' schema.
 */
export default defineType({
  name: "service",
  title: "Layanan / Service",
  type: "document",
  icon: () => "🛠",
  fields: [
    defineField({
      name: "title",
      title: "Nama Layanan",
      type: "string",
      description: "Contoh: Kitchen Set, Wardrobe Custom, Interior Rumah",
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: "icon",
      title: "Icon (Emoji atau SVG string)",
      type: "string",
      description:
        "Masukkan emoji (contoh: 🍳) atau komponen SVG sederhana untuk ditampilkan sebagai ikon layanan.",
    }),
    defineField({
      name: "briefDescription",
      title: "Deskripsi Singkat",
      type: "text",
      rows: 3,
      description: "Deskripsi singkat layanan ini (maks. 200 karakter).",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "startingPrice",
      title: "Harga Mulai Dari",
      type: "number",
      description: "Masukkan angka saja. Contoh: 1500000. Kosongkan jika tidak ingin ditampilkan.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "briefDescription",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Nama layanan belum diisi",
        subtitle,
      };
    },
  },
});
