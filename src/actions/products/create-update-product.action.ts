import { ImageUpload } from "@utils/image-upload";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, Product, ProductImage } from "astro:db";
import { getSession } from "auth-astro/server";
import { v4 as UUID } from "uuid";

const MAX_FILE_SIZE = 5_000_000; // 5MB
const ACEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const createUpdateProduct = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    slug: z.string(),
    gender: z.string(),
    sizes: z.string(),
    tags: z.string(),
    type: z.string(),

    // TODO: Imagenes
    imageFiles: z
      .array(
        z
          .instanceof(File)
          .refine((file) => file.size <= MAX_FILE_SIZE, "Max image size 5MB")
          .refine((file) => {
            if (file.size === 0) return true;

            return ACEPTED_FILE_TYPES.includes(file.type);
          }, `Only supports: ${ACEPTED_FILE_TYPES.join(", ")}`)
      )
      .optional(),
  }),
  handler: async (form, { request }) => {
    const session = await getSession(request);
    const user = session?.user;

    if (!user) {
      throw new Error("Unauthorized");
    }

    if (!user.id) {
      throw new Error("User ID is required");
    }

    const { id = UUID(), imageFiles, ...rest } = form;
    rest.slug = rest.slug.toLowerCase().replaceAll(" ", "-").trim();

    const product = {
      id: id,
      userId: user.id,
      ...rest,
    };

    const queries: any = [];

    if (!form.id) {
      queries.push(db.insert(Product).values(product));
    } else {
      queries.push(db.update(Product).set(product).where(eq(Product.id, id)));
    }

    const secureUrls: string[] = [];
    if (
      form.imageFiles &&
      form.imageFiles.length > 0 &&
      form.imageFiles[0].size > 0
    ) {
      const urls = await Promise.all(
        form.imageFiles.map((file) => ImageUpload.upload(file))
      );
      secureUrls.push(...urls);
    }

    secureUrls.forEach((imageUrl) => {
      const imageObj = {
        id: UUID(),
        image: imageUrl,
        productId: product.id,
      };

      queries.push(db.insert(ProductImage).values(imageObj));
    });

    await db.batch(queries);

    return product;
  },
});
