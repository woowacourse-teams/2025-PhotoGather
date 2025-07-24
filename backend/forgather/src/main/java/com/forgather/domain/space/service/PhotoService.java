package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    private static final long ROOT_DIRECTORY_DEPTH = 1L;

    private final PhotoRepository photoRepository;
    private final SpaceRepository spaceRepository;
    private final AwsS3Cloud awsS3Cloud;
    private final Path downloadTempPath;

    public PhotoResponse get(String spaceCode, Long photoId) {
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);
        return PhotoResponse.from(photo);
    }

    public PhotosResponse getAll(String spaceCode, Pageable pageable) {
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
            photoRepository.save(new Photo(space, uploadedPath, multipartFile.getOriginalFilename(), metaData));
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
     */
    public File compressAll(String spaceCode) throws IOException {
        Space space = spaceRepository.getBySpaceCode(spaceCode);

        File spaceContents = awsS3Cloud.downloadAll(space.getSpaceCode());
        renameOriginalFile(space, spaceContents);

        File zipFile = ZipGenerator.generate(downloadTempPath, spaceContents, spaceCode);
        FileSystemUtils.deleteRecursively(spaceContents);
        return zipFile;
    }

    private void renameOriginalFile(Space space, File originalFile) {
        Map<String, String> originalNames = getOriginalFileNames(space);
        Map<String, Integer> originalNamesCount = new HashMap<>();
        try (Stream<Path> paths = Files.walk(originalFile.toPath()).skip(ROOT_DIRECTORY_DEPTH)) {
            paths.forEach(path -> {
                String originalName = originalNames.get(path.getFileName().toString());
                originalNamesCount.put(originalName, originalNamesCount.getOrDefault(originalName, 0) + 1);
                renameFile(path, originalName, originalNamesCount.get(originalName));
            });
        } catch (IOException e) {
            throw new IllegalStateException("파일 이름 변경에 실패했습니다. 파일 이름: " + originalFile.getName(), e);
        }
    }

    private Map<String, String> getOriginalFileNames(Space space) {
        return photoRepository.findAllBySpace(space)
            .stream()
            .collect(Collectors.toMap(photo -> Paths.get(photo.getPath()).getFileName().toString(),
                Photo::getOriginalName));
    }

    private void renameFile(Path targetPath, String originalName, int count) {
        String downloadedName = generateDownloadedName(originalName, count);
        Path newPath = targetPath.resolveSibling(downloadedName).normalize();
        try {
            Files.move(targetPath, newPath, StandardCopyOption.ATOMIC_MOVE);
        } catch (IOException e) {
            throw new IllegalStateException(String.format("파일 이동 실패: %s -> %s", targetPath, newPath), e);
        }
    }

    private String generateDownloadedName(String originalName, int count) {
        String downloadedName = originalName;
        if (count != 1) {
            String[] downloadedNameTokens = originalName.split("\\.");
            downloadedName =
                downloadedNameTokens[0] + "(" + count + ")." + downloadedNameTokens[downloadedNameTokens.length - 1];
        }
        return downloadedName;
    }
}
