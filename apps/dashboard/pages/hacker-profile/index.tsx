import React, { useState } from 'react';
import EditProfileCard from '../../components/hacker-profile/edit-profile-card';
import styled from 'styled-components';

{/* need help with:
- font family
- close tab - react icons https://react-icons.github.io/react-icons/
- centering the items - 
- connecting to backend
- getting rid of header
- adding sidebar
- search and calendar - mlh-policies upload schools.csv and user react-select to search
- make shorter, make background the same color, leave bottom border, fix text color
*/}

//import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';

export function Index() {
    const [isEditing, setIsEditing] = useState(false);
    //const { user } = useHibiscusUser();

    

    return (
        <LayoutContainer>
            <ProfileBox>
                
                <ProfileText style={{ color: 'black' }}>Profile</ProfileText>
                {!isEditing && (
                    <EditButton onClick={() => setIsEditing(true)}>
                        Edit
                    </EditButton>
                )}
                
            </ProfileBox>
            {isEditing && <EditProfileCard onClose={() => setIsEditing(false)} />}
        </LayoutContainer>
    );
}



export default Index;



const LayoutContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    background-color: #f5f5f5;
    padding-top: 20px;
`;

const ProfileBox = styled.div`
    display: flex;
    
    justify-content: flex-start;
    align-items: center;
    padding: 40px;
    background-color: #f5f5f5;
    border-radius: 10px;
    width: 50%;
    
`;

const ProfileText = styled.h2`
  margin-right:20px;
`;

const EditButton = styled.button`
    padding: 10px 20px;
    margin-top: 0;
    background-color: transparent; 
    color: black; 
    border: 1px solid black; 
    border-radius: 10px; 
    cursor: pointer;
  
`;

