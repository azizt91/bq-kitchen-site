import { defineField, defineType } from "sanity";

/**
 * project schema
 * Represents a portfolio project / completed work item.
 * Includes a rich text description, photo gallery, and category reference.
 */
export default defineType({
  name: "project",
  title: "Proyek / Portfolio",
  type: "document",
  icon: () => "🏠",
  fields: [
    defineField({
      name: "title",
      title: "Judul Proyek",
      type: "string",
      description: "Contoh: Kitchen Set Minimalis Pak Budi, Slawi",
      validation: (Rule) => Rule.required().min(5).max(120),
    }),

    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      description: "URL unik halaman proyek ini. Auto-generate dari judul.",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainImage",
      title: "Foto Utama",
      type: "image",
      description: "Foto utama yang tampil di kartu portfolio dan hero halaman proyek.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text (untuk SEO)",
          description: "Contoh: Kitchen Set Minimalis Modern di Slawi, Jawa Tengah",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "gallery",
      title: "Galeri Foto",
      type: "array",
      description: "Upload semua foto proyek. Akan tampil sebagai galeri dengan lightbox di halaman detail.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
    }),

    defineField({
      name: "localizedLocation",
      title: "Lokasi",
      type: "string",
      description: "Contoh: Slawi, Tegal — atau nama area spesifik. Penting untuk SEO lokal.",
      validation: (Rule) => Rule.required().max(80),
    }),

    defineField({
      name: "description",
      title: "Deskripsi Proyek",
      type: "blockContent", // Rich text
      description: "Ceritakan detail proyek ini: kebutuhan klien, solusi, material, proses.",
    }),

    defineField({
      name: "materialsUsed",
      title: "Material yang Digunakan",
      type: "string",
      description: "Contoh: HPL Taco, Plywood Birch, Engsel Blum, Aksesoris Hafele",
    }),

    defineField({
      name: "duration",
      title: "Durasi Pengerjaan",
      type: "string",
      description: "Contoh: 3 Minggu, 1 Bulan",
    }),
    defineField({
      name: "priceRange",
      title: "Estimasi Biaya / Range Harga",
      type: "string",
      description: "Contoh: Rp 15jt - 20jt. Kosongkan jika tidak ingin ditampilkan.",
    }),

    defineField({
      name: "completionDate",
      title: "Tanggal Selesai",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),

    defineField({
      name: "category",
      title: "Kategori Layanan",
      type: "reference",
      to: [{ type: "service" }],
      description: "Pilih kategori layanan yang sesuai dengan proyek ini.",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "localizedLocation",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Proyek tanpa judul",
        subtitle: subtitle ?? "Lokasi belum diisi",
        media,
      };
    },
  },

  orderings: [
    {
      title: "Terbaru",
      name: "completionDateDesc",
      by: [{ field: "completionDate", direction: "desc" }],
    },
  ],
});
