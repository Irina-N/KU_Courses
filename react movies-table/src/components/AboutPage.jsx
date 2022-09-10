import React from 'react';

import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';

export const HomePage = () => {

	const { t } = useTranslation();

	return <Row>
		<article className='content-wrapper'>
			<header className='content-title'>
				<h2 className='text-center'>{t('about.title')}</h2>
			</header>
			<section className='content-block'>
				<p>{t('about.text.p1')}</p>
				<p>{t('about.text.p2')}</p>
				<p>{t('about.text.p3')}</p>
				<p>{t('about.text.p4')}</p>
			</section>
			<footer className='text-center'>{new Date().getFullYear()}</footer>
		</article>
	</Row>
};

export default HomePage;
