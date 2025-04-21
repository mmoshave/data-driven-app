/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'encrypted-tbn0.gstatic.com',
      'hips.hearstapps.com',
      'images.unsplash.com',
      'file.kelleybluebookimages.com',
      'gmauthority.com',
      "cars.usnews.com",
      "global.toyota",
      'wieck-mbusa-production.s3.amazonaws.com',
      'assets.newatlas.com',
      'www.vdm.ford.com' // ✅ Add this line
    ],
  },
};

module.exports = nextConfig;
