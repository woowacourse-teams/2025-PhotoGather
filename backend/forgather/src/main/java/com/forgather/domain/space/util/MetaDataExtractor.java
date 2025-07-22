package com.forgather.domain.space.util;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.forgather.domain.space.model.PhotoMetaData;

public class MetaDataExtractor {

    public static PhotoMetaData extractPhotoMetaData(MultipartFile file) {
        return new PhotoMetaData(extractCapturedAt(file));
    }

    /**
     * 사진 메타데이터 표준 포맷은 EXIF(Exchangeable Image File Format) 다.
     * ExifSubIFDDirectory 는 EXIF 메타데이터의 서브 디렉토리로, 사진의 촬영 날짜와 시간 정보를 포함한다.
     */
    private static LocalDateTime extractCapturedAt(MultipartFile file) {
        Metadata metadata = extractMetaData(file);
        ExifSubIFDDirectory directory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
        return extractLocalDateTime(directory);
    }

    private static Metadata extractMetaData(MultipartFile file) {
        try {
            return ImageMetadataReader.readMetadata(file.getInputStream());
        } catch (ImageProcessingException | IOException e) {
            throw new IllegalArgumentException(
                "파일에서 메타데이터를 추출하는 데 실패했습니다. 파일 이름: " + file.getOriginalFilename(), e);
        }
    }

    private static LocalDateTime extractLocalDateTime(ExifSubIFDDirectory directory) {
        if (directory == null || !directory.containsTag(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL)) {
            return null;
        }

        Date date = directory.getDateOriginal();
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }
}
