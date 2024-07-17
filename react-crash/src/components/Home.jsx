/*import React from 'react'*/
import React, { useEffect } from 'react';
import { useRef } from 'react';
import CustomHook from './CustomHook';

const Home = () => {
  useEffect(() => {
    let btns = document.querySelectorAll("a");
    btns.forEach((btn) => {
      btn.onmousemove = (e) => {
        let x = e.pageX - btn.offsetLeft;
        let y = e.pageY - btn.offsetTop;
        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
      };
    });
  }, []); 

  const refTab = useRef();
  CustomHook(refTab);
  return (
    <section className="home" ref={refTab}>

      <div className="content">

        <div className="name">
          Olá, sou o <span>MARCELO</span> TAPARELLI!
        </div>

        <div className="des">
          <p>Trabalho como <span>Auxiliar de Desenvolvimento,</span> </p>
          <p>sou estudante de <span>Análise e Desenvolvimento de Sistemas</span></p>
          <p>e também estudo desenvolvimento <span>Full Stack com .NET e C# </span>!</p>
        </div>

        <a className="cv" href="/cv_marcelotaparelli.pdf" target='blank' rel='noopener
        noreferrer'><span>Baixe o meu CV</span></a>

        <div className="hub">
          <a href="https://www.linkedin.com/in/marcelo-taparelli/" target="_blank">
           <i className="devicon-linkedin-plain"></i>
         </a>
         <a href="https://github.com/marcelotaparelli" target="_blank">
            <i className="devicon-github-original"></i>
         </a>
         <a href="mailto:mvtaparelli@gmail.com" className="href">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
             <path d="M 48 64 Q 28 65 14 78 L 14 78 L 14 78 Q 1 92 0 112 Q 1 136 19 150 L 237 314 L 237 314 Q 256 326 275 314 L 493 150 L 493 150 Q 511 136 512 112 Q 511 92 498 78 Q 484 65 464 64 L 48 64 L 48 64 Z M 0 176 L 0 384 L 0 176 L 0 384 Q 1 411 19 429 Q 37 447 64 448 L 448 448 L 448 448 Q 475 447 493 429 Q 511 411 512 384 L 512 176 L 512 176 L 294 339 L 294 339 Q 277 352 256 352 Q 235 352 218 339 L 0 176 L 0 176 Z" />
          </svg>
         </a>
        </div>


      </div>
      <div className="avatar">
        <div className="card">
          <img src="/avatar.png" alt="" />
        </div>
      </div>

    </section>
  )
}

export default Home