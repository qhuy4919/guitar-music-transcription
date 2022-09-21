declare global {
	export type Not<T, U> = T extends U ? never : TextDecoder
	export type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
	// export type PayloadOfAction<A extends PayloadAction> = ReturnType<A>['payload'];
	// export type ActionTypeFromPayloadAction<A> = PayloadAction<PayloadOfAction<A>>
	export type AnyFunction = (...args: any[]) => any;
	export type AnyAsyncFunction = (...args: any[]) => Promise<any>;
	export type CommandResponse = {
		_resp: [
			{
				command: string,
				data: {
					_id: string,
					receipt_id: string,
				},
				transact: string,
				_cqrs: string,
				_id: string,
				_kind: number,
				_vers: number,
			}
		],
		_status: string,
	}
}
export { };