import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ProjectsHook = (refProject = null) => {
  const thisProject = refProject;
  const activeProject = useSelector(state => state.activeProject);
  const projectsMenu = document.getElementsByClassName('menu')[0];

  useEffect(() => {
    if (thisProject.current && thisProject.current.classList.contains(activeProject)) {
      thisProject.current.style.display = 'grid';
      projectsMenu.classList.add('active-menu');

      if (window.innerWidth > 600) {

        projectsMenu.style.display = 'unset';
        projectsMenu.style.height = '57%';
        projectsMenu.style.position = 'absolute';
        projectsMenu.style.top = 'calc(50% - 276px)';
        projectsMenu.style.left = '13%';
        projectsMenu.style.transition = 'left 2s linear';
      }
      else if (window.innerWidth < 600) {
        projectsMenu.style.margin = '15% 0 0 0';
      }
        
    } else {
        thisProject.current.style.display = 'none';}
  }, [activeProject])
}

export default ProjectsHook