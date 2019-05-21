class RunLock {
  private lock: boolean;
  constructor() {
    this.lock = false;
  }

  get locked() {
    return this.lock;
  }

  set locked(val: boolean) {
    this.lock = val;
  }
}

export default new RunLock();
