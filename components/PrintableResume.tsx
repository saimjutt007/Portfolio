import React from 'react';
import type { PortfolioData } from '../types';

interface PrintableResumeProps {
  data: PortfolioData;
}

export const PrintableResume: React.FC<PrintableResumeProps> = ({ data }) => {

  return (
    <div className="hidden print:block font-sans text-black bg-white p-8">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <p className="text-lg">{data.title}</p>
        <div className="flex justify-center space-x-4 text-sm mt-2">
          <span>{data.email}</span>
          <span>|</span>
          <a href={data.socials.linkedin} className="text-blue-600">{data.socials.linkedin}</a>
          <span>|</span>
          <a href={data.socials.github} className="text-blue-600">{data.socials.github}</a>
        </div>
      </header>
      
      <section className="mb-4">
        <h2 className="text-xl font-bold border-b-2 border-black mb-2 pb-1">Summary</h2>
        <p className="text-sm">{data.about.leads.technical}</p>
        <ul className="list-disc list-inside text-sm mt-2">
            {data.about.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold border-b-2 border-black mb-2 pb-1">Experience</h2>
        {data.experience.map((job, index) => (
          <div key={index} className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold">{job.role} - <span className="font-semibold">{job.company}</span></h3>
                <p className="text-sm font-semibold">{job.duration}</p>
            </div>
            <ul className="list-disc list-inside text-sm mt-1">
                {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold border-b-2 border-black mb-2 pb-1">Skills</h2>
        <p className="text-sm">
            <span className="font-bold">Languages:</span> {data.skills.find(s => s.category === 'Languages')?.skills.map(s => s.name).join(', ')}
        </p>
        <p className="text-sm">
            <span className="font-bold">Engines:</span> {data.skills.find(s => s.category === 'Engines')?.skills.map(s => s.name).join(', ')}
        </p>
        <p className="text-sm">
            <span className="font-bold">Technologies:</span> {data.skills.find(s => s.category === 'Technologies')?.skills.map(s => s.name).join(', ')}
        </p>
         <p className="text-sm">
            <span className="font-bold">Tools & Platforms:</span> {data.skills.find(s => s.category === 'Tools & Platforms')?.skills.map(s => s.name).join(', ')}
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold border-b-2 border-black mb-2 pb-1">Shipped Projects</h2>
        {data.highlightedProjects.map((project, index) => (
          <div key={index} className="mb-3 break-inside-avoid">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-sm mb-1">{project.summary as string}</p>
             {project.links.demo && (
              <p className="text-sm">
                <span className="font-semibold">Store Link:</span> <a href={project.links.demo} className="text-blue-600">{project.links.demo}</a>
              </p>
            )}
          </div>
        ))}
      </section>
      
      {data.personalProjects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-bold border-b-2 border-black mb-2 pb-1">Personal Projects</h2>
          {data.personalProjects.map((project, index) => (
             <div key={index} className="mb-3 break-inside-avoid">
                <h3 className="text-lg font-bold">{project.title}</h3>
                 {Array.isArray(project.summary) ? (
                  <ul className="list-disc list-inside text-sm mb-1">
                    {project.summary.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                ) : (
                  <p className="text-sm mb-1">{project.summary}</p>
                )}
            </div>
          ))}
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold border-b-2 border-black mb-2 pb-1">Education</h2>
        {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
                <p className="text-md font-bold">{edu.institution}</p>
                <div className="flex justify-between">
                    <p className="text-sm">{edu.degree}</p>
                    <p className="text-sm font-semibold">{edu.year}</p>
                </div>
                {edu.details && <p className="text-sm italic">{edu.details}</p>}
            </div>
        ))}
      </section>
    </div>
  );
};