/**
 * API Types
 *
 * Types for API requests and responses.
 **/

// Response Helper Type - All API responses follow this same format

export type ApiResponse<T> = {
	status: number;
	message: string;
	data: T;
};
