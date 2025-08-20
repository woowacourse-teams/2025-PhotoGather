export interface Photo {
  id: number;
  path: string;
  originalName: string;
  capturedAt: Date | string | null;
  createdAt: Date | string;
}

export interface PhotoWithContent extends Photo {
  contentType: string;
  spaceId: number;
}

export interface CreatePhotoInput {
  id: number;
  path: string;
  originalName: string;
  capturedAt?: Date | string | null;
}

export interface AllDownloadInfos {
  downloadUrls: {
    url: string;
  }[];
}

export interface SelectedDownloadInfos {
  downloadUrls: {
    originalName: string;
    url: string;
  }[];
}

export interface SingleDownloadInfos {
  downloadUrls: {
    originalName: string;
    url: string;
  };
}
