export async function shareContent(data: {
  title: string;
  text: string;
  url: string;
}) {
  // Check if running on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      if (error.name === "AbortError") return false;
      console.error("Error sharing:", error);
    }
  }

  // Fallback for iOS
  if (isIOS) {
    const shareUrl = `sms:&body=${encodeURIComponent(`${data.title}\n${data.text}\n${data.url}`)})`;
    window.open(shareUrl);
    return true;
  }

  // Fallback for other platforms
  return false;
}
