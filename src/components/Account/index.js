import React, { useState } from 'react';

import UpdatePassword from './UpdatePassword';
import Banner from '../shared/Banner';
import ActionButton from '../shared/ActionButton';

const Account = () => {
	const [showUpdatePasswordModal, setshowUpdatePasswordModal] = useState(false);
	const [bannerText, setBannerText] = useState(null);

	return (
		<>
			<ActionButton onClick={() => setshowUpdatePasswordModal(true)}>Update Password</ActionButton>
			{showUpdatePasswordModal && (
				<UpdatePassword
					onClose={() => setshowUpdatePasswordModal(false)}
					onSuccess={() => {
						setBannerText('Your password has been updated');
					}}
				/>
			)}
			{bannerText !== null && <Banner onClose={() => setBannerText(null)}>{bannerText}</Banner>}
		</>
	);
};

Account.propTypes = {};

export default Account;
