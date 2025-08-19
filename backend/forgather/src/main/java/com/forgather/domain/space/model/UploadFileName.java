package com.forgather.domain.space.model;

public class UploadFileName {

    private final String name;

    public UploadFileName(String name) {
        validate(name);
        this.name = name;
    }

    private void validate(String name) {
        if (name == null) {
            throw new IllegalArgumentException("파일명은 null일 수 없습니다.");
        }

        int extensionIndex = name.lastIndexOf('.');
        if (extensionIndex == -1) {
            throw new IllegalArgumentException("파일명은 확장자를 포함해야 합니다.");
        }

        String baseName = name.substring(0, extensionIndex);
        validateBaseName(baseName);

        String extension = name.substring(extensionIndex).replaceAll("\\.", "");
        FileExtension.validate(extension);
    }

    private void validateBaseName(String baseName) {
        if (baseName.isBlank() || baseName.contains("/")) {
            throw new IllegalArgumentException("확장자를 제외한 파일명은 공백이거나 /를 포함할 수 없습니다.");
        }
    }
}
