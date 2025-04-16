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
type PartenerShipEndpointKeys = 'POST_REQUEST_PARTNER_SHIP';

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

export const PARTNER_ENDPOINT: EndpointT<PartenerShipEndpointKeys> = {
  POST_REQUEST_PARTNER_SHIP: '/partner',
};
