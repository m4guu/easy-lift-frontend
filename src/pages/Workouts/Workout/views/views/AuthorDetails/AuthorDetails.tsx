import React from "react";

import { Box, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useUser } from "../../../../../../hooks/queryHooks/userHooks/useUser";

import { Status } from "../../../../../../shared/enums";

import { API_URL } from "../../../../../../config/env.config";

interface AuthorDetailsProps {
  authorId: string;
}

export const AuthorDetails: React.FC<AuthorDetailsProps> = ({ authorId }) => {
  const { status, error, data: author } = useUser(authorId);

  return (
    <Box>
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}

      {status === Status.SUCCESS && (
        <DetailsWrapper>
          <AuthorAvatar src={`${API_URL}${author.image}`} alt="avatar" />
          <AuthorName variant="caption">{author.name}</AuthorName>
        </DetailsWrapper>
      )}
    </Box>
  );
};

const AuthorAvatar = styled(Avatar)({
  width: "45px",
  height: "45px",
});

const DetailsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const AuthorName = styled(Typography)({
  fontSize: "1rem",
});
