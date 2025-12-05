package com.forgather.fixture;

import static com.forgather.fixture.SpaceFixture.createSpace;

import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.model.SpacePhoto;

public class SpacePhotoFixture {

    public static SpacePhoto createSpacePhoto() {
        return createSpacePhotoWithSpace(createSpace());
    }

    public static SpacePhoto createEmptySpacePhoto() {
        return createEmptySpacePhotoWithSpace(createSpace());
    }

    public static SpacePhoto createSpacePhotoWithSpace(Space space) {
        return new SpacePhoto(space, "originalName", "path", 1024L);
    }

    public static SpacePhoto createEmptySpacePhotoWithSpace(Space space) {
        return SpacePhoto.empty(space);
    }
}
