import React from 'react';
import type { Project } from '../types';

interface PersonalProjectCardProps {
  project: Project;
}

export const PersonalProjectCard: React.FC<PersonalProjectCardProps> = ({ project }) => {
  const summaryPoints = Array.isArray(project.summary) ? project.summary : [project.summary];

  return (
    <div className="bg-card-glass backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:border-border/30 hover:-translate-y-1 group flex flex-col h-full animate-fade-in-up p-6">
      <div className="flex-grow flex flex-col h-full">
        <h3 className="text-xl font-bold font-heading text-primary-text mb-4">{project.title}</h3>
        
        <ul className="space-y-2 flex-grow text-sm">
          {summaryPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-4 h-4 text-accent flex-shrink-0 mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
              <span className="text-secondary-text leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};