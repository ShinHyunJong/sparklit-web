import Compressor from 'compressorjs';
import { heicTo, isHeic } from 'heic-to';

type CompressionResult = {
  url: string;
  compressedResult: File | Blob;
};
export const calculateRatio = (width: number, height: number) => {
  const ratio = width / height;
  if (ratio < 0.8) {
    return 0.8;
  }
  if (ratio >= 0.8 && ratio < 1.91) {
    return ratio;
  }
  return 1.91;
};

export const compressImage = (
  file: File | Blob,
  quality: number,
): Promise<CompressionResult> => {
  return new Promise<CompressionResult>(async (resolve, reject) => {
    // async/await 사용을 위해 async 추가
    try {
      let imageToCompress: File | Blob = file;
      const isHeicFile = await isHeic(file as File);
      // 파일이 HEIC/HEIF 타입인지 확인하고 변환합니다.
      if (isHeicFile) {
        console.log('HEIC 파일 감지: JPEG로 변환을 시도합니다.');
        try {
          // heic2any를 사용하여 Blob을 JPEG Blob으로 변환
          // toType과 quality는 heic2any의 옵션입니다.
          imageToCompress = await heicTo({
            blob: file,
            type: 'image/jpeg',
            quality: 0.5,
          });

          console.log('HEIC 파일이 성공적으로 JPEG로 변환되었습니다.');
        } catch (heicError) {
          console.error('HEIC 파일 변환 중 오류 발생:', heicError);
          reject(
            new Error(
              `HEIC 파일 변환 실패: ${heicError instanceof Error ? heicError.message : String(heicError)}`,
            ),
          );
          return; // 오류 발생 시 함수 종료
        }
      }

      // 변환되었거나 원래 JPEG/PNG였던 이미지를 Compressor.js로 압축합니다.
      new Compressor(imageToCompress, {
        quality,
        mimeType: 'image/jpeg', // 최종적으로 JPEG로 압축
        width: 1024, // 너비 제한 (선택 사항)

        success: (compressedResult) => {
          const url = URL.createObjectURL(compressedResult);
          console.log('이미지 압축 성공:', compressedResult);
          resolve({
            url,
            compressedResult,
            // compress: compress, // Compressor 인스턴스는 보통 resolve 결과에 포함하지 않습니다.
          });
        },
        error: (compressorError) => {
          console.error('이미지 압축 중 오류 발생:', compressorError);
          reject(new Error(`이미지 압축 실패: ${compressorError.message}`));
        },
      });
    } catch (error) {
      // 일반적인 try-catch 블록 내의 예외 처리
      console.error('이미지 처리 중 예상치 못한 오류 발생:', error);
      reject(error);
    }
  });
};

export const getImageData = (
  url: string,
): Promise<{ width: number; height: number; ratio: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
      });
    };
  });
};

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => {
      reject(error);
    });
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
): Promise<File | Blob | null> {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation,
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        if (!file) resolve(null);
        resolve(file);
      }, 'image/jpeg');
    });
  } catch (error) {
    return null;
  }
}

export const calculateRatioCropCoordinates = (
  originalWidth: number,
  originalHeight: number,
) => {
  // 정의된 비율 제한 로직
  const calculateRatio = (width: number, height: number): number => {
    const ratio = width / height;
    if (ratio < 0.8) {
      return 0.8;
    }
    if (ratio >= 0.8 && ratio < 1.91) {
      return ratio;
    }
    return 1.91;
  };

  const targetRatio = calculateRatio(originalWidth, originalHeight); // R
  let cropX = 0;
  let cropY = 0;
  let cropWidth = originalWidth; // 원본 크롭 영역의 가로 길이
  let cropHeight = originalHeight; // 원본 크롭 영역의 세로 길이

  // 1. 원본 크롭 영역의 크기 (cropWidth, cropHeight) 및 좌표 (cropX, cropY) 계산

  // 원본 이미지의 비율이 목표 비율(R)보다 크면 (원본이 더 가로로 길면)
  if (originalWidth / originalHeight > targetRatio) {
    cropHeight = originalHeight;
    // 크롭할 가로 길이를 (원본 세로 * 목표 비율)로 계산하여 줄입니다.
    cropWidth = Math.floor(originalHeight * targetRatio);

    // 남는 가로 여백을 중앙 정렬을 위해 x 좌표에 적용
    cropX = Math.floor((originalWidth - cropWidth) / 2);
    cropY = 0;
  }
  // 원본 이미지의 비율이 목표 비율(R)보다 작거나 같으면 (원본이 더 세로로 길거나 같으면)
  else {
    cropWidth = originalWidth;
    // 크롭할 세로 길이를 (원본 가로 / 목표 비율)로 계산하여 줄입니다.
    cropHeight = Math.floor(originalWidth / targetRatio);

    // 남는 세로 여백을 중앙 정렬을 위해 y 좌표에 적용
    cropY = Math.floor((originalHeight - cropHeight) / 2);
    cropX = 0;
  }

  // ----------------------------------------------------
  // 2. 썸네일 좌표 (thumbX, thumbY) 및 크기 (thumbWidth, thumbHeight) 계산

  // 요청하신 '썸네일 크기'는 원본 크롭 영역의 크기와 동일하게 설정합니다.
  const thumbWidth = cropWidth;
  const thumbHeight = cropHeight;

  // 썸네일 좌표 (thumbX, thumbY)는 **정사각형 1:1 비율**을 기준으로 계산
  // 이 값은 크롭된 이미지가 1:1 썸네일 컨테이너에 object-fit: cover로 배치될 때의 오프셋을 나타냅니다.

  const ratio = cropWidth / cropHeight;
  let thumbX = 0;
  let thumbY = 0;

  if (ratio > 1) {
    // 크롭된 이미지가 가로로 더 김. 1:1 컨테이너에 cover 시 가로축이 잘림.
    // 오프셋은 가로축에 적용 (음수 값으로 밀리는 정도 표현)
    thumbX = Math.floor(((1 - ratio) / 2) * 100);
    thumbY = 0;
  } else {
    // 크롭된 이미지가 세로로 더 길거나 정사각형임. 1:1 컨테이너에 cover 시 세로축이 잘림.
    // 오프셋은 세로축에 적용 (음수 값으로 밀리는 정도 표현)
    thumbX = 0;
    thumbY = Math.floor(((1 - 1 / ratio) / 2) * 100);
  }

  // ----------------------------------------------------

  // 최종 크롭 영역 정보 반환
  return {
    // 원본 크롭 영역 (서버 크롭 시 사용)
    x: cropX,
    y: cropY,
    width: cropWidth,
    height: cropHeight,

    // 썸네일 영역 (뷰어 배치 및 오프셋 계산에 사용)
    thumbX: thumbX,
    thumbY: thumbY,
    thumbWidth: thumbWidth,
    thumbHeight: thumbHeight,
  };
};
