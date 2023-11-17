import { Rating, TextField, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function UserInfos() {
  const initialSkills = [
    { label: 'Niveau global en projet de dev :', value: 1, color: 'purple' },
    { label: 'Codage front :', value: 1 , color: 'orange'},
    { label: 'Test :', value: 1 , color: 'orange'},
    { label: 'Documentation :', value: 1 , color: 'orange'},
    { label: 'Github / Scumaster :', value: 1, color: 'orange' },
    { label: 'Design / Interface :', value: 1 , color: 'orange'},
  ];

  const [skills, setSkills] = useState(initialSkills);
  const [customSkill, setCustomSkill] = useState({ label: '', value: 1 });

  const handleRatingChange = (index:any, newValue:any) => {
    const updatedSkills = [...skills];
    updatedSkills[index].value = newValue ? newValue : 1;
    setSkills(updatedSkills);
  };

  const handleCustomSkillRatingChange = (event:any, newValue:any) => {
    setCustomSkill({
      label: event ? event.target.value : customSkill.label,
      value: newValue ? newValue : customSkill.value,
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {skills.map((skill, index) => (
        <Box
          key={index}
          textAlign="center"
          mb={5}
          display="flex"
          alignItems="center"
          style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
        >
          <Typography component="legend" style={{ marginRight: '10px' }}>
            {skill.label}
          </Typography>
          <Rating
            name="rating"
            value={skill.value}
            onChange={(event, newValue) => handleRatingChange(index, newValue)}
            size="large"
            icon={<RadioButtonUncheckedIcon fontSize="inherit" style={{ color: skill.color }} />}
            emptyIcon={<RadioButtonUncheckedIcon fontSize="inherit" />}
          />
        </Box>
      ))}
      <Box textAlign="center" display="flex" alignItems="center">
        <TextField
          label="Autre"
          value={customSkill.label}
          onChange={(event) => handleCustomSkillRatingChange(event, null)}
          style={{ marginRight: '10px' }}
        />
        <StyledRating
          name="rating"
          value={customSkill.value}
          onChange={(event, newValue) => handleCustomSkillRatingChange(null, newValue)}
          size="large"
          icon={<RadioButtonUncheckedIcon fontSize="inherit" style={{ color: 'orange' }} />}
          emptyIcon={<RadioButtonUncheckedIcon fontSize="inherit" />}
        />
      </Box>
    </Box>
  );
}

export default UserInfos;
