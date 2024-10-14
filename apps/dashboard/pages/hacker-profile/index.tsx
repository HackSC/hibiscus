import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { IoMdClose } from "react-icons/io";



import styled from 'styled-components';

{/* need help with:
- font family
- close tab - react icons https://react-icons.github.io/react-icons/
- centering the items - 
- connecting to backend
- getting rid of header
- adding sidebar
- search and calendar - datepicker, mlh-policies upload schools.csv and read it with dropdown
*/}

//import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';

const EditModal = ({ onClose }) => {
    return(
       <ModalOverlay>
            <ModalContainer>
                {/*close x button
                */}
                <IoMdClose color="black" onClick={onClose}/>
                <SaveButton onClick={onClose}>Save</SaveButton>
                <FormContainer>
                    <InfoRow>
                        <FieldLabel>Name</FieldLabel>
                        <Input type="text" placeholder="Full Name" />
                    </InfoRow>
                
                    <InfoRow>
                        <FieldLabel>Username</FieldLabel>
                        <Input type="text" placeholder="Username" />
                    </InfoRow>
                </FormContainer>
                
                <FormContainer>
                    <InfoRow>
                        <FieldLabel>Field of Study</FieldLabel>
                        <Input type="text" placeholder="--" />
                    </InfoRow>
               
                    <InfoRow>
                        <FieldLabel>Password</FieldLabel>
                        <Input type="text" placeholder="************" />
                    </InfoRow>

                </FormContainer>

                <FormContainer>
                    <InfoRow>
                        <FieldLabel>Profile Bio</FieldLabel>
                        <Input type="text" placeholder="--" />
                        
                    </InfoRow>
                    
                    <InfoRow>
                        <FieldLabel>School</FieldLabel>
                        <Input type="text" placeholder="--" />
                        {/* need to add search function*/}
                    </InfoRow>


                </FormContainer>

                const options = [
                    { value: 'fall 2024', label: 'Fall 2024' },
                    { value: 'spring 2025', label: 'Spring 2025' },
                    { value: 'fall 2025', label: 'Fall 2025' },
                    { value: 'spring 2026', label: 'Spring 2026' },
                    { value: 'fall 2026', label: 'Fall 2026' },
                    { value: 'spring 2027', label: 'Spring 2027' },
                    { value: 'fall 2027', label: 'Fall 2027' },
                    { value: 'spring 2028', label: 'Spring 2028' },
                    { value: 'fall 2028', label: 'Fall 2028' },
                    { value: 'spring 2029', label: 'Spring 2029' },
                    { value: 'fall 2029', label: 'Fall 2029' },
                    { value: 'spring 2030', label: 'Spring 2030' }
                ]
                <FormContainer>
                    <InfoRow>
                        <FieldLabel>Graduation Year</FieldLabel>
                        const MyComponent = () => (
                            <Select options={options} />
                        )
                        
                        
                    </InfoRow>
                </FormContainer>
                
            </ModalContainer>
       </ModalOverlay> 
    );
}

export function Index() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    //const { user } = useHibiscusUser();



    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); 
    };

    return (
        <LayoutContainer>
            <ProfileBox>
                
                <ProfileText style={{ color: 'black' }}>Profile</ProfileText>
                <EditButton onClick={toggleModal} >Edit</EditButton>
                
            </ProfileBox>
        {isModalOpen && <EditModal onClose={toggleModal} />}
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

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
`;
    
const ModalContainer = styled.div`
    background-color: #f5f5f5;
    padding: 50px;
    width: 700px;
    border: 1px solid black; 
    border-radius: 10px;
    position: relative;
`;

const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    padding: 5px;
`;

const InfoRow = styled.div`
    display: flex;
    flex-direction: column;
`;

const FieldLabel = styled.label`
    font-weight: bold;
    color: #FF6347;
    margin-bottom: 8px;
`;

const SaveButton = styled.button`
    position: absolute; 
    top: 40px; 
    right: 40px;
    padding: 10px 20px;
    margin-top: 0;
    background-color: transparent; 
    color: black; 
    border: 1px solid black; 
    border-radius: 10px; 
    cursor: pointer;
  
`;

const Input = styled.input`
    padding: 8px;
    background-color: #f5f5f5;
    
    font-size: 14px;
    width: 200px;
    border-bottom: solid 1px;
    border-bottom-color: #7E7E7E;

`;
