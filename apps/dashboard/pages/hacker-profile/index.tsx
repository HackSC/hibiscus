import React, { useState } from 'react';
import EditProfileCard from '../../components/hacker-profile/edit-profile-card';
import styled from 'styled-components';
import Star5 from '../../components/svg/star-5';
import Star4 from '../../components/svg/star-4';


//import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';

export function Index() {
    const [isEditing, setIsEditing] = useState(false);
    //const { user } = useHibiscusUser();

    

    return (
        
            <LayoutContainer>
                 <Star5Container>
                    <Star5 />
                </Star5Container>
                <ProfileBox>
                    
                    <ProfileText style={{ color: 'black' }}>Profile</ProfileText>
                    {!isEditing && (
                        <EditButton onClick={() => setIsEditing(true)}>
                            Edit
                        </EditButton>
                    )}
                    
                </ProfileBox>
                {isEditing && <EditProfileCard onClose={() => setIsEditing(false)} />}
                <Body>
                    <BasicInfoContainer>
                        
                    <UserName>Steven Sun</UserName>
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
                    <Divider />
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


const BasicInfoContainer = styled.div`

`;

const UserName = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    color: black;
    font-weight: bold;
    padding-bottom:25px;
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

const Divider = styled.hr`
    width: 85%;
    border: 0;
    height: 2px;
    background-color: #989898;
    margin: 20px 0;
`;

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

const Star5Container = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 200px; 
    overflow: hidden; 
    display: flex;
    justify-content: center; 
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
    align-items: center;
    padding: 40px;
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

