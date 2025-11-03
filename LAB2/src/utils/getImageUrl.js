// Helper: returns first valid http(s) image URL found on a lesson object
// Hàm trích xuất URL ảnh từ object lesson, hỗ trợ cả link tìm kiếm Bing
export default function getImageUrl(lesson) {
  if (!lesson || typeof lesson !== 'object') return '';
  
  // Danh sách các trường có thể chứa URL ảnh
  const candidates = [
    lesson.lessonImage,
    lesson.image,
    lesson.avatar,
    lesson.thumbnail,
    lesson.url,
    lesson.photo,
  ];
  
  // Duyệt qua các trường để tìm URL hợp lệ
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) {
      const url = c.trim();
      
      // Nếu là link tìm kiếm Bing, trích xuất link ảnh thật từ tham số mediaurl hoặc cdnurl
      if (url.includes('bing.com/images/search')) {
        try {
          const urlObj = new URL(url);
          // Thử lấy mediaurl trước (ưu tiên vì là link ảnh gốc)
          const mediaUrl = urlObj.searchParams.get('mediaurl');
          if (mediaUrl) {
            const decodedUrl = decodeURIComponent(mediaUrl);
            // Chấp nhận mọi URL http/https, không bắt buộc phải có đuôi file
            if (/^https?:\/\/.+/i.test(decodedUrl)) {
              return decodedUrl;
            }
          }
          // Nếu không có mediaurl, thử lấy cdnurl
          const cdnUrl = urlObj.searchParams.get('cdnurl');
          if (cdnUrl) {
            const decodedUrl = decodeURIComponent(cdnUrl);
            if (/^https?:\/\//i.test(decodedUrl)) {
              return decodedUrl;
            }
          }
        } catch (err) {
          console.warn('[getImageUrl] Cannot parse Bing URL:', url, err);
        }
      }
      
      // Nếu là URL ảnh trực tiếp bình thường
      if (/^https?:\/\//i.test(url)) {
        return url;
      }
    }
  }
  
  // Nếu không tìm thấy ảnh hợp lệ
  if (typeof window !== 'undefined' && window.console) {
    console.log('[getImageUrl] No valid image found for lesson:', lesson);
  }
  return '';
}
