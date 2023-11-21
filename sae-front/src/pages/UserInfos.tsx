import { Rating, TextField, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Circle from '@mui/icons-material/Circle';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export interface skillType {
  name: string;
  label: string;
  value: number;
  color?: string;
}

interface UserInfosProps {
  skills: skillType[];
  setSkills: (skills: skillType[]) => void;
  customSkill: skillType;
  setCustomSkill: (customSkill: skillType) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
}

function UserInfos(props: UserInfosProps) {
  const { skills, setSkills, customSkill, setCustomSkill, nickname, setNickname } = props;

  const handleRatingChange = (index: any, newValue: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index].value = newValue ? newValue : 1;
    setSkills(updatedSkills);
  };

  const handleCustomSkillRatingChange = (event: any, newValue: any) => {
    setCustomSkill({
      name: 'otherDesc',
      label: event ? event.target.value : customSkill.label,
      value: newValue ? newValue : customSkill.value,
    });
  };

  return (
      <>
        <TextField
            name="nickname"
            label="Pseudo"
            variant="outlined"
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
        />
        {skills.map((skill, index) => (
            <Box
                key={index}
                textAlign="center"
                mt={3}
                display="flex"
                alignItems="center"
                sx={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
            >
              <Box flexGrow={1} alignItems="center" display="flex">
                <Typography component="legend" sx={{ marginRight: '15px' }}>
                  {skill.label}
                </Typography>
              </Box>
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
          <Box flexGrow={1} alignItems="center" display="flex">
            <TextField
                label="Autre"
                value={customSkill.label}
                variant={'standard'}
                onChange={(event) => handleCustomSkillRatingChange(event, null)}
                sx={{ marginRight: '10px', width: '95%' }}
            />
          </Box>
          <StyledRating
              name="rating"
              value={customSkill.value}
              sx={{ mt: 3 }}
              onChange={(event, newValue) => handleCustomSkillRatingChange(null, newValue)}
              size="large"
              icon={<Circle fontSize="inherit" sx={{ color: 'primary.main' }} />}
              emptyIcon={<Circle fontSize="inherit" />}
          />
        </Box>
      </>
  );
}

export default UserInfos;
