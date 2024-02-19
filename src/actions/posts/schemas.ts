import { z } from 'zod'

export const createPostSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
})

export type CreatePostValues = z.infer<typeof createPostSchema>

// .omit({ id: true })
// export const UpdatePost = PostSchema
// export const DeletePost = PostSchema.pick({ id: true })
