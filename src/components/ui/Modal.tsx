import React from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    title,
    children,
    footer,
}) => {
    return (
        <Transition show={open}>
            <Dialog onClose={onClose} className="relative z-50">
                <TransitionChild
                    enter="ease-out duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-backdrop"
                        aria-hidden="true"
                    />
                </TransitionChild>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <TransitionChild
                        enter="ease-out duration-150"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="flex max-h-[500px] w-full min-w-[300px] max-w-[350px] flex-col rounded-2xl bg-elevation-3 text-on-surface shadow-xl">
                            <DialogTitle className="px-6 pt-6 pb-2 text-xl font-medium">
                                {title}
                            </DialogTitle>
                            <div className="flex-1 overflow-y-auto px-6">
                                {children}
                            </div>
                            {footer && (
                                <div className="flex gap-2 p-4">{footer}</div>
                            )}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
