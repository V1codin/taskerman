// ? for correct hover styling of svgs
import './index.css';

type InfoProps = {};

const Info: React.FC<InfoProps> = () => {
  return (
    <section className="cv-info">
      <h2 className="info-heading">About me</h2>
      <p>
        Dedicated and passionate to small pieces and details frontender who is
        currently looking for an interesting job where I could apply my skills
        for interesting challenges and find new ways for self-improvement.
      </p>
      <p>
        Also had have been working in sales where I acquire skills such like
        managing time and problem solving in emergency.
      </p>
      <p>
        Currently develop my own project{' '}
        <a
          target="_blank"
          href="https://github.com/V1codin/taskerman"
          className="text-bright-blue hover:underline"
        >
          TaskerMan
        </a>{' '}
        in which i&apos;m trying to improve my skills in NextJS, OOP and best
        practice such as SOLID. Also migrated from MongoDB to PostgresSQL to
        check what kind of problems I would encounter by doing that.
      </p>
      <p>
        Also spend my free time helping my friends with their projects/writing
        userscripts
      </p>
      <p>
        Also painting my{' '}
        <a
          target="_blank"
          href="https://marketplace.visualstudio.com/items?itemName=KirOrlovskyi.pacific-ocean"
          className="text-bright-blue hover:underline"
          title="Pacific Ocean"
        >
          VS CODE theme
        </a>
      </p>
      <h2 className="mt-4 info-heading">Experience</h2>
      <p>
        <span className="text-yellow">
          EPAM inner projects (EPAM People/EPAM Telescope. etc):{' '}
        </span>
        Dnipro 2021-2022
      </p>
      <h2 className="mt-4 info-heading">Education</h2>
      <p>
        <span className="text-yellow">School: </span>Dnipro №59 1998 - 2009
      </p>
      <p>
        <span className="text-yellow">University: </span>Oles Honchar Dnipro
        National University (Bachelor&apos;s degree in Avionics, 2009-2013)
      </p>
      <p>
        <span className="text-yellow">Courses: </span>EPAM Front-end 2020-2021
      </p>
    </section>
  );
};

export { Info };
