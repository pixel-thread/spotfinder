import { EndpointT } from '~/src/types/endpoints';

type UserEndpointKeys = 'PUT_USER' | 'PUT_USER_PASSWORD';

export const USER_ENDPOINT: EndpointT<UserEndpointKeys> = {
  PUT_USER: '/user/:id',
  PUT_USER_PASSWORD: '/user/:id/password',
};
