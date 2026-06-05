import ImageKit from "@imagekit/nodejs";

let client;

export const getImageKit = () => {
  if (!client) {
    if (!process.env.IMAGEKIT_PRIVATE_KEY) {
      throw new Error("PRIVATE KEY missing in env");
    }

    client = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
  }

  return client;
};
