/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import config from 'config';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import LabelSettings from 'woocommerce/woocommerce-services/views/label-settings';
import Packages from 'woocommerce/woocommerce-services/views/packages';
import ShippingHeader from './shipping-header';
import ShippingOrigin from './shipping-origin';
import ShippingZoneList from './shipping-zone-list';

const Shipping = ( { className } ) => {
	const wcsEnabled = config.isEnabled( 'woocommerce/wcs-enabled' );

	return (
		<Main className={ classNames( 'shipping', className ) }>
			<ShippingHeader />
			<ShippingOrigin />
			<ShippingZoneList />
			{ wcsEnabled && <LabelSettings /> }
			{ wcsEnabled && <Packages /> }
		</Main>
	);
};

Shipping.propTypes = {
	className: PropTypes.string
};

export default Shipping;
