import React from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap/';

import './homePage.css';


export const HomePage = () => {

	const { t } = useTranslation();

	return <Row>
		<article className='content-wrapper'>
			{<header className='content-title'>
				<h1 className='text-center mb-3'>Manage Movies</h1>
				<p className='description-text' >
					<Trans i18nKey='home.description' >
						This is a little study project on React made by <a className='description-link' href='https://github.com/Irina-N'>{{ name: t('myName') }}</a> during Frontend-developer course of Klaipeda University.
					</Trans>
				</p>
			</header>}
			<section className='content-block p-0'>
				<img src='/img/movie.gif' alt='movie' />
			</section>
			<footer className='text-center'>{new Date().getFullYear()}</footer>
		</article>
	</Row>

};

export default HomePage;
