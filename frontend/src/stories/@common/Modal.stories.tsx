import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from '../../components/@common/modal/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Backdrop />
        <Modal.Content>
          <p>Default 크기(Mobile)</p>
        </Modal.Content>
      </Modal>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Backdrop />
        <Modal.Content size="small">
          <p>Small size</p>
        </Modal.Content>
      </Modal>
    );
  },
};

export const Medium: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Backdrop />
        <Modal.Content size="medium">
          <p>Medium size</p>
        </Modal.Content>
      </Modal>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Backdrop />
        <Modal.Content size="large">
          <p>Large size</p>
        </Modal.Content>
      </Modal>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Backdrop />
        <Modal.Content size="mobile" hasTopCloseButton={false}>
          <p>상단 닫기 버튼 없음</p>
        </Modal.Content>
      </Modal>
    );
  },
};

export const NoEscapeClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnEscape={false}
      >
        <Modal.Backdrop />
        <Modal.Content size="mobile">
          <p>esc키로 닫지 못함</p>
        </Modal.Content>
      </Modal>
    );
  },
};

export const NoBackdropClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnEscape={false}
      >
        <Modal.Backdrop closeOnClick={false} />
        <Modal.Content size="mobile">
          <p>바깥부분을 눌러도 못끔</p>
        </Modal.Content>
      </Modal>
    );
  },
};
