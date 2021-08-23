export interface Action {
	type: string;
	payload?: unknown;
	error?: boolean;
}
