package com.forgather.domain.upload.domain;

import java.util.stream.Collectors;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.domain.upload.event.DeletePhotoEvent;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class DeletionFailLog extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "info", nullable = false, columnDefinition = "TEXT")
    private String info;

    public DeletionFailLog(DeletePhotoEvent event) {
        this.info = event.getPhotos()
                .stream()
                .map(photo -> "%s, id:%d, path:%s".formatted(
                    photo.getClass().getSimpleName(),
                    photo.getId(),
                    photo.getPath()))
                .collect(Collectors.joining("\n"));
    }
}
