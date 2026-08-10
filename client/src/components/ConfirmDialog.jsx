import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * <ConfirmDialog
 *   open={showModal}
 *   title="Delete this article?"
 *   body="This can't be undone."
 *   confirmLabel="Yes, delete it"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowModal(false)}
 * />
 */
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  body,
  confirmLabel = "Yes, I'm sure",
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  danger = true,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm px-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl bg-parchment-2 p-6 shadow-2xl"
          >
            <h3 className="font-display text-xl text-ink">{title}</h3>
            {body && <p className="mt-2 text-sm text-ink/70">{body}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="rounded-md px-4 py-2 text-sm font-medium text-ink/70 hover:bg-ink/5"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`rounded-md px-4 py-2 text-sm font-medium text-parchment-2 ${
                  danger ? 'bg-clay hover:bg-clay/90' : 'bg-ink hover:bg-ink-2'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
