/**
 * External dependencies
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Gridicon from 'gridicons';
import { localize } from 'i18n-calypso';
/**
 * Internal dependencies
 */
import { cartItems } from 'lib/cart-values';
import PrivacyProtectionDialog from './privacy-protection-dialog';
import Card from 'components/card';

class PrivacyProtection extends Component {
	handleDialogSelect = ( options, event ) => {
		event.preventDefault();
		this.props.onDialogSelect( Object.assign( options, this.state ) );
		this.setState( { skipFinish: false } );
	}

	handleDialogOpen = () => {
		this.setState( { skipFinish: true } );
		this.props.onDialogOpen();
	}

	handleDialogClose = () => {
		this.props.onDialogClose();
	}

	hasDomainPartOfPlan = () => {
		const cart = this.props.cart;
		return cart.has_bundle_credit || cartItems.hasPlan( cart );
	}

	getPrivacyProtectionCost() {
		const products = this.props.productsList.get();
		return products.private_whois.cost_display;
	}

	render() {
		const domainRegistrations = cartItems.getDomainRegistrations( this.props.cart ),
			{ translate } = this.props,
			numberOfDomainRegistrations = domainRegistrations.length,
			firstDomainToRegister = domainRegistrations[ 0 ],
			hasOneFreePrivacy = this.hasDomainPartOfPlan() && numberOfDomainRegistrations === 1,
			privacyText = translate(
				'Privacy Protection hides your personal information in your domain\'s public records, ' +
				'to protect your identity and prevent spam.'
			),
			freeWithPlan = hasOneFreePrivacy &&
						<span className="checkout__privacy-protection-free-text">
							{ translate( 'Free with your plan' ) }
						</span>;

		return (
			<div>
				<Card className="checkout__privacy-protection-checkbox">
					<input
						type="checkbox"
						id="privacyProtectionCheckbox"
						onChange={ this.props.onCheckboxChange }
						checked={ this.props.isChecked } />
					<div className="checkout__privacy-protection-checkbox-description">
						<label htmlFor="privacyProtectionCheckbox">
							<strong className="checkout__privacy-protection-checkbox-heading">
								{ translate( 'Please keep my information private.', { textOnly: true } ) }
							</strong>
						</label>
						<p className={ 'checkout__privacy-protection-price-text' }>
							<span className={ classnames( { 'free-with-plan': hasOneFreePrivacy } ) }>
								{
									translate(
										'%(cost)s per year',
										'%(cost)s per domain per year',
										{
											args: { cost: this.getPrivacyProtectionCost() },
											count: numberOfDomainRegistrations
										}
									)
								}
							</span>
							{ freeWithPlan }
						</p>
						<p className="checkout__privacy-protection-checkbox-text">{ privacyText }</p>
						<a href="" onClick={ this.handleDialogOpen }>{ translate( 'Learn more about Privacy Protection.' ) }</a>
					</div>
					<div>
						<Gridicon icon="lock" size={ 48 } />
					</div>
				</Card>
				<PrivacyProtectionDialog
					disabled={ this.props.disabled }
					domain={ firstDomainToRegister.meta }
					registrar={ firstDomainToRegister.extra && firstDomainToRegister.extra.registrar }
					cost={ this.getPrivacyProtectionCost() }
					countriesList={ this.props.countriesList }
					fields={ this.props.fields }
					isVisible={ this.props.isDialogVisible }
					isFree={ hasOneFreePrivacy }
					onSelect={ this.handleDialogSelect }
					onClose={ this.handleDialogClose } />
			</div>
		);
	}
}

export default localize( PrivacyProtection );
