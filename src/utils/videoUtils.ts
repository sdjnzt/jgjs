/**
 * 获取公共资源路径
 * @param path 相对于public文件夹的路径
 * @returns 完整的资源路径
 */
export const getPublicPath = (path: string): string => {
  return `${process.env.PUBLIC_URL || ''}${path}`;
};

/**
 * 获取监控视频路径
 * @param filename 文件名（如：1.mp4）
 * @returns 完整的监控视频路径
 */
export const getMonitorVideoPath = (filename: string): string => {
  return getPublicPath(`/images/jiankong/${filename}`);
};

/**
 * 获取默认监控视频路径
 * @returns 默认监控视频路径
 */
export const getDefaultMonitorVideo = (): string => {
  return getMonitorVideoPath('1.mp4');
};

/**
 * 获取测试视频路径
 * @param filename 文件名（如：1.mp4, 2.mp4）
 * @returns 完整的测试视频路径
 */
export const getTestVideoPath = (filename: string): string => {
  return getPublicPath(`/${filename}`);
};

/**
 * 验证视频文件是否存在（前端简单验证）
 * @param videoPath 视频路径
 * @returns Promise<boolean>
 */
export const checkVideoExists = async (videoPath: string): Promise<boolean> => {
  try {
    const response = await fetch(videoPath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}; 