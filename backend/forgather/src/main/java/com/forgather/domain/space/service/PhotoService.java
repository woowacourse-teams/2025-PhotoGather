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
import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.PhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.space.util.ZipGenerator;
import com.forgather.global.auth.model.Host;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.UnauthorizedException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PhotoService {

    private final Path downloadTempPath;
    private final PhotoRepository photoRepository;
    private final SpaceRepository spaceRepository;
    private final ContentsStorage contentsStorage;

    public PhotoResponse get(String spaceCode, Long photoId, Host host) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        if (!canAccess(space, host)) {
            throw new UnauthorizedException();
        }
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);
        return PhotoResponse.from(photo);
    }

    public PhotosResponse getAll(String spaceCode, Pageable pageable, Host host) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        if (!canAccess(space, host)) {
            throw new UnauthorizedException();
        }
        Page<Photo> photos = photoRepository.findAllBySpace(space, pageable);
        return PhotosResponse.from(photos);
    }

    public File compressSelected(String spaceCode, DownloadPhotosRequest request, Host host) throws IOException {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        if (!canAccess(space, host)) {
            throw new UnauthorizedException();
        }
        List<Photo> photos = photoRepository.findAllByIdIn(request.photoIds());
        photos.forEach(photo -> photo.validateSpace(space));
        return compressPhotoFile(spaceCode, photos);
    }

    public DownloadPhotoResponse download(String spaceCode, Long photoId, Host host) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        if (!canAccess(space, host)) {
            throw new UnauthorizedException();
        }
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
    public File compressAll(String spaceCode, Host host) throws IOException {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        if (!canAccess(space, host)) {
            throw new UnauthorizedException();
        }
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

    public DownloadUrlsResponse getDownloadUrl(String spaceCode, Long photoId, Host host) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        if (!canAccess(space, host)) {
            throw new UnauthorizedException();
        }
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);
        URL downloadUrl = contentsStorage.issueDownloadUrl(photo.getPath());
        return new DownloadUrlsResponse(List.of(DownloadUrl.from(photo.getOriginalName(), downloadUrl.toString())));
    }

    public DownloadUrlsResponse getSelectedDownloadUrls(String spaceCode, DownloadPhotosRequest request, Host host) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        if (!canAccess(space, host)) {
            throw new UnauthorizedException();
        }
        List<Photo> photos = photoRepository.findAllByIdIn(request.photoIds());
        if (photos.isEmpty()) {
            throw new BaseException("현재 다운로드할 수 있는 사진이 존재하지 않습니다.");
        }
        photos.forEach(photo -> photo.validateSpace(space));
        return getDownloadUrlsResponse(photos);
    }

    public DownloadUrlsResponse getAllDownloadUrls(String spaceCode, Host host) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        if (!canAccess(space, host)) {
            throw new UnauthorizedException();
        }
        List<Photo> photos = photoRepository.findAllBySpace(space);
        if (photos.isEmpty()) {
            throw new BaseException("현재 다운로드할 수 있는 사진이 존재하지 않습니다.");
        }
        photos.forEach(photo -> photo.validateSpace(space));
        return getDownloadUrlsResponse(photos);
    }

    private boolean canAccess(Space space, Host host) {
        if (space.isPublic()) {
            return true;
        }
        if (host != null) {
            space.validateHost(host);
            return true;
        }
        return false;
    }

    private DownloadUrlsResponse getDownloadUrlsResponse(List<Photo> photos) {
        Map<String, String> downloadUrls = new LinkedHashMap<>();
        Map<String, Integer> originalNameCounts = new HashMap<>();

        for (Photo photo : photos) {
            String uniqueFileName = createUniqueFileName(photo, originalNameCounts);
            String downloadUrl = contentsStorage.issueDownloadUrl(photo.getPath()).toString();
            downloadUrls.put(uniqueFileName, downloadUrl);
        }

        return createDownloadUrlsResponse(downloadUrls);
    }

    private String createUniqueFileName(Photo photo, Map<String, Integer> originalNameCounts) {
        String originalName = photo.getOriginalName();
        int extensionStartIndex = originalName.lastIndexOf('.');
        String baseName = originalName.substring(0, extensionStartIndex);
        String extension = originalName.substring(extensionStartIndex + 1);

        String uniqueBaseName = createUniqueBaseName(baseName, originalName, originalNameCounts);
        return String.format("%s.%s", uniqueBaseName, extension);
    }

    private String createUniqueBaseName(String baseName, String originalName, Map<String, Integer> originalNameCounts) {
        if (originalNameCounts.containsKey(originalName)) {
            int count = originalNameCounts.get(originalName);
            originalNameCounts.put(originalName, count + 1);
            return String.format("%s(%d)", baseName, originalNameCounts.get(originalName));
        }
        originalNameCounts.put(originalName, 0);
        return baseName;
    }

    private DownloadUrlsResponse createDownloadUrlsResponse(Map<String, String> downloadUrls) {
        return new DownloadUrlsResponse(downloadUrls.entrySet().stream()
            .map(entry -> DownloadUrl.from(entry.getKey(), entry.getValue()))
            .toList());
    }

    @Transactional
    public void delete(String spaceCode, Long photoId, Host host) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        space.validateHost(host);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);

        // photoRepository.delete(photo);
        space.getContents().remove(photo); // orphanRemoval이 설정되어 있어 자동으로 삭제됨
        contentsStorage.deleteContent(photo.getPath());
    }

    @Transactional
    public void deleteSelected(String spaceCode, DeletePhotosRequest request, Host host) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        space.validateHost(host);
        List<Photo> photos = photoRepository.findAllByIdIn(request.photoIds());
        photos.forEach(photo -> photo.validateSpace(space));
        List<String> paths = photos.stream()
            .map(Photo::getPath)
            .toList();

        // photoRepository.deleteAll(photos);
        space.getContents().removeAll(photos); // // orphanRemoval이 설정되어 있어 자동으로 삭제됨
        contentsStorage.deleteContents(paths);
    }
}
