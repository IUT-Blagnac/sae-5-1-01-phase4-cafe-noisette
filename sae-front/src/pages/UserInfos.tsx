import { Rating, TextField, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import Circle from '@mui/icons-material/Circle';
import { useTheme } from "../utils/theme";

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
    { label: 'Niveau global en projet de dev :', value: 1, color: 'secondary.main' },
    { label: 'Codage front :', value: 1, color: 'primary.main' },
    { label: 'Test :', value: 1, color: 'primary.main' },
    { label: 'Documentation :', value: 1, color: 'primary.main' },
    { label: 'Github / Scrumaster :', value: 1, color: 'primary.main' },
    { label: 'Design / Interface :', value: 1, color: 'primary.main' },
  ];

  const [skills, setSkills] = useState(initialSkills);
  const [customSkill, setCustomSkill] = useState({ label: '', value: 1 });

  const handleRatingChange = (index: any, newValue: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index].value = newValue ? newValue : 1;
    setSkills(updatedSkills);
  };

  const handleCustomSkillRatingChange = (event: any, newValue: any) => {
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
          sx={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
        >
          <Typography component="legend" sx={{ marginRight: '10px' }}>
            {skill.label}
          </Typography>
          <Rating
            name="rating"
            value={skill.value}
            onChange={(event, newValue) => handleRatingChange(index, newValue)}
            size="large"
            icon={<Circle fontSize="inherit" sx={{ color: skill.color }} />}
            emptyIcon={<Circle fontSize="inherit" />}
          />
        </Box>
      ))}
      <Box textAlign="center" display="flex" alignItems="center">
        <TextField
          label="Autre"
          value={customSkill.label}
          onChange={(event) => handleCustomSkillRatingChange(event, null)}
          sx={{ marginRight: '10px' }}
        />
        <StyledRating
          name="rating"
          value={customSkill.value}
          onChange={(event, newValue) => handleCustomSkillRatingChange(null, newValue)}
          size="large"
          icon={<Circle fontSize="inherit" sx={{ color: 'primary.main' }} />}
          emptyIcon={<Circle fontSize="inherit" />}
        />
      </Box>
    </Box>
  );
}

export default UserInfos;
