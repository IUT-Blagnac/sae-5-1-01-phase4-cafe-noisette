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
}

function UserInfos(props: UserInfosProps) {
  const { skills } = props;

  return (
    <>
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
            readOnly={true}
            size="large"
            icon={<Circle fontSize="inherit" sx={{ color: skill.color }} />}
            emptyIcon={<Circle fontSize="inherit" />}
          />
        </Box>
      ))}
    </>
  );
}

export default UserInfos;
