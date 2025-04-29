import { useState } from "react";

export function Project({project}) {
    return(
        
        <div key={project.id} className="border border-gray-700 rounded-md overflow-hidden">
            <div className="p-4">
                <p className="text-gray-700">{project.vertical}</p>
                <h3 className="text-2xl font-bold italic">{project.title}</h3>
            </div>

            <div className={`${project.color} p-6 h-40 flex items-center justify-center ml-8 mr-20 border border-gray-700 rounded-md`}>
            </div>

            <div className="p-4">
                <p className="text-gray-700">{project.shortDescription}</p>
            </div>
        </div>
    );

}

export default Project;

