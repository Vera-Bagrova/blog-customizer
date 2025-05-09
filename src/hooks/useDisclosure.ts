import { useEffect, useState } from 'react';

export type DisclosureCallbacks = {
	onOpen?: () => void;
	onClose?: () => void;
};

export const useDisclosure = (
	// initialState: boolean = false,
	initialState = false,
	callbacks: DisclosureCallbacks = {}
) => {
	const [isFormOpen, setIsOpen] = useState(initialState);

	useEffect(() => {
		setIsOpen(initialState);
	}, [initialState]);

	const open = () => {
		setIsOpen(true);
		callbacks.onOpen?.();
	};

	const close = () => {
		setIsOpen(false);
		callbacks.onClose?.();
	};

	const toogle = () => {
		isFormOpen ? close() : open();
	};

	return { isFormOpen, toogle };
};
