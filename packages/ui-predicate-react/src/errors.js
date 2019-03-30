export class InitializationFailed extends Error {
  constructor(message) {
    super(message);
    this.name = 'InitializationFailed';
  }
}

export default { InitializationFailed };
