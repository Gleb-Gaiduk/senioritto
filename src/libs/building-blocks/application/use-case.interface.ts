export interface IUseCase<TRequest, TResponse> {
  execute(requset?: TRequest): Promise<TResponse> | TResponse;
}
