import React from 'react';
import type { Project } from '../types';
import { LinkIcon, VideoIcon } from './IconComponents';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-card-glass backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:border-border/30 hover:-translate-y-1 group flex flex-col h-full animate-fade-in-up">
      <div className="flex flex-row items-start p-6 gap-6 h-full">
        <div className="flex-shrink-0">
          <img
            src={project.image}
            alt={`${project.title} icon`}
            className="w-24 h-24 object-cover rounded-2xl shadow-md border border-border"
            loading="lazy"
          />
        </div>
        <div className="flex-grow flex flex-col h-full">
          <h3 className="text-xl font-bold font-heading text-primary-text mb-2">{project.title}</h3>
          <p className="text-secondary-text text-sm leading-relaxed mb-4 flex-grow">{project.summary}</p>
          <div className="mt-auto pt-3 border-t border-border space-y-2">
            <div>
              {project.links?.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-accent hover:text-accent-hover transition-colors group/link"
                  aria-label={`${project.title} store page`}
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-semibold group-hover/link:underline">View on Store</span>
                </a>
              ) : (
                <div className="inline-flex items-center text-secondary-text">
                   <LinkIcon className="w-4 h-4 mr-2" />
                   <span className="text-sm italic">Store link not available</span>
                </div>
              )}
            </div>
            <div>
              {project.links?.video ? (
                <a
                  href={project.links.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-accent hover:text-accent-hover transition-colors group/link"
                  aria-label={`${project.title} video demo`}
                >
                  <VideoIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-semibold group-hover/link:underline">Watch Gameplay</span>
                </a>
              ) : (
                 <div className="inline-flex items-center text-secondary-text">
                   <VideoIcon className="w-4 h-4 mr-2" />
                   <span className="text-sm italic">Gameplay not available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};