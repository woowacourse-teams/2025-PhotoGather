package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.PhotoResponse;
import com.forgather.domain.space.dto.PhotosResponse;
import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.PhotoMetaData;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.PhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.space.util.MetaDataExtractor;
import com.forgather.domain.space.util.ZipGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final SpaceRepository spaceRepository;
    private final AwsS3Cloud awsS3Cloud;
    private final Path downloadTempPath;

    public PhotoResponse get(String spaceCode, Long photoId) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);
        return PhotoResponse.from(photo);
    }

    public PhotosResponse getAll(String spaceCode, Pageable pageable) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        Page<Photo> photos = photoRepository.findAllBySpace(space, pageable);
        return PhotosResponse.from(photos);
    }

    /**
     * TODO
     * S3 업로드 이후 실패 시 롤백 고려
     * (MVP아님)
     */
    @Transactional
    public void saveAll(String spaceCode, List<MultipartFile> multipartFiles) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        for (MultipartFile multipartFile : multipartFiles) {
            PhotoMetaData metaData = MetaDataExtractor.extractPhotoMetaData(multipartFile);
            String uploadedPath = upload(spaceCode, multipartFile);
            photoRepository.save(new Photo(space, uploadedPath, metaData));
        }
    }

    private String upload(String spaceCode, MultipartFile multipartFile) {
        try {
            return awsS3Cloud.upload(spaceCode, multipartFile);
        } catch (IOException e) {
            throw new IllegalArgumentException(
                "파일 업로드에 실패했습니다. 파일 이름: " + multipartFile.getOriginalFilename(), e);
        }
    }

    /**
     * TODO
     * 파일 삭제 트랜잭션 분리
     * 사진 원본 이름 대신 유의미한 이름 변경 추가 논의
     */
    public File compressAll(String spaceCode) throws IOException {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);

        File spaceContents = awsS3Cloud.downloadAll(downloadTempPath.toString(), space.getCode());

        File zipFile = ZipGenerator.generate(downloadTempPath, spaceContents, spaceCode);
        FileSystemUtils.deleteRecursively(spaceContents);
        return zipFile;
    }
}
