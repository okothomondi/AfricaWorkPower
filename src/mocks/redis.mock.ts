export const redisMock = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  on: jest.fn(),
  disconnect: jest.fn(),
  setex: jest.fn(),
};

export default function Redis() {
  return redisMock;
}
