export type Either<L, A> = Fail<L> | Success<A>;

export class Fail<L> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  public isFail(): this is Fail<L> {
    return true;
  }

  public isSuccess(): this is Success<null> {
    return false;
  }
}

export class Success<A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isSuccess(): this is Success<A> {
    return true;
  }

  isFail(): this is Fail<null> {
    return false;
  }
}

export const fail = <L>(l: L): Fail<L> => {
  return new Fail<L>(l);
};

export const success = <A>(a: A): Success<A> => {
  return new Success<A>(a);
};
