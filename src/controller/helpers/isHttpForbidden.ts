import { NoAccess } from "@Errors/NoAccess";

export const isHttpForbidden = (error: Error): boolean => {
    return (error instanceof NoAccess);
}