export default {
  connectAsync: async () => ({
    publish: jest.fn(),
    end: jest.fn(),
  }),
};
