import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';

import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

import {} from '@fortawesome/free-solid-svg-icons';

export default function initializeFontAwesome() {
	FontAwesomeLibrary.add([farBell]);
}
