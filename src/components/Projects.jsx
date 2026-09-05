import { projectsData } from '../assets/assets.js'

function Projects() {
  return (
    <section id="projects" className="projects">
      <h2>Our best projects</h2>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} />
            <div className="project-info">
              <div>
                <p>{project.location}</p>
                <h3>{project.title}</h3>
              </div>
              <span className="price">{project.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
