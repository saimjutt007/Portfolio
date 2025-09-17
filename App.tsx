import React, { useState } from 'react';
import { portfolioData } from './data/portfolioData';
import { ProjectCard } from './components/ProjectCard';
import { PersonalProjectCard } from './components/PersonalProjectCard';
import { GitHubIcon, LinkedInIcon } from './components/IconComponents';
import { PrintableResume } from './components/PrintableResume';

type ProjectTab = 'Highlighted' | 'Personal' | 'All';

function App() {
  const [activeTab, setActiveTab] = useState<ProjectTab>('Highlighted');

  const data = portfolioData;
  
  const projectsToDisplay = () => {
    switch (activeTab) {
      case 'Highlighted':
        return data.highlightedProjects;
      case 'Personal':
        return data.personalProjects;
      case 'All':
        return [...data.highlightedProjects, ...data.personalProjects];
      default:
        return [];
    }
  };

  const TabButton: React.FC<{ tabName: ProjectTab, currentTab: ProjectTab, setTab: (tab: ProjectTab) => void, children: React.ReactNode }> = ({ tabName, currentTab, setTab, children }) => (
    <button 
      onClick={() => setTab(tabName)} 
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${currentTab === tabName ? 'bg-accent text-background shadow-lg' : 'text-secondary-text hover:text-primary-text hover:bg-card/50'}`}
      aria-pressed={currentTab === tabName}
    >
      {children}
    </button>
  );

  return (
    <>
      <div className="bg-background text-primary-text font-sans leading-relaxed selection:bg-accent selection:text-background print:hidden gradient-background">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-card-glass/50 border-b border-border transition-colors">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
            <div>
              <h1 className="text-xl font-bold font-heading text-primary-text">{data.name}</h1>
              <p className="text-md text-accent font-semibold">{data.title}</p>
            </div>
            <div className="flex space-x-4">
              <a href={data.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-secondary-text hover:text-accent transition-colors"><GitHubIcon className="w-6 h-6" /></a>
              <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-secondary-text hover:text-accent transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </header>

        <main className="max-w-screen-xl mx-auto p-4 md:p-8 lg:p-12 space-y-24">
          
          {/* Hero/Tagline */}
          <section className="text-center pt-16 pb-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">{data.hero.taglines.narrative}</h1>
            <p className="text-xl md:text-2xl text-secondary-text max-w-3xl mx-auto">{data.hero.taglines.technical}</p>
          </section>

          {/* About Section */}
          <section className="bg-card-glass backdrop-blur-xl border border-border rounded-2xl p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-3xl font-bold font-heading text-primary-text mb-8 text-center md:text-left">About Me</h2>
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-3 space-y-4 text-secondary-text text-base leading-relaxed">
                <p>{data.about.leads.narrative}</p>
                <p>{data.about.leads.technical}</p>
                <p className="bg-card/80 border border-border p-4 rounded-lg italic mt-4">{data.workStyle}</p>
              </div>
              <div className="md:col-span-2 bg-card/80 border border-border p-6 rounded-xl">
                 <h3 className="text-lg font-semibold text-primary-text mb-3">Key Strengths</h3>
                 <ul className="space-y-3">
                    {data.about.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start">
                           <svg className="w-5 h-5 text-accent flex-shrink-0 mr-3 mt-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                           </svg>
                           <span className="text-secondary-text text-sm">{bullet}</span>
                        </li>
                    ))}
                 </ul>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
              <h2 className="text-3xl font-bold font-heading text-primary-text mb-4 md:mb-0">Projects</h2>
              <div className="flex space-x-1 border border-border rounded-lg p-1 bg-card-glass backdrop-blur-lg" role="tablist" aria-label="Project Categories">
                <TabButton tabName="Highlighted" currentTab={activeTab} setTab={setActiveTab}>Highlighted</TabButton>
                <TabButton tabName="Personal" currentTab={activeTab} setTab={setActiveTab}>Personal</TabButton>
                <TabButton tabName="All" currentTab={activeTab} setTab={setActiveTab}>All Projects</TabButton>
              </div>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {projectsToDisplay().map((project) => (
                project.image
                  ? <ProjectCard key={project.title} project={project} />
                  : <PersonalProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h2 className="text-3xl font-bold font-heading text-primary-text mb-8">Professional Experience</h2>
            <div className="space-y-8 relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border/50"></div>

              {data.experience.map((job, index) => (
                <div key={index} className="pl-12 relative">
                  <div className="absolute left-4 top-4 -translate-x-1/2 w-3 h-3 bg-accent rounded-full"></div>
                  <div className="bg-card-glass backdrop-blur-xl border border-border p-6 rounded-2xl">
                    <div className="flex flex-col md:flex-row justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold font-heading text-primary-text">{job.role}</h3>
                        <p className="text-md font-semibold text-accent">{job.company}</p>
                      </div>
                      <span className="text-sm text-secondary-text font-mono flex-shrink-0 ml-0 mt-2 md:mt-0 md:ml-4">{job.duration}</span>
                    </div>
                    <ul className="space-y-2 mt-4">
                      {job.responsibilities.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-4 h-4 text-accent flex-shrink-0 mr-3 mt-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                          <span className="text-secondary-text text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Education Section */}
          <section className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div className="bg-card-glass backdrop-blur-xl border border-border rounded-2xl p-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <h2 className="text-3xl font-bold font-heading text-primary-text mb-6">Skills</h2>
              <div className="space-y-6">
                {data.skills.map(category => (
                  <div key={category.category}>
                    <h3 className="text-lg font-semibold text-primary-text mb-3">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skill => (
                        <span key={skill.name} className="bg-card/80 border border-border text-secondary-text text-sm font-medium px-3 py-1 rounded-md">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card-glass backdrop-blur-xl border border-border rounded-2xl p-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <h2 className="text-3xl font-bold font-heading text-primary-text mb-6">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.degree} className="bg-card/80 border border-border p-4 rounded-lg">
                    <p className="font-bold text-primary-text">{edu.degree}</p>
                    <p className="text-secondary-text text-sm">{edu.institution} - <span className="font-semibold">{edu.year}</span></p>
                    {edu.details && <p className="text-xs text-secondary-text italic mt-1">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Footer */}
          <footer className="text-center py-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="bg-card-glass backdrop-blur-xl border border-border rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold font-heading text-primary-text mb-2">Contact Me</h2>
              <p className="text-secondary-text mb-6 max-w-md mx-auto">{data.contact.availability}</p>
              <a href={`mailto:${data.email}`} className="inline-block bg-accent text-background font-bold py-3 px-8 rounded-lg hover:bg-accent-hover hover:scale-105 shadow-xl transition-all duration-300">
                Contact Me
              </a>
            </div>
          </footer>
        </main>

      </div>
      <PrintableResume data={data} />
    </>
  );
}

export default App;