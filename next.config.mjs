/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "qnaect-aws-s3-arimanjikian.s3.us-east-2.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "img.daisyui.com",
            }
        ]
    }
};

export default nextConfig;
