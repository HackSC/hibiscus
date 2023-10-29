export const getYoutubeThumbnail = (videoUrl: string): string | null => {
  const regex =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  const videoId = videoUrl.match(regex)?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
};
