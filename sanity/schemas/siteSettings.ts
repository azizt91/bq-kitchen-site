import { defineField, defineType } from "sanity";

/**
 * siteSettings schema
 * Singleton document — one document stores all global site config.
 * Access via: *[_type == "siteSettings"][0]
 */
export default defineType({
  name: "siteSettings",
  title: "Pengaturan Website",
  type: "document",
  icon: () => "⚙️",
  // Note: Singleton behavior is enforced via the Sanity Studio structureTool
  // config in sanity.config.ts (only "update" and "publish" shown in sidebar).
  fields: [
    defineField({
      name: "companyName",
      title: "Nama Perusahaan",
      type: "string",
      description: "Contoh: BQ Kitchen Set & Interior Design",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainHeroImage",
      title: "Foto Hero Utama",
      type: "image",
      description: "Foto full-width yang tampil di halaman utama (Home). Gunakan foto dapur terbaik.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Contoh: Kitchen Set Modern Premium oleh BQ Kitchen Tegal Slawi",
        },
      ],
    }),

    defineField({
      name: "contactNumber",
      title: "Nomor Telepon / HP",
      type: "string",
      description: "Contoh: 0813-8520-3317",
    }),

    defineField({
      name: "contactAddress",
      title: "Alamat Lengkap",
      type: "text",
      rows: 3,
      description: "Alamat workshop/toko. Tampil di footer dan halaman kontak.",
    }),
    defineField({
      name: "email",
      title: "Email Bisnis",
      type: "string",
      description: "Contoh: bqkitchen12@gmail.com",
    }),

    defineField({
      name: "whatsappNumber",
      title: "Nomor WhatsApp",
      type: "string",
      description:
        "Format internasional TANPA spasi dan TANPA tanda plus (+). Contoh: 6281385203317 — sistem otomatis membuat link wa.me/6281385203317",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d+$/, { name: "digitsOnly", invert: false })
          .error("Masukkan hanya angka, tanpa spasi atau tanda +. Contoh: 6281385203317"),
    }),

    defineField({
      name: "instagramUrl",
      title: "URL Instagram",
      type: "url",
      description: "Contoh: https://www.instagram.com/bqkitchenset",
    }),

    defineField({
      name: "facebookUrl",
      title: "URL Facebook",
      type: "url",
      description: "Contoh: https://www.facebook.com/bqkitchenset",
    }),

    defineField({
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description:
        "Buka Google Maps → bagikan/share → Embed a map → salin seluruh URL dari src='...' di dalam kode iframe.",
    }),
  ],

  preview: {
    select: {
      title: "companyName",
    },
    prepare({ title }) {
      return {
        title: title ?? "Pengaturan Website",
        subtitle: "Klik untuk mengedit pengaturan global",
      };
    },
  },
});
