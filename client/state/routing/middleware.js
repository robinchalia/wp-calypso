/**
 * External dependencies
 */
import debugFactory from 'debug';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import { savePath } from 'lib/restore-last-path';
import { ROUTE_SET } from 'state/action-types';

const debug = debugFactory( 'calypso:restore-last-location' );
let hasInitialized = false;

export const routingMiddleware = () => {
	return ( next ) => ( action ) => {
		if ( action.type !== ROUTE_SET || ! action.path || ! action.query ) {
			return next( action );
		}

		if ( ! isEmpty( action.query ) ) {
			return next( action );
		}

		const isFirstRun = ! hasInitialized;
		hasInitialized = true;

		if ( isFirstRun || action.path === '/' ) {
			return next( action );
		}

		// Attempt to save the path so it might be restored in the future
		savePath( action.path )
			.then( () => debug( 'saved path: ' + action.path ) )
			.catch( ( reason ) => debug( 'error saving path', reason ) );

		next( action );
	};
};

export default routingMiddleware;
