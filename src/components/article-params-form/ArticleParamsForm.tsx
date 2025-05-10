import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useDisclosure } from 'src/hooks/useDisclosure';
import { FormEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type articleParamsProps = {
	articleParams: ArticleStateType;
	setArticleParams: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleParams,
	setArticleParams,
}: articleParamsProps) => {
	const { isFormOpen, toogle, close } = useDisclosure(false);
	const [params, setParams] = useState(articleParams);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	// Обработчик клика вне сайдбара
	useOutsideClickClose({
		isOpen: isFormOpen,
		onClose: close,
		rootRef: sidebarRef,
	});

	// Применяем стили к статье
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleParams(params);
	};

	// Сбрасываем настройки до дефолтных и применяем к статье
	const handleReset = () => {
		setArticleParams(defaultArticleState);
		setParams(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toogle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={params.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(newValue) =>
							setParams({ ...params, fontFamilyOption: newValue })
						}
						title='шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={params.fontSizeOption}
						onChange={(newValue) =>
							setParams({ ...params, fontSizeOption: newValue })
						}
						title='размер шрифта'
					/>
					<Select
						selected={params.fontColor}
						options={fontColors}
						onChange={(newValue) =>
							setParams({ ...params, fontColor: newValue })
						}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={params.backgroundColor}
						options={backgroundColors}
						onChange={(newValue) =>
							setParams({ ...params, backgroundColor: newValue })
						}
						title='цвет фона'
					/>
					<Select
						selected={params.contentWidth}
						options={contentWidthArr}
						onChange={(newValue) =>
							setParams({ ...params, contentWidth: newValue })
						}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
