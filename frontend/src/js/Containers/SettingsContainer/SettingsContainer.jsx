import React from 'react';
import AdsSettings from '../../Components/AdsSettings/AdsSettings';
import KennelSettings from '../../Components/KennelSettings/KennelSettings';
import ProfileSettings from '../../Components/ProfileSettings/ProfileSettings';


function SettingsContainer({ block, user, getUser, broods }) {
    return (
        <>
            { (block === 'profile')
                ? <ProfileSettings user={ user } getUser={ getUser } />
                : (block === 'kennel')
                    ? <KennelSettings user={ user } getUser={ getUser } />
                    : <AdsSettings user={ user } getUser={ getUser } broods={broods}  isKennel={ true } />
            }
        </>
    )
}

export default SettingsContainer
