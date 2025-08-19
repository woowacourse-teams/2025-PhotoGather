package com.forgather.domain.space.service;

import static com.forgather.domain.space.dto.DownloadUrlsResponse.DownloadUrl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Path;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.DeletePhotosRequest;
import com.forgather.domain.space.dto.DownloadPhotoResponse;
import com.forgather.domain.space.dto.DownloadPhotosRequest;
import com.forgather.domain.space.dto.DownloadUrlsResponse;
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
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
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

    public PhotosResponse getAll(String spaceCode, Pageable pageable, Long hostId) {
        // TODO: Space가 HostId의 소유인지 검증
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
            log.atDebug()
                .addKeyValue("spaceCode", spaceCode)
                .addKeyValue("originalName", multipartFile.getOriginalFilename())
                .log("파일 업로드 시작");
            return awsS3Cloud.upload(spaceCode, multipartFile);
        } catch (IOException e) {
            throw new IllegalArgumentException(
                "파일 업로드에 실패했습니다. 파일 이름: " + multipartFile.getOriginalFilename(), e);
        }
    }

    public File compressSelected(String spaceCode, DownloadPhotosRequest request) throws IOException {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        List<Photo> photos = photoRepository.findAllByIdIn(request.photoIds());
        photos.forEach(photo -> photo.validateSpace(space));
        return compressPhotoFile(spaceCode, photos);
    }

    public DownloadPhotoResponse download(String spaceCode, Long photoId, Long hostId) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);

        String photoPath = photo.getPath();
        String extension = StringUtils.getFilenameExtension(photoPath);
        String name = String.format("%s-%d.%s", spaceCode, photo.getId(), extension);
        InputStream photoFile = awsS3Cloud.download(photoPath);
        return new DownloadPhotoResponse(extension, name, photoFile);
    }

    /**
     * TODO
     * 파일 삭제 트랜잭션 분리
     * 사진 원본 이름 대신 유의미한 이름 변경 추가 논의
     */
    public File compressAll(String spaceCode, Long hostId) throws IOException {
        // TODO: Space가 HostId의 소유인지 검증
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
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

    public DownloadUrlsResponse getDownloadUrl(String spaceCode, Long photoId, Long hostId) {
        // TODO: Space가 HostId의 소유인지 검증
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);

        URL downloadUrl = awsS3Cloud.issueDownloadUrl(photo.getPath());
        return new DownloadUrlsResponse(List.of(DownloadUrl.from(
            // photo.getOriginalName(),
            downloadUrl)
        ));
    }

    public DownloadUrlsResponse getSelectedDownloadUrls(String spaceCode, DownloadPhotosRequest request, Long hostId) {
        // TODO: Space가 HostId의 소유인지 검증
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        List<Photo> photos = photoRepository.findAllByIdIn(request.photoIds());
        photos.forEach(photo -> photo.validateSpace(space));

        // TODO: 사진 원본 이름 key로
        // Map<String, URL> downloadUrls = photos.stream()
        //     .collect(Collectors.toMap(
        //         photo -> photo.getOriginalName(),
        //         photo -> awsS3Cloud.issueDownloadUrl(photo.getPath())
        //     ));
        List<URL> downloadUrls = photos.stream()
            .map(photo -> awsS3Cloud.issueDownloadUrl(photo.getPath()))
            .toList();
        return new DownloadUrlsResponse(downloadUrls.stream()
            .map(DownloadUrl::from)
            .toList());
    }

    @Transactional
    public void delete(String spaceCode, Long photoId) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);

        photoRepository.delete(photo);
        awsS3Cloud.deleteContent(photo.getPath());
    }

    @Transactional
    public void deleteSelected(String spaceCode, DeletePhotosRequest request) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        List<Photo> photos = photoRepository.findAllByIdIn(request.photoIds());
        photos.forEach(photo -> photo.validateSpace(space));
        List<String> paths = photos.stream()
            .map(Photo::getPath)
            .toList();

        photoRepository.deleteAll(photos);
        awsS3Cloud.deleteSelectedContents(paths);
    }
}
