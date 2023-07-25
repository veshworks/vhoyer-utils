export const mockConsole = (methodsToMock) => {
  const methodsAndTheirMocks = Array.isArray(methodsToMock)
    ? methodsToMock.map(key => [key, () => {}])
    : Object.entries(methodsToMock);

  const consoleSpy = {};

  beforeAll(() => {
    methodsAndTheirMocks.forEach(([ method, implementation]) => {
      consoleSpy[method] = jest.spyOn(console, method);

      if (implementation) {
        consoleSpy[method].mockImplementation(implementation);
      }
    });
  });

  afterEach(() => {
    methodsAndTheirMocks.forEach(([method]) => {
      consoleSpy[method].mockClear();
    });
  });

  return consoleSpy;
};
