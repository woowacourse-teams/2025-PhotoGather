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
import com.forgather.global.logging.Logger;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final SpaceRepository spaceRepository;
    private final AwsS3Cloud awsS3Cloud;
    private final Path downloadTempPath;
    private final Logger logger;

    public PhotoResponse get(String spaceCode, Long photoId) {
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);
        return PhotoResponse.from(photo);
    }

    public PhotosResponse getAll(String spaceCode, Pageable pageable, Long hostId) {
        // TODO: Space가 HostId의 소유인지 검증
        Space space = spaceRepository.getBySpaceCode(spaceCode);
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
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        for (MultipartFile multipartFile : multipartFiles) {
            PhotoMetaData metaData = MetaDataExtractor.extractPhotoMetaData(multipartFile);
            String uploadedPath = upload(spaceCode, multipartFile);
            photoRepository.save(new Photo(space, uploadedPath, metaData));
        }
    }

    private String upload(String spaceCode, MultipartFile multipartFile) {
        try {
            logger.log()
                .event("파일 업로드 시작")
                .spaceCode(spaceCode)
                .value("originalName", multipartFile.getOriginalFilename())
                .info();
            return awsS3Cloud.upload(spaceCode, multipartFile);
        } catch (IOException e) {
            throw new IllegalArgumentException(
                "파일 업로드에 실패했습니다. 파일 이름: " + multipartFile.getOriginalFilename(), e);
        }
    }

    public File compressSelected(String spaceCode, List<Long> photoIds) throws IOException {
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        List<Photo> photos = photoRepository.findAllByIdIn(photoIds);
        photos.forEach(photo -> photo.validateSpace(space));
        return compressPhotoFile(spaceCode, photos);
    }

    /**
     * TODO
     * 파일 삭제 트랜잭션 분리
     * 사진 원본 이름 대신 유의미한 이름 변경 추가 논의
     */
    public File compressAll(String spaceCode, Long hostId) throws IOException {
        // TODO: Space가 HostId의 소유인지 검증
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        List<Photo> photos = photoRepository.findAllBySpace(space);
        return compressPhotoFile(spaceCode, photos);
    }

    private List<String> getPhotoPaths(List<Photo> photos) {
        return photos.stream()
            .map(Photo::getPath)
            .toList();
    }

    private File compressPhotoFile(String spaceCode, List<Photo> photos) throws IOException {
        List<String> photoPaths = getPhotoPaths(photos);
        File spaceContents = awsS3Cloud.downloadSelected(downloadTempPath.toString(), spaceCode, photoPaths);

        File zipFile = ZipGenerator.generate(downloadTempPath, spaceContents, spaceCode);
        FileSystemUtils.deleteRecursively(spaceContents);
        return zipFile;
    }

    @Transactional
    public void delete(String spaceCode, Long photoId) {
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);
        photoRepository.delete(photo);
        awsS3Cloud.deleteContent(photo.getPath());
    }

    /**
     * S3 삭제 이후 실패 시 롤백 고려
     */
    @Transactional
    public void deleteSelected(String spaceCode, List<Long> photoIds) {
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        List<Photo> photos = photoRepository.findAllByIdIn(photoIds);
        photos.forEach(photo -> photo.validateSpace(space));
        List<String> paths = photos.stream()
            .map(Photo::getPath)
            .toList();
        photoRepository.deleteBySpaceAndPhotoIds(space, photoIds);
        awsS3Cloud.deleteSelectedContents(paths);
    }

    /**
     * S3 삭제 이후 실패 시 롤백 고려
     */
    @Transactional
    public void deleteAll(String spaceCode) {
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        photoRepository.deleteBySpace(space);
        awsS3Cloud.deleteAllContents(spaceCode);
    }
}
