export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/",
        "/applications/:path*",
        "/search/:path*",
        "/settings/:path*",
        "/analytics/:path*",
    ]
};
