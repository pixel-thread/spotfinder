import { z } from 'zod';

const slotSchema = z.object({
  id: z.string().uuid().optional(),
  slotNumber: z.number().optional(),
  isOccupied: z.boolean().optional(),
  type: z.string().optional(),
});

export const parkingSchema = z.object({
  name: z.string(),
  address: z.string(),
  price: z.string(),
  pinCode: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  userId: z.string().uuid(),
  gallery: z.any().optional(),
  slots: z.array(slotSchema).optional(),
  openHours: z.string().optional(),
  id: z.string().uuid().optional(),
  distance: z.string().optional(),
  image: z.string().url().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  rating: z.array(z.string().uuid().optional()).optional(),
});
