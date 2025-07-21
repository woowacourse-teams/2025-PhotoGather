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

    private static LocalDateTime extractCapturedAt(MultipartFile file) {
        Metadata metadata = extractMetaData(file);
        ExifSubIFDDirectory directory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
        if (directory == null) {
            throw new IllegalArgumentException("ExifSubIFDDirectory 를 메타데이터에서 찾을 수 없습니다.");
        }
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
        Date date = directory.getDateOriginal();
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }

}
