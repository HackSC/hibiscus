import { useState, useEffect } from 'react';
import useHibiscusUser from 'apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import styled from 'styled-components';
import { HibiscusRole } from '@hibiscus/types';
import router from 'next/router';
import Modal from 'apps/dashboard/components/modal/modal';
import SearchBar from 'apps/dashboard/components/search-bar/search-bar';
import Papa from 'papaparse';
import Project from 'apps/dashboard/components/project-card/project';
import { getEnv } from '@hibiscus/env';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export function Index() {
  const { user: authUser } = useHibiscusUser();
  const { supabase } = useHibiscusSupabase();

  // default project state
  const defaultProjects = [
    // { id: 1, title: "My Project", vertical: "Vertical 1", shortDescription: "This project is about this and this.", color: "bg-white border-green-700", file: "project1.csv" },
    // { id: 2, title: "My Project", vertical: "Vertical 4", shortDescription: "This project is about this and this.", color: "bg-red-200", file: "project2.csv" },
    // { id: 3, title: "My Project", vertical: "Vertical 2", shortDescription: "This project is about this and this.", color: "bg-blue-100", file: "project3.csv" }
  ];

  const [projects, setProjects] = useState(defaultProjects);
  const [filteredProjects, setFilteredProjects] = useState(defaultProjects);

  // UI state
  const [activeVertical, setActiveVertical] = useState('All');
  const [verticals, setVerticals] = useState([
    'All',
    'Vertical 1',
    'Vertical 2',
    'Vertical 3',
    'Vertical 4',
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // modal and upload state
  const [showModal, setShowModal] = useState(false);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [uploadsInProgress, setUploadsInProgress] = useState([]);

  // authentication check
  useEffect(() => {
    if (
      authUser &&
      authUser.role !== HibiscusRole.JUDGE &&
      authUser.role !== HibiscusRole.ADMIN
    ) {
      router.push('/');
    }
  }, [authUser]);

  // filter projects based on active vertical and search term
  useEffect(() => {
    if (!projects) return;

    let filtered = projects;
    if (activeVertical !== 'All') {
      filtered = filtered.filter(
        (project) =>
          project.vertical.trim().toLowerCase() ===
          activeVertical.trim().toLowerCase()
      );
    }

    setFilteredProjects(filtered);
  }, [activeVertical, searchTerm, projects]);

  // handle file selection
  const handleFileSelect = (file) => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const fileName = file.name;

        // convert csv to project
        const newProjects = results.data.map((row, index) => {
          // trimming whitespace
          const vertical = row['Vertical']
            ? row['Vertical'].trim()
            : 'Uncategorized';

          return {
            id: `project-${Date.now()}-${index}`,
            title: row['Project Title'] || 'Untitled Project',
            vertical: vertical,
            description: row['About The Project'] || '',
            shortDescription: row['Built With'] || '',
            color: 'bg-blue-100',
            file: fileName,
            teamMembers:
              row[
                "Please Provide A List Of Your Team Members' Names. If There Are None, Put N/A."
              ] || '',
            devpostUrl: row['Submission Url'] || '',
            videoUrl: row['Video Demo Link'] || '',
            githubUrl: row['"Try it out" Links'] || '',
            imageUrl: '',
          };
        });

        // update verticals list with any new ones from CSV
        const extractedVerticals = newProjects
          .map((project) => project.vertical)
          .filter((vertical) => vertical && vertical.trim() !== '');

        const uniqueVerticals = Array.from(
          new Set([
            ...verticals.filter((v) => v !== 'All'),
            ...extractedVerticals,
          ])
        ).map((v) => v.trim());

        // set pending projects and show modal
        setPendingProjects(newProjects);
        setShowModal(true);

        // update verticals array with new ones
        setVerticals(['All', ...uniqueVerticals]);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Failed to parse CSV file.');
      },
    });
  };

  // file input change handler
  const changeHandler = (event) => {
    const file = event.target.files[0];
    console.log('changeHandler');
    if (file) handleFileSelect(file);
  };

  // drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // upload confirmation
  const handleUploadConfirm = () => {
    if (pendingProjects.length === 0) return;

    // start the upload process
    const fileToUpload = pendingProjects[0].file;

    // Add to uploads in progress
    const newUpload = {
      id: Date.now(),
      fileName: fileToUpload,
      status: 'uploading',
      progress: 0,
    };

    setUploadsInProgress((prev) => [...prev, newUpload]);

    // add projects to the main projects list
    setProjects((prev) => [...prev, ...pendingProjects]);

    // Close the modal and clear pending uploads
    setShowModal(false);
    setPendingProjects([]);

    // Simulate upload progress
    simulateFileUpload(newUpload.id);
    submitProjects(pendingProjects);
  };

  const handleUploadCancel = () => {
    setShowModal(false);
    setPendingProjects([]);
  };

  const simulateFileUpload = (uploadId) => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;

      setUploadsInProgress((prev) =>
        prev.map((upload) =>
          upload.id === uploadId
            ? {
                ...upload,
                progress,
                status: progress >= 100 ? 'success' : 'uploading',
              }
            : upload
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // project upload to database

  const submitProjects = async (projectsToSend = projects) => {
    try {
      const projectsToSubmit = projectsToSend.map((project) => ({
        name: project.title,
        teamMembers: project.teamMembers,
        description: project.description,
        imageUrl: project.imageUrl,
        devpostUrl: project.devpostUrl,
        videoUrl: project.videoUrl,
        vertical: project.vertical,
      }));

      const apiUrl = process.env.NEXT_PUBLIC_HIBISCUS_PODIUM_API_URL;
      //   const token = getEnv().Hibiscus.Supabase.serviceKey;
      console.log('Formatted projects:', projectsToSubmit);
      //   console.log('Auth token:', token);
      console.log('API URL:', apiUrl);

      //   const response = await axios({
      //     method: 'POST',
      //     url: `${apiUrl}/add_projects`,
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${token}`
      //     },
      //     data: { data: projectsToSubmit }
      //   });

      const token = getCookie(
        getEnv().Hibiscus.Cookies.accessTokenName
      )?.toString();
      const response = await axios.post(
        `${apiUrl}/add_projects`,
        projectsToSubmit,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Projects submitted successfully');
      return response.data;
    } catch (error) {
      console.error('Error submitting projects:', error);
      throw error;
    }
  };

  if (authUser === null) {
    return <>Loading</>;
  }

  return (
    <div className="max-w-full p-12">
      <div className="flex mb-5 justify-end">
        <div className="flex mb-5">
          <SearchBar
            placeholder="Search name"
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          projects={pendingProjects}
          onConfirm={handleUploadConfirm}
          onCancel={handleUploadCancel}
        />
      )}

      {/* vertical filter buttons */}
      <div className="flex items-center mb-6 w-full">
        <h3 className="text-2xl font-normal italic mr-6">Verticals</h3>
        <div className="flex space-x-10">
          {verticals.map((vertical) => (
            <button
              key={vertical}
              className={`px-6 py-1 rounded-lg border ${
                activeVertical === vertical ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setActiveVertical(vertical)}
            >
              {vertical}
            </button>
          ))}
        </div>
      </div>

      {/* file upload area */}
      <div
        className="border-2 border-dashed border-gray-700 bg-blue-50 rounded-md p-10 mb-8 flex flex-col items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mb-2 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
          />
        </svg>
        <div className="text-blue-500 flex items-center">
          <label htmlFor="fileUpload" className="cursor-pointer">
            <span className="text-blue-600 hover:underline">
              Click to upload
            </span>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={changeHandler}
            />
          </label>
          <span className="text-gray-700 ml-1">or drag and drop</span>
        </div>
      </div>

      {/* Upload progress indicators */}
      {uploadsInProgress.map((upload) => (
        <div key={upload.id} className="mb-6">
          <p className="font-medium">{upload.fileName}</p>
          <ProgressBar status={upload.status} progress={upload.progress} />
        </div>
      ))}

      {/* Project count */}
      <div className="mb-6">
        <p className="text-lg">Showing {filteredProjects.length} Projects</p>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Index;

// Styled components and helper components
const NewProjectButton = styled.button`
  color: white;
  background-color: #429fed;
  border: 1px solid black;
`;

interface ProgressBarProps {
  status: 'idle' | 'uploading' | 'success' | 'fail';
  progress?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ status, progress = 0 }) => {
  const getBarColor = () => {
    switch (status) {
      case 'uploading':
        return 'bg-black';
      case 'success':
        return 'bg-green-500';
      case 'fail':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return `Uploading... ${progress}%`;
      case 'success':
        return 'Upload Complete!';
      case 'fail':
        return 'Upload Failed';
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 text-sm text-gray-700">{getStatusText()}</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getBarColor()} transition-all duration-300 ease-in-out`}
          style={{
            width:
              status === 'uploading'
                ? `${progress}%`
                : status === 'success'
                ? '100%'
                : status === 'fail'
                ? '0%'
                : '0%',
          }}
        ></div>
      </div>
    </div>
  );
};
