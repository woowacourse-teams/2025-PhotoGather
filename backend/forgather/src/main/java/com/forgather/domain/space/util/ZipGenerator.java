package com.forgather.domain.space.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import net.lingala.zip4j.ZipFile;

public class ZipGenerator {

    private ZipGenerator() {
    }

    public static File generate(File originalFile, String fileName) throws IOException {
        Path zipPath = Files.createTempFile(fileName + "-", ".zip");
        try (ZipFile zipFile = new ZipFile(zipPath.toFile())) {
            zipFile.addFolder(originalFile);
        }
        return zipPath.toFile();
    }
}
