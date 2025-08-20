package com.forgather.domain.space.service;

import static com.forgather.domain.space.dto.DownloadUrlsResponse.DownloadUrl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;

import com.forgather.domain.space.dto.DeletePhotosRequest;
import com.forgather.domain.space.dto.DownloadPhotoResponse;
import com.forgather.domain.space.dto.DownloadPhotosRequest;
import com.forgather.domain.space.dto.DownloadUrlsResponse;
import com.forgather.domain.space.dto.PhotoResponse;
import com.forgather.domain.space.dto.PhotosResponse;
import com.forgather.domain.space.dto.SaveUploadedPhotoRequest;
import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.PhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.space.util.ZipGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final SpaceRepository spaceRepository;
    private final ContentsStorage contentsStorage;
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

    @Transactional
    public void saveUploadedPhotos(String spaceCode, SaveUploadedPhotoRequest request) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        List<Photo> photos = request.uploadedPhotos().stream()
            .map(uploadedPhoto -> uploadedPhoto.toEntity(space, contentsStorage.getRootDirectory()))
            .toList();
        photoRepository.saveAll(photos);
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
        InputStream photoFile = contentsStorage.download(photoPath);
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
        File spaceContents = contentsStorage.downloadSelected(downloadTempPath.toString(), spaceCode, photoPaths);

        File zipFile = ZipGenerator.generate(downloadTempPath, spaceContents, spaceCode);
        FileSystemUtils.deleteRecursively(spaceContents);
        return zipFile;
    }

    public DownloadUrlsResponse getDownloadUrl(String spaceCode, Long photoId, Long hostId) {
        // TODO: Space가 HostId의 소유인지 검증
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);

        URL downloadUrl = contentsStorage.issueDownloadUrl(photo.getPath());
        return new DownloadUrlsResponse(List.of(DownloadUrl.from(photo.getOriginalName(), downloadUrl.toString())));
    }

    public DownloadUrlsResponse getSelectedDownloadUrls(String spaceCode, DownloadPhotosRequest request, Long hostId) {
        // TODO: Space가 HostId의 소유인지 검증
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        List<Photo> photos = photoRepository.findAllByIdIn(request.photoIds());
        if (photos.isEmpty()) {
            throw new IllegalStateException("현재 다운로드할 수 있는 사진이 존재하지 않습니다.");
        }
        photos.forEach(photo -> photo.validateSpace(space));

        return getDownloadUrlsResponse(photos);
    }

    public DownloadUrlsResponse getAllDownloadUrls(String spaceCode, Long hostId) {
        // TODO: Space가 HostId의 소유인지 검증
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        List<Photo> photos = photoRepository.findAllBySpace(space);
        if (photos.isEmpty()) {
            throw new IllegalStateException("현재 다운로드할 수 있는 사진이 존재하지 않습니다.");
        }
        photos.forEach(photo -> photo.validateSpace(space));

        return getDownloadUrlsResponse(photos);
    }

    private DownloadUrlsResponse getDownloadUrlsResponse(List<Photo> photos) {
        Map<String, String> downloadUrls = new LinkedHashMap<>();
        Map<String, Integer> originalNameCounts = new HashMap<>();
        for (Photo photo : photos) {
            String originalName = photo.getOriginalName();
            int extensionStartIndex = originalName.lastIndexOf('.');
            String baseName = originalName.substring(0, extensionStartIndex);
            String extension = originalName.substring(extensionStartIndex + 1);
            if (originalNameCounts.containsKey(originalName)) {
                int count = originalNameCounts.get(originalName);
                originalNameCounts.put(originalName, count + 1);
                baseName = String.format("%s(%d)", baseName, originalNameCounts.get(originalName));
            } else {
                originalNameCounts.put(originalName, 0);
            }
            String downloadUrl = contentsStorage.issueDownloadUrl(photo.getPath()).toString();
            downloadUrls.put(String.format("%s.%s", baseName, extension), downloadUrl);
        }

        return new DownloadUrlsResponse(downloadUrls.entrySet().stream()
            .map(entry -> DownloadUrl.from(entry.getKey(), entry.getValue()))
            .toList());
    }

    @Transactional
    public void delete(String spaceCode, Long photoId) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);

        photoRepository.delete(photo);
        contentsStorage.deleteContent(photo.getPath());
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
        contentsStorage.deleteSelectedContents(paths);
    }
}
