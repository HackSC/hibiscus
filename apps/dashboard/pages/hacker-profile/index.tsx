import React, { useState } from 'react';
import EditProfileCard from '../../components/hacker-profile/edit-profile-card';
import styled from 'styled-components';

import Star4 from '../../components/svg/star-4';
import { GrEdit } from "react-icons/gr";


//import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';

export function Index() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    //const { user } = useHibiscusUser();
    const handleEdit = (event) => {
        
      };
    

    return (
        
        <LayoutContainer>
           
           
            {isEditing && <EditProfileCard onClose={() => setIsEditing(false)} />}
            <Body>
                <BasicInfoContainer>
                    
                        <ProfileImageContainer>
                            <ProfileImage src={profileImage || ""} />
                            <EditIconButton onClick={() => document.getElementById('imageUpload').click()}>
                                
                                <GrEdit size="17px"/>
                                
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleEdit} 
                                />
                            </EditIconButton>
                        </ProfileImageContainer>
                    
                    <ProfileBox>
                        <UserName>Steven Sun</UserName>
                        
                        {!isEditing && (
                        <EditButton onClick={() => setIsEditing(true)}>
                            Edit
                        </EditButton>
                        )}
                    </ProfileBox>
                   
                    <InfoRow>
                        <InfoItem>
                            <Label>School</Label>
                            <InfoText>University of Southern California</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <Label>Field Of Study</Label>
                            <InfoText>Computer Science</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <Label>Graduating</Label>
                            <InfoText>Spring 2025</InfoText>
                        </InfoItem>
                    </InfoRow>

                </BasicInfoContainer>
                
                <DividerLine />
                <AboutContainer>
                <Header3>About Me</Header3>
                <TextBox>Hi I'm a freshman</TextBox>
                
                
                </AboutContainer>
                <Header3>Resume</Header3>
                
                <ResumeButton>
                    Upload Resume
                </ResumeButton>
            </Body>
            
            <Star4Container>
                <Star4 />
            </Star4Container>
        </LayoutContainer>
        
        
    );
    

    
    
}



export default Index;





const ProfileImageContainer = styled.div`
    
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow:hidden;
    border: 1px solid black;
    background-color:#D9D9D9;
    position:absolute;
    left: 50px; 
    margin-right: 50px;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    
`;



const EditIconButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    cursor: pointer;

    label {
        cursor: pointer;
    }
`;


const BasicInfoContainer = styled.div`
    
`;

const UserName = styled.h2`
    font-size: 28px;
    margin-bottom: 20px;
    color: black;
    font-weight: bold;
    padding-bottom:25px;
    padding-right:30px;
    margin:0;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-bottom:30px;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 40px;
`;

const Label = styled.span`
    color: #FE6447;
    font-weight: bold;
`;

const InfoText = styled.span`
    color: black;
`;

const DividerLine = styled.hr`
    width: 85%;
    border: 10;
    height: 10px;
    color: #989898;
    margin: 20px 0;
    z-index:10;
`

const AboutContainer = styled.div`
    padding-bottom:10px;
`;


const TextBox = styled.div`

`;

const Star4Container = styled.div`
    position: absolute;
    bottom: 0;
    right: 0px;
    width: 100%;
    height: 250px; 
    overflow: hidden; 
    display: flex;
    justify-content: flex-end;
    
`;



const Header3 = styled.h3`
    margin-right:10px;
    
`;


const Body = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items:flex-start;
    flex-direction:column;
    height: 70vh;
    background-color: #f5f5f5;
    
    padding:40px;
    
    padding-left:250px;
`;

const LayoutContainer = styled.div`
    width: 100%;
    position:relative;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    height: 100vh;
    background-color: #f5f5f5;
    flex-direction: column;
    margin-bottom:50px;
    
`;

const ProfileBox = styled.div`
    display: flex;
    
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 40px;
    background-color: #f5f5f5;
    border-radius: 10px;
    width: 50%;
    
`;

const ProfileText = styled.h2`
    margin-right:20px;
    font-weight:bold;
`;

const EditButton = styled.button`
    padding: 10px 25px;
    margin-top: 0;
    background-color: transparent; 
    color: black; 
    border: 1px solid black; 
    border-radius: 10px; 
    z-index: 2;
    cursor: pointer;
    
`;

const ResumeButton = styled.button`
    padding: 10px 20px;
    margin-top: 0;
    background-color: #FF6347; 
    color: black; 
    border: 1px solid black; 
    border-radius: 10px; 
    cursor: pointer;
`;

