import { Modal, Box, TextField, Tooltip } from "@mui/material";
import { Typography, Button, IconButton } from "@mui/material";
import {
  LightbulbOutlined as LightbulbOutlinedIcon,
  CloseOutlined as CloseOutlinedIcon,
} from "@mui/icons-material";
import { IWordsState, ECommon } from "./types";
import useAlias from "./aliasHook";

const Alias = () => {
  const {
    time,
    winner,
    teamOne,
    teamTwo,
    wordsList,
    modalState,
    winningCount,
    teamOneCount,
    teamTwoCount,
    isGameStarted,
    isMiddleRound,
    currentPhraseDescription,
    createList,
    handleGuess,
    handleStartGame,
    handleGameChange,
    handleModalState,
    handleRestartGame,
    handleContinueGame,
    handleCurrentDescription,
  } = useAlias();

  return (
    <Typography component="div">
      {!isGameStarted ? (
        <Typography component="div">
          <Typography
            component="div"
            sx={{
              width: "380px",
              margin: "0 auto",
              display: "flex",
              padding: "10px",
              justifyContent: "space-between",
            }}
          >
            <TextField
              size="small"
              label="Team 1"
              variant="filled"
              sx={{ width: "140px" }}
              value={teamOne}
              onChange={(e) => handleGameChange(e, ECommon.teamOne)}
            />
            <TextField
              size="small"
              label="Team 2"
              variant="filled"
              value={teamTwo}
              sx={{ width: "140px" }}
              onChange={(e) => handleGameChange(e, ECommon.teamTwo)}
            />
            <TextField
              size="small"
              type="number"
              label="seconds"
              variant="filled"
              value={time || ""}
              sx={{ width: "80px" }}
              onChange={(e) => handleGameChange(e, ECommon.time)}
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
            <TextField
              size="small"
              type="number"
              variant="filled"
              label="winning count"
              value={winningCount || ""}
              sx={{ width: "80px" }}
              onChange={(e) => handleGameChange(e, ECommon.winningCount)}
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={handleStartGame}
            size="small"
            sx={{
              width: "380px",
              margin: "0 auto",
              display: "flex",
            }}
          >
            {ECommon.startGame}
          </Button>
        </Typography>
      ) : (
        <Typography
          component="div"
          sx={{
            width: "380px",
            margin: "0 auto",
            padding: "10px",
          }}
        >
          <Typography
            component="div"
            sx={{
              width: "380px",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
              borderBottom: "1px dotted black",
            }}
          >
            <Typography component="div">{time}</Typography>
            <Typography component="div">
              {teamOne}: {teamOneCount}
            </Typography>
            <Typography component="div">
              {teamTwo}: {teamTwoCount}
            </Typography>
            <Typography component="div">
              {ECommon.countForWin}: {winningCount}
            </Typography>
          </Typography>
          {!!wordsList.length &&
            wordsList.map((word: IWordsState) => {
              const { phrase, description, isGuessed } = word;
              return (
                <Typography
                  key={phrase}
                  sx={{
                    padding: "5px",
                    display: "flex",
                    marginBottom: "7px",
                    borderRadius: "5px",
                    alignItems: "center",
                    background: isGuessed ? "#90dbe7" : "",
                  }}
                >
                  <Typography
                    component="span"
                    onClick={() => handleGuess(phrase)}
                    sx={{ flexGrow: 1, cursor: "pointer" }}
                  >
                    {word.phrase.trim()}
                  </Typography>
                  {!!description && (
                    <Tooltip title="description" placement="right-start">
                      <IconButton
                        onClick={() => handleCurrentDescription(description)}
                      >
                        <LightbulbOutlinedIcon
                          color={isGuessed ? "primary" : "warning"}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
              );
            })}
          <Modal open={modalState} onClose={handleModalState}>
            <Box
              sx={{
                p: 4,
                width: 360,
                height: "92%",
                boxShadow: 24,
                top: "50%",
                left: "50%",
                padding: "15px",
                borderRadius: "10px",
                position: "absolute",
                border: "1px solid grey",
                bgcolor: "background.paper",
                transform: "translate(-50%, -50%)",
              }}
            >
              {!!currentPhraseDescription && !isMiddleRound && !winner && (
                <Typography component="div">
                  <Typography
                    variant="h4"
                    display="flex"
                    component="div"
                    alignItems="center"
                  >
                    <Typography component="i" variant="h5" flexGrow={1}>
                      {ECommon.description}
                    </Typography>
                    <IconButton onClick={handleModalState} color="error">
                      <CloseOutlinedIcon />
                    </IconButton>
                  </Typography>
                  <Typography component="div" sx={{ fontWeight: "600" }}>
                    {currentPhraseDescription.trim()}
                  </Typography>
                </Typography>
              )}
              {(isMiddleRound || winner) && (
                <Typography component="div">
                  <Typography component="div">
                    {teamOne}: {teamOneCount}
                  </Typography>
                  <Typography component="div">
                    {teamTwo}: {teamTwoCount}
                  </Typography>
                  {isMiddleRound && (
                    <Button
                      fullWidth
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={handleContinueGame}
                    >
                      {ECommon.continueGame}
                    </Button>
                  )}
                  {winner && (
                    <>
                      <Typography component="div">
                        {ECommon.winnerTeam}: {winner}
                      </Typography>
                      <Button
                        fullWidth
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={handleRestartGame}
                      >
                        {ECommon.restartGame}
                      </Button>
                    </>
                  )}
                </Typography>
              )}
            </Box>
          </Modal>
          <Button
            fullWidth
            size="small"
            color="primary"
            variant="contained"
            onClick={createList}
          >
            {ECommon.next}
          </Button>
          <Button
            fullWidth
            size="small"
            color="secondary"
            variant="contained"
            onClick={handleRestartGame}
            sx={{ marginTop: "15px" }}
          >
            {ECommon.restartGame}
          </Button>
        </Typography>
      )}
    </Typography>
  );
};

export default Alias;
