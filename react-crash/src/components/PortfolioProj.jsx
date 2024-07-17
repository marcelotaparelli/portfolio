import React,{ useState } from 'react';
import { useRef } from 'react';
import ProjectsHook from './ProjectsHook';

function PortfolioProj() {

    const refProject = useRef();
    ProjectsHook(refProject);

    const [listScreensPortfolio] = useState([
      {
        name: 'Hooks',
        des: 'Fiz o uso de React Hooks como o useState e useRef para as abas ativas do menu, e dos Redux Hooks useSelector e useDispatch para manipular as ações.',
        image: '/hook.png'
      }
    ])

  return (
    <div className="project 3" ref={refProject}>
        <div className="list-projects">

          <div className="react item">
            <div className="images">
              <div className="circles">
                <div></div>
                <div></div>
                <div></div>
                <span></span>
              </div>
            </div>
            <div className="content">
            <h1>Portfólio</h1>
            <p>Esta página foi feita em React.</p>
            </div>
          </div>

          <div className="react item">
            <div className="images">
              <i className="devicon-redux-original colored"></i>
            </div>
            <div className="content">
            <h1>Redux</h1>
            <p>Tendo em vista que a página possui dois menus dinâmicos, optei por usar Redux para gerenciar os estados desta aplicação.</p>
            </div>
          </div>

          {
            listScreensPortfolio.map((value, key) => (
              <div className="item" key={key}>
                <div className="images hook">
                  <img src={value.image} alt={value.name} />
                </div>
                <div className="content">
                  <h1>{value.name}</h1>
                  <p>{value.des}</p>
                </div>
             </div>
           ))
         }
        </div>

        <div className="tecnologias special">
          <h2>Tecnologias</h2>
          <div className="item">
            <i className="devicon-react-original"></i>
            <p>React</p>
          </div>
          <div className="item">
            <i className="devicon-redux-original"></i>
            <p>Redux</p>
          </div>
          <div className="item">
            <i className="devicon-javascript-plain"></i>
            <p>Javascript</p>
          </div>
          <div className="item">
            <i className="devicon-css3-plain"></i>
            <p>CSS</p>  
          </div>
          <div className="item">
            <i className="devicon-html5-plain"></i>
            <p>HTML</p>
          </div>



          <a href="https://github.com/marcelotaparelli/zullen-fullstack-project" target="_blank">
            <div className="mais">
              <i className="devicon-github-original"></i>
              <p>Repositório</p>
            </div>
          </a>
                
        </div>
      </div>  
  )
}

export default PortfolioProj