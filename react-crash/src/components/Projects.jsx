import React,{ useState } from 'react';
import { useRef } from 'react';
import CustomHook from './CustomHook';
import { changeProjectActive } from '../redux/action';
import { connect, useDispatch } from 'react-redux';

import ZullenProj from './ZullenProj';
import AtendimentoProj from './AtendimentoProj';
import PortfolioProj from './PortfolioProj';

const Projects = ({activeProject}) => {
  const [listProjects] = useState(['1', '2', '3'])
  const dispatch = useDispatch();
  const changeProject = (value) => {
      dispatch(changeProjectActive(value)); 
  }; 



  const refTab = useRef();
  CustomHook(refTab);

  return (
    <section className="projetos" ref={refTab}>
      <div className="menu">
        {
          listProjects.map((value, key) => (
              <div key={key} 
                   onClick={() => changeProject(value)} 
                  className={activeProject === value ? 'active menu-item' : 'menu-item'}
              ><h1>{value}</h1></div>
           ))
        }
      </div>
      <ZullenProj />
        <AtendimentoProj />
        <PortfolioProj />
    </section>
  )
}

const mapStateToProps = (state) => ({
  activeProject: state.activeProject
})

export default connect(mapStateToProps, {changeProjectActive})(Projects)	