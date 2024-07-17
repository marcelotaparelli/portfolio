import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { changeTabActive } from '../redux/action';
const NavBar = ({activeTab}) => {
    const [listNav] = useState(['Home', 'Stack', 'Projetos'])
    const dispatch = useDispatch();
    const changeTab = (value) => {
        dispatch(changeTabActive(value)); 
    };
    return (
    <header>
        <div className="logo" onClick={() => changeTab('Home')}>
            <img src='../public/mt.png' alt='logo' />
        </div>
        <nav> 
            {
                listNav.map((value, key) => (
                    <span key={key} 
                        onClick={() => changeTab(value)} 
                        className={activeTab === value ? 'active' : ''}
                    >{value}</span>
                ))
            }
        </nav>
    </header>
  )
}

const mapStateToProps = (state) => ({
    activeTab: state.activeTab
})

export default connect(mapStateToProps, {changeTabActive})(NavBar)	