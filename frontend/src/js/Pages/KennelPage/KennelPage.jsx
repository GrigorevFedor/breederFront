import React from 'react'
import KennelInfo from '../../Components/KennelInfo/KennelInfo';
import Header from '../../Containers/Header/Header';
import { useSelector } from 'react-redux';

function KennelPage( props ) {
    const isLogged = useSelector(state => state.login.isLogged); 
    const {match} = props;    
    const id = match.params.id;
    
    return (
        <div>
            <Header isAuth={ isLogged } isMain={ false } />
            <main className="container">
                <KennelInfo 
                    isLogged={isLogged} 
                    id={id}
                /> 
            </main>
        </div>
    )
}

export default KennelPage
