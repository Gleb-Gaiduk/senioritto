export class ValidationGuard {
  static isEmptyValue(value: unknown): boolean {
    const valueType = typeof value;

    if (valueType === 'number' || valueType === 'boolean') {
      return false;
    }

    if (valueType === 'undefined' || value === null || value === '') {
      return true;
    }

    if (value instanceof Date) {
      return false;
    }

    if (value instanceof Object && !Object.keys(value).length) {
      return true;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }

      if (value.every((item) => ValidationGuard.isEmptyValue(item))) {
        return true;
      }
    }

    return false;
  }
}
