/**
 * Helper function which triggers a callback on a keydown event, only
 * if the key pressed is space or enter - to mirror button functionality.
 *
 * @param {Function} callback A callback function
 * @return {Function} the callback to fire on a keydown event
 */
export default function( callback ) {
	return ( event ) => {
		if ( event.key === 'Enter' || event.key === ' ' ) {
			event.preventDefault();
			callback( event );
		} else if ( event.key === 'ArrowDown' ) {
			if ( event.target.nextSibling ) {
				event.preventDefault();
				event.target.nextSibling.focus();
			}
		} else if ( event.key === 'ArrowUp' ) {
			if ( event.target.nextSibling ) {
				event.preventDefault();
				event.target.previousSibling.focus();
			}
		}
	};
}