import React, { ReactNode } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  buttons?: ReactNode;
  size?: "sm" | "md" | "lg";
  title?: string;
  handleSubmit?: (e: any) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children, buttons, size, title, handleSubmit }) => {
  const getWidthClass = (size?: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return "w-[500px]";
      case "md":
        return "w-[750px]";
      case "lg":
        return "w-[1000px]";
      default:
        return "";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`bg-black  rounded-3xl border-2 border-soft-black overflow-hidden shadow-custom-darker transform transition-all ${getWidthClass(size)} modal-content`}
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center modal-overlay "
      closeTimeoutMS={300}
      id="modal"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          {title && <h1 className="mb-10 text-3xl font-semibold">{title}</h1>}

          {children}
        </div>
        {buttons && <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-x-3 flex">{buttons}</div>}
      </form>
    </Modal>
  );
};

export default CustomModal;
