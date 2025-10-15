package com.forgather.domain.upload.event;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationEvent;

import com.forgather.domain.model.Photo;

import lombok.Getter;

@Getter
public class DeletePhotoEvent extends ApplicationEvent {

    private List<Photo> photos;

    public DeletePhotoEvent(Object source, List<? extends Photo> photos) {
        super(source);
        this.photos = new ArrayList<>(photos);
    }

    public DeletePhotoEvent(Object source, Photo photo) {
        super(source);
        this.photos = List.of(photo);
    }
}
