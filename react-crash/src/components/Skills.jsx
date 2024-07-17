import React, { useState } from 'react'
import CustomHook from './CustomHook';
import { useRef } from 'react';

const Skills = () => {
  const [listStack] = useState([
    {
      name: 'C#',
      icon: 'devicon-csharp-line',
      position: 13
    },
    {
      name: 'HTML',
      icon: 'devicon-html5-plain',
      position: 1
    },
    {
      name: 'CSS',
      icon: 'devicon-css3-plain',
      position: 2
    },
    {
      name: 'Javascript',
      icon: 'devicon-javascript-plain',
      position: 3
    },
    {
      name: 'Typescript',
      icon: 'devicon-typescript-plain',
      position: 4
    },
    {
      name: 'SQL Server',
      icon: 'devicon-microsoftsqlserver-plain',
      position: 5
    },
    {
      name: 'Docker',
      icon: 'devicon-docker-plain',
      position: 6
    },
    {
      name: 'GitHub',
      icon: 'devicon-github-original',
      position: 7
    },
    {
      name: 'Git',
      icon: 'devicon-git-plain',
      position: 8
    },
    {
      name: 'React',
      icon: 'devicon-react-original',
      position: 9
    },
    {
      name: 'Blazor',
      icon: 'devicon-blazor-original',
      position: 10
    },
    {
      name: 'Angular',
      icon: 'devicon-angularjs-plain',
      position: 11
    },
    {
      name: '.NET',
      icon: 'devicon-dotnetcore-plain',
      position: 12
    }
  ]);
  
  const refTab = useRef();
  CustomHook(refTab);
  return (
    <section className="stack" ref={refTab}>
      <div className="banner">
        <div className="slider" style={{"--quantity": 13}}>
        {
          listStack.slice().reverse().map((value, key) => (
            <div className="item" key={key} style={{"--position": value.position}}>
              <i className={value.icon}></i>
            </div>
          ))
        }
        </div>
        <h1>STACK</h1>
      </div>
      <div className="text">
        <h2>FrontEnd</h2>
        <p>React</p>
        <p>Angular</p>
        <p>Blazor</p>

        <h2>BackEnd</h2>
        <p>.NET</p>
        <p>C#</p>
        <p>SQL Server</p>

        <h2>DevOps</h2>
        <p>Git</p>
        <p>Github</p>
        <p>Gitlab</p>
        <p>Docker</p>
      </div>
    </section>
  )
}

export default Skills