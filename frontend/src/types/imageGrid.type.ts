export interface SpaceManagerImageElementHandlers {
  /** 사진을 눌렀을 때 실행할 함수 */
  onImageClick: (id: number) => void;
}

export interface GuestImageElementHandlers {
  /** 사진을 눌렀을 때 실행할 함수 */
  onImageClick: (id: number) => void;
  /** 사진 삭제 버튼 클릭 시 실행할 함수 */
  onDeleteClick: (id: number) => void;
}
