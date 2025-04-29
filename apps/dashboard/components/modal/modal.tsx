import Project from "../project-card/project";
import styled from 'styled-components';
export function Modal({projects, onConfirm, onCancel}) {
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
                {/* Modal container */}
        <div className="bg-white w-3/4 max-w-4xl max-h-[90vh] rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="border rounded-md p-4">
            <div className="relative flex flex-row  h-16 items-center">
                <h2>Projects to be uploaded</h2>
                <span>Showing {projects.length} projects</span>
                <button 
                        onClick={onCancel}
                        className="absolute right-0 w-10 h-10 flex items-center justify-center"
                    >
                        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" strokeWidth="2.70">
                            <line x1="16" y1="16" x2="48" y2="48"></line>
                            <line x1="48" y1="16" x2="16" y2="48"></line>
                        </svg>
                    </button>
            </div>
            <div className=" p-8">
            <div className="relative flex flex-row  h-16 justify-center items-center">
                <NewProjectButton onClick={onConfirm}>Upload</NewProjectButton>

            </div>
            <div className="relative flex flex-row h-16">
                <p className="text-zinc-700 absolute right-4">Edit</p>

            </div>
            
            
            <div className="h-96 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
                               
            <Project key={project.id} project={project}/>
            
            ))}

            </div>

            </div>
            
            
            </div>
            
            



            </div>
        </div>
        </div>

        
        
    );

}

export default Modal;

const NewProjectButton = styled.button`
  padding: 10px 10px;
  margin-top: 0;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  z-index: 2;
  cursor: pointer;
  margin-bottom: 13px;
`;