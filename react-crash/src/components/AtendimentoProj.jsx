import React,{ useState } from 'react';
import { useRef } from 'react';
import ProjectsHook from './ProjectsHook';

const AtendimentoProj = () => {
    const [listScreensLP] = useState([
        {
          name: 'Atendimento',
          des: 'Percebendo uma necessidade de padronização de entrada de dados na empresa, implementamos uma página de atendimento para coletar as demandas e pedidos dos clientes de forma organizada, automatizando a criação de uma issue no Gitlab.',
          image: '/lp.jpg'
        },
        {
          name: 'Opções',
          des: 'Esse projeto aumentou a agilidade no atendimento às solicitações dos clientes e também o acesso às informações da solicitação por parte dos desenvolvedores. A página conta com 3 opções de solicitação.',
          image: '/options.jpg'
        },
        {
          name: 'Formulário',
          des: 'Através de um formulário, buscamos coletar todas as informações necessárias para a implementação da demanda no ato da solicitação.',
          image: '/form.jpg'
        }
      ])

      const refProject = useRef();
      ProjectsHook(refProject);
      
  return (
    <div className="project 2" ref={refProject}>
       <div className="list-projects">
          {
            listScreensLP.map((value, key) => (
              <div className="item" key={key}>
                <div className="images">
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

        <div className="tecnologias">
          <h2>Tecnologias</h2>
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
          <div className="item">
            <i className="devicon-gitlab-plain"></i>
            <p>Gitlab</p>
          </div>
          <div className="item">
            <i className="devicon-wordpress-plain"></i>
            <p>Wordpress</p>
          </div>

          <a href="https://atendimento.evag.me/" target="_blank">
            <div className="mais">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
              <path d="M 128 496 L 384 496 L 128 496 L 384 496 Q 404 495 418 482 Q 431 468 432 448 L 432 139 L 432 139 Q 432 119 418 105 L 343 30 L 343 30 Q 329 16 310 16 L 128 16 L 128 16 Q 108 17 94 30 Q 81 44 80 64 L 80 448 L 80 448 Q 81 468 94 482 Q 108 495 128 496 L 128 496 Z M 384 512 L 128 512 L 384 512 L 128 512 Q 101 511 83 493 Q 65 475 64 448 L 64 64 L 64 64 Q 65 37 83 19 Q 101 1 128 0 L 310 0 L 310 0 Q 336 0 355 19 L 429 93 L 429 93 Q 448 112 448 139 L 448 448 L 448 448 Q 447 475 429 493 Q 411 511 384 512 L 384 512 Z" />
            </svg>
              <p>Página</p>
            </div>
          </a>

          <a href="https://evag.me/" target="_blank">
            <div className="mais">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
              <path d="M 332.7003891050584 428.32684824902725 Q 297.8365758754864 494.07003891050584 256.99610894941634 494.07003891050584 Q 245.04280155642024 494.07003891050584 232.09338521400778 487.0972762645914 L 232.09338521400778 489.08949416342415 L 232.09338521400778 489.08949416342415 Q 228.10894941634243 500.0466926070039 220.1400778210117 507.0194552529183 Q 238.07003891050584 510.0077821011673 256.99610894941634 510.0077821011673 Q 328.715953307393 509.011673151751 385.4941634241245 475.14396887159535 Q 443.2684824902724 441.2762645914397 477.136186770428 383.50194552529183 Q 511.00389105058366 325.72762645914395 512 255.00389105058366 Q 511.00389105058366 183.284046692607 477.136186770428 126.50583657587549 Q 443.2684824902724 68.73151750972762 385.4941634241245 34.86381322957198 Q 328.715953307393 0.9961089494163424 256.99610894941634 0 Q 185.27626459143968 0.9961089494163424 128.49805447470817 34.86381322957198 Q 70.72373540856032 68.73151750972762 36.856031128404666 126.50583657587549 Q 2.9883268482490273 183.284046692607 1.9922178988326849 255.00389105058366 Q 1.9922178988326849 273.92996108949416 4.980544747081712 291.8599221789883 Q 10.957198443579767 284.88715953307394 18.926070038910506 281.8988326848249 Q 17.929961089494164 268.94941634241246 17.929961089494164 255.00389105058366 Q 17.929961089494164 213.1673151750973 31.875486381322958 175.31517509727627 L 135.47081712062257 175.31517509727627 L 135.47081712062257 175.31517509727627 Q 129.4941634241245 211.17509727626458 129.4941634241245 250.02334630350194 L 145.431906614786 245.04280155642024 L 145.431906614786 245.04280155642024 Q 146.42801556420233 208.18677042801556 152.4046692607004 175.31517509727627 L 361.5875486381323 175.31517509727627 L 361.5875486381323 175.31517509727627 Q 368.5603112840467 213.1673151750973 368.5603112840467 255.00389105058366 Q 368.5603112840467 296.84046692607006 361.5875486381323 334.69260700389106 L 275.92217898832683 334.69260700389106 L 275.92217898832683 334.69260700389106 L 270.94163424124514 350.63035019455253 L 270.94163424124514 350.63035019455253 L 358.59922178988325 350.63035019455253 L 358.59922178988325 350.63035019455253 Q 349.6342412451362 395.45525291828795 332.7003891050584 428.32684824902725 L 332.7003891050584 428.32684824902725 Z M 181.29182879377433 81.68093385214007 Q 216.1556420233463 15.937743190661479 256.99610894941634 15.937743190661479 Q 297.8365758754864 15.937743190661479 332.7003891050584 81.68093385214007 Q 349.6342412451362 114.55252918287938 358.59922178988325 159.3774319066148 L 155.3929961089494 159.3774319066148 L 155.3929961089494 159.3774319066148 Q 164.3579766536965 114.55252918287938 181.29182879377433 81.68093385214007 L 181.29182879377433 81.68093385214007 Z M 384.49805447470817 255.00389105058366 Q 384.49805447470817 213.1673151750973 378.52140077821014 175.31517509727627 L 482.1167315175097 175.31517509727627 L 482.1167315175097 175.31517509727627 Q 496.0622568093385 213.1673151750973 496.0622568093385 255.00389105058366 Q 496.0622568093385 296.84046692607006 482.1167315175097 334.69260700389106 L 378.52140077821014 334.69260700389106 L 378.52140077821014 334.69260700389106 Q 384.49805447470817 296.84046692607006 384.49805447470817 255.00389105058366 L 384.49805447470817 255.00389105058366 Z M 375.53307392996106 159.3774319066148 Q 355.6108949416342 64.74708171206225 308.79377431906613 21.914396887159533 Q 365.5719844357977 34.86381322957198 409.40077821011675 70.72373540856032 Q 453.2295719844358 106.58365758754864 476.1400778210117 159.3774319066148 L 375.53307392996106 159.3774319066148 L 375.53307392996106 159.3774319066148 Z M 37.85214007782101 159.3774319066148 Q 60.762645914396884 106.58365758754864 104.59143968871595 70.72373540856032 L 104.59143968871595 70.72373540856032 L 104.59143968871595 70.72373540856032 Q 148.42023346303503 34.86381322957198 206.1945525291829 21.914396887159533 Q 158.38132295719845 64.74708171206225 138.4591439688716 159.3774319066148 L 37.85214007782101 159.3774319066148 L 37.85214007782101 159.3774319066148 Z M 375.53307392996106 350.63035019455253 L 476.1400778210117 350.63035019455253 L 375.53307392996106 350.63035019455253 L 476.1400778210117 350.63035019455253 Q 453.2295719844358 403.42412451361866 409.40077821011675 439.284046692607 Q 365.5719844357977 475.14396887159535 307.7976653696498 489.08949416342415 Q 355.6108949416342 446.2568093385214 375.53307392996106 350.63035019455253 L 375.53307392996106 350.63035019455253 Z M 264.9649805447471 256.99610894941634 Q 265.96108949416345 253.01167315175098 262.9727626459144 249.0272373540856 Q 258.988326848249 246.03891050583658 255.00389105058366 247.03501945525292 L 31.875486381322958 310.7859922178988 L 31.875486381322958 310.7859922178988 Q 25.898832684824903 312.77821011673154 25.898832684824903 318.7548638132296 Q 25.898832684824903 324.7315175097276 31.875486381322958 326.7237354085603 L 139.45525291828793 360.591439688716 L 139.45525291828793 360.591439688716 L 3.9844357976653697 496.0622568093385 L 3.9844357976653697 496.0622568093385 Q 0 502.03891050583655 3.9844357976653697 508.01556420233464 Q 9.961089494163424 512 15.937743190661479 508.01556420233464 L 151.40856031128405 372.54474708171205 L 151.40856031128405 372.54474708171205 L 185.27626459143968 480.12451361867704 L 185.27626459143968 480.12451361867704 Q 187.26848249027236 486.1011673151751 193.24513618677042 486.1011673151751 Q 199.22178988326849 486.1011673151751 201.21400778210116 480.12451361867704 L 264.9649805447471 256.99610894941634 L 264.9649805447471 256.99610894941634 Z M 61.75875486381323 318.7548638132296 L 245.04280155642024 266.9571984435798 L 61.75875486381323 318.7548638132296 L 245.04280155642024 266.9571984435798 L 193.24513618677042 450.24124513618676 L 193.24513618677042 450.24124513618676 L 162.3657587548638 354.6147859922179 L 162.3657587548638 354.6147859922179 Q 161.36964980544747 351.6264591439689 157.3852140077821 349.6342412451362 L 61.75875486381323 318.7548638132296 L 61.75875486381323 318.7548638132296 Z" />
            </svg>
              <p>Sobre a empresa</p>
            </div>
         </a>
                
        </div>
      </div>  
  )
}

export default AtendimentoProj