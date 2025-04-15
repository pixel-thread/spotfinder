import { EndpointT } from '~/src/types/endpoints';

/**
 * Available parking endpoint keys.
 * Format: HTTP_METHOD_ACTION
 *
 * @property GET_PARKING - Get all parking locations
 * @property GET_PARKING_BY_ID - Get parking details by ID
 * @property GET_NEARBY_PARKING - Get nearby parking locations
 * @property POST_BOOK_PARKING - Book a parking spot
 */
type ParkingEndpointKeys =
  | 'GET_PARKING'
  | 'GET_PARKING_BY_ID'
  | 'GET_NEARBY_PARKING'
  | 'POST_BOOK_PARKING';

/**
 * Parking API endpoints configuration.
 * Uses EndpointT generic type for type-safe endpoint definitions.
 *
 * @example
 * ```typescript
 * // Using an endpoint
 * const parkingUrl = PARKING_ENDPOINT.GET_PARKING; // "/parking"
 * const parkingDetailUrl = PARKING_ENDPOINT.GET_PARKING_BY_ID; // "/parking/:id"
 * ```
 */

export const PARKING_ENDPOINT: EndpointT<ParkingEndpointKeys> = {
  GET_PARKING: '/parking',
  GET_PARKING_BY_ID: '/parking/:id',
  GET_NEARBY_PARKING: '/parking/nearby',
  POST_BOOK_PARKING: '/parking/book',
};
