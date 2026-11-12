import Button from "./Button";
import Modal from "./Modal";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ title, message, confirmLabel = "Hapus", onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="confirm-text">{message}</p>
      <div className="form-actions">
        <Button autoFocus onClick={onCancel}>Batal</Button>
        <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;