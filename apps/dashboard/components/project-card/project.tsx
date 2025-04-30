import { useRouter } from 'next/router';
import Link from 'next/link';
export function Project({project}) {
    const router = useRouter();
    return(
        // change
        <Link  href={`/project/${project.id}`}>

        
        <div key={project.id} className="border border-gray-700 rounded-md overflow-hidden transition-all duration-200 hover:border-gray-900 hover:border-2">
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
        </Link>
    );

}

export default Project;

