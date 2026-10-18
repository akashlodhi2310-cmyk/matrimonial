/**
 * Image path resolver for Vite development and production builds.
 * Ensures images resolve correctly from the /public/images folder.
 */
export function resolveImageUrl(url: string | undefined): string {
  if (!url) {
    return '/images/profile_ananya_portrait_1792322191115.jpg';
  }

  // Map legacy /src/assets/images/ paths to standard /images/ public root
  if (url.startsWith('/src/assets/images/')) {
    return url.replace('/src/assets/images/', '/images/');
  }

  return url;
}

export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (target.src.includes('/src/assets/images/')) {
    target.src = target.src.replace('/src/assets/images/', '/images/');
  } else if (!target.src.includes('profile_ananya')) {
    target.src = '/images/profile_ananya_portrait_1792322191115.jpg';
  }
}
