import React from 'react';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap/';

import { LANGUAGES } from '../../common/constants';

import './navigation.css';


export const Navigation = () => {

	const { t } = useTranslation();

	const links = [
		{ href: '/', title: t('navigation.home') },
		{ href: '/movies', title: t('navigation.movies') },
		{ href: '/about', title: t('navigation.about') }
	]

	const location = useLocation();

	return (
		<Navbar bg='light' expand='sm'>
			<Nav variant='pills' className='w-100' >
				{links.map((link, i) => {
					return (
						<Nav.Item key={i}>
							<Nav.Link href={link.href} className={link.href === location.pathname ? 'active' : ''}>
								{link.title}
							</Nav.Link>
						</Nav.Item>)
				})}

				<NavDropdown title='Languages' id='nav-dropdown' className='ms-auto'>
					{ Object.keys(LANGUAGES)
							.map(lng => <NavDropdown.Item 
														key={lng} 
														onClick={() => { i18n.changeLanguage(LANGUAGES[lng].key) }}
														style={{fontWeight: i18n.resolvedLanguage === LANGUAGES[lng].key ? 700 : 300}}
													>
														{LANGUAGES[lng].nativeName}
													</NavDropdown.Item>
							)}
				</NavDropdown>
			</Nav>
		</Navbar>
	);
};

export default Navigation;
