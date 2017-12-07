import api from './init'

export function listProducts() {
  return api.get('/products')
    .then((res) => './api/auth')
}