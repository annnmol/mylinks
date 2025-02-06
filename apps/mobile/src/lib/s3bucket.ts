let BASE_URL = process.env.EXPO_PUBLIC_S3BUCKET_PUBLIC_ASSETS_BASE_URL
  ? process.env.EXPO_PUBLIC_S3BUCKET_PUBLIC_ASSETS_BASE_URL
  : "";

BASE_URL = BASE_URL;

function getPublicAssets(path: string) {
  return BASE_URL + path;
}

export default getPublicAssets;
