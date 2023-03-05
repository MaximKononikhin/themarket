import { ApiError } from "@shared/api";

export const apiErrorMock: ApiError = new ApiError(
    { method: "GET", url: "" },
    { url: "", ok: false, status: 400, statusText: "400", body: {} },
    "Error"
);
