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
  price: z.string().default('30'),
  pinCode: z.string(),
  description: z.string(),
  features: z.string(),
  userId: z.string().uuid(),
  slots: z.array(slotSchema).optional(),
  openHours: z.string().optional(),
  id: z.string().uuid().optional(),
  distance: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  rating: z.array(z.string().uuid().optional()).optional(),
});
