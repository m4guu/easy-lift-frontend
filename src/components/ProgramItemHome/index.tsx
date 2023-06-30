import React from "react";

import { Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/system";

import { useUser } from "../../hooks/queryHooks/userHooks/useUser";
import { useUserContext } from "../../contexts/userContext";

import { Program } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";
import { API_URL } from "../../config/env.config";

import {
  ProgramItemCard,
  HeaderContainer,
  ProgramImage,
  Overlay,
  ProgramTitle,
  ProgramContent,
  ContentWrapper,
  TrainerName,
  AuthorBox,
  Description,
  DescriptionHeader,
  DescriptionContent,
  ContentText,
  Price,
} from "./ProgramItemHome.styles";
import StatusBar from "../StatusBar";

type ProgramItemHomeProps = {
  program: Program;
};

const ProgramItemHome: React.FC<ProgramItemHomeProps> = ({ program }) => {
  const { user } = useUserContext();
  const { error, status, data: trainer } = useUser(program.creator);
  const theme = useTheme();

  return (
    <ProgramItemCard to={`${PATHS.PROGRAMS}/${program.id}`}>
      <HeaderContainer>
        <ProgramImage src={`${API_URL}${program.image}`} alt="program" />
        <Overlay />
        <ProgramTitle variant="subtitle1" color="primary">
          {program.title}
        </ProgramTitle>
      </HeaderContainer>

      <ProgramContent>
        <ContentWrapper>
          <AuthorBox>
            <Typography color="primary" variant="caption">
              Author
            </Typography>
            <ContentText
              variant="caption"
              color={theme.palette.custom_grey.tint_2}
            >
              {trainer && (
                <TrainerName variant="caption">{trainer.name}</TrainerName>
              )}
              {program.creator === user?.id && (
                <Typography variant="caption" color="info.main">
                  you
                </Typography>
              )}

              <StatusBar status={status} error={error} />
            </ContentText>
          </AuthorBox>

          <Divider />

          <Description>
            <DescriptionHeader color="primary" variant="caption">
              Program Description
            </DescriptionHeader>

            <Divider />

            <DescriptionContent
              variant="body2"
              color={theme.palette.custom_grey.tint_2}
            >
              {program.description.substring(0, 50)}...
            </DescriptionContent>
          </Description>

          <Price variant="subtitle1" color="primary">
            {program.price.toFixed(2)} $
          </Price>
        </ContentWrapper>
      </ProgramContent>
    </ProgramItemCard>
  );
};

export default ProgramItemHome;
