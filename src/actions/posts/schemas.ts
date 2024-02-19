import { z } from 'zod'

export const PostSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
})

export const CreatePostSchema = PostSchema.omit({ id: true })
export const UpdatePostSchema = PostSchema
export const DeletePostSchema = PostSchema.pick({ id: true })

export type CreatePostValues = z.infer<typeof CreatePostSchema>
export type UpdatePostValues = z.infer<typeof UpdatePostSchema>
export type DeletePostValues = z.infer<typeof DeletePostSchema>
