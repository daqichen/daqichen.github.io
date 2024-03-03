import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--navy-shadow);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(10%) opacity(100%);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "HeadshotNew.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 550, traceSVG: { color: "#64ffda" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'ReactJS',
    'Vite',
    'NextJS',
    'Webpack/Rollup',
    'SCSS/TailwindCss',
    'Java Springboot',
    'Python Flask',
    'Terraform',
    'GraphQL',
    'Unix/Linux',
    'AWS',
    'Git',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi~ I'm Jen, a Software Engineer at{' '}
              <a href="https://www.linkedin.com/in/daqi-jennifer-chen">Goldman Sachs</a> and an{' '}
              <a href="https://www.instagram.com/dacheese_origami">origami artist</a>.
            </p>

            <p>
              I'm passionate about designing websites that foster meaningful user engagement ,
              understanding the moving pieces to make it scalable, from the backend databases, to
              the data pipelines, to DevOps, to choices of frontend frameworks and E2E testing, and
              making an impact or addressing a problem.
            </p>

            <p>
              {/* At UNC, I am currently on the exec board for <a href="https://publichealth360.wixsite.com/ph360">PH360</a> as the Tech Chair 
              and <a href="http://www.dukeunccls.com/">Duke-UNC CLS</a> to plan the upcoming virtual conference. 
               */}
              Prior to my college career, software engineering seemed like a foreign subject to me,
              and if I am being honest, it still feels that way on some days. However, what changed
              is my attitude towards the challenge. Recognizing the ever-changing, ever-growing
              nature of software engineering as what makes it exciting, rewarding. Like a complex
              origami model, it requires hard work, applying knowledge, being resourceful, and a
              humble spirit.
            </p>

            <p>
              With a Pinch of Patience, a Dash of Creativity, a Spoonful of Planning, and a Heap of
              Love, my coding journey continues...
            </p>

            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Img fluid={data.avatar.childImageSharp.fluid} alt="Avatar" className="img" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
