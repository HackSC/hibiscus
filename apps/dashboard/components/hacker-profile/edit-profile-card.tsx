import styled from 'styled-components';
import Select, {StylesConfig} from 'react-select';
import { IoMdClose } from "react-icons/io";

import { SCHOOLS } from '../../common/schools';


const EditProfileCard = ({ onClose }) => {
  
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
    ];

    const schoolOptions = SCHOOLS.map(school => ({ value: school, label: school }));
    return (
       <ModalOverlay>
            <ModalContainer>
                {/*close x button
                */}
                <IoMdClose color="black" size={25} onClick={onClose}/>
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
                        <Select 
                            options={schoolOptions}
                            placeholder="Select or type..."
                            menuPlacement='auto'
                            menuPortalTarget={document.body}
                            menuPosition={'fixed'}
                            menuShouldScrollIntoView={true}
                            
                            
                            styles={{
                                
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    
                                    backgroundColor: '#f5f5f5',
                                    borderBottom: 'solid #7E7E7E 2px',
                                    borderTop: 'none',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    display: 'flex',
                                    flexWrap: 'wrap',  
                                    alignItems: 'flex-start', 
                                    minHeight: '40px',  
                                    borderRadius: '8px',
                                    height:'auto'
                                    
                                }),
                                
                                menu: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: 'black',
                                    zIndex: 9999,
                                    borderRadius: '8px'
                                }),
                                singleValue: (baseStyles) => ({
                                    ...baseStyles,
                                    whiteSpace: 'normal',  
                                    display: 'inline-block',  
                                }),
                        
                                menuList: (baseStyles, state) => ({
                                    ...baseStyles,
                                    maxHeight: '115px',  
                                    overflowY: 'auto',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '8px'
                                    
                                }),
                                option: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: state.isFocused ? '#FF9966' : '#f5f5f5', // Change hover color
                                    color: 'black',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    
                                }),
                                
                            }}    
                        />
                    </InfoRow>


                </FormContainer>

                
                <FormContainer>
                    <InfoRow>
                        <FieldLabel>Graduation Year</FieldLabel>
                        <Select 
                            options={options} 
                            placeholder="Select or type..."
                            menuPlacement='auto'
                            menuPortalTarget={document.body}
                            menuPosition={'fixed'}
                            menuShouldScrollIntoView={true}
                            
                            
                            styles={{
                                
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    
                                    backgroundColor: '#f5f5f5',
                                    borderBottom: 'solid #7E7E7E 2px',
                                    borderTop: 'none',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    width: '28vh',
                                    borderRadius: '8px',
                                    
                                }),
                                
                                menu: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: 'black',
                                    zIndex: 9999,
                                    borderRadius: '8px'
                                }),
                                menuList: (baseStyles, state) => ({
                                    ...baseStyles,
                                    maxHeight: '115px',  
                                    overflowY: 'auto',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '8px'
                                    
                                }),
                                option: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: state.isFocused ? '#FF9966' : '#f5f5f5', // Change hover color
                                    color: 'black',
                                    cursor: 'pointer',
                                }),
                                
                            }}    
                        />
                        
                        
                    </InfoRow>
                </FormContainer>
                
            </ModalContainer>
       </ModalOverlay> 
    );
}


export default EditProfileCard;

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
    max-height: 700px;
    border: 1px solid black; 
    border-radius: 10px;
    position: relative;
    flex-shrink:0;
`;

const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    padding: 5px;
    
`;

const InfoRow = styled.div`
    display: flex;
    flex-direction: column;
    padding-left:35px;
    max-height:71px;
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


