import { FC } from "react";

import {
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DoneAllOutlined as DoneAllOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  ClearAllOutlined as ClearAllOutlinedIcon,
} from "@mui/icons-material";

import useToDo from "./toDoHook";
import { EActions, IToDo } from "./types";

const Todo: FC = () => {
  const {
    doings,
    newDoing,
    selected,
    doneDoings,
    isFiltered,
    totalDoings,
    searchFilter,
    handleAdd,
    handleDone,
    setNewDoing,
    handleDelete,
    handleSelect,
    setIsFiltered,
    isIncludeSearch,
    setSearchFilter,
    handleBatchActions,
  } = useToDo();

  return (
    <Typography component="div" margin={4} minWidth="500px">
      <Typography
        component="div"
        sx={{
          display: " flex",
          marginBottom: "20px",
          justifyContent: "space-around",
        }}
      >
        <Typography component="span" variant="h5">
          Total doings: {totalDoings}
        </Typography>
        <Typography component="span" variant="h5">
          Already done: {doneDoings}
        </Typography>
        <Button
          size="small"
          color="primary"
          variant="contained"
          disabled={!totalDoings}
          onClick={() => setIsFiltered(!isFiltered)}
        >
          Show {!isFiltered ? "done" : "all"}
        </Button>
      </Typography>

      <Typography component="div" sx={{ display: "flex" }}>
        <TextField
          size="small"
          label="Add to do"
          value={newDoing}
          sx={{ flexGrow: "1", marginRight: "10px" }}
          onChange={(e) => setNewDoing(e.target.value)}
        />
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleAdd}
          disabled={!newDoing}
        >
          Add new to do
        </Button>
      </Typography>

      <Typography component="div" sx={{ display: "flex", marginTop: "20px" }}>
        <TextField
          label="Search to do"
          value={searchFilter}
          sx={{ flexGrow: "1", marginRight: "10px" }}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </Typography>

      <Typography
        component="div"
        sx={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "space-around",
          visibility: !!selected.length ? "visible" : "hidden",
        }}
      >
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => handleBatchActions(EActions.delete)}
        >
          Delete selected item
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => handleBatchActions(EActions.toggleDone)}
        >
          Toggle selected item done
        </Button>
      </Typography>

      <Grid
        container
        marginTop={3}
        direction="column"
        alignItems="stretch"
        justifyContent="space-evenly"
      >
        {!!doings.length &&
          doings
            .filter((doing: IToDo) =>
              searchFilter ? isIncludeSearch(doing.task) : true
            )
            .filter((doing: IToDo) => (isFiltered ? doing.done : true))
            .map((doing: IToDo) => {
              return (
                <Typography
                  component={"div"}
                  key={doing.id}
                  sx={{
                    marginTop: "5px",
                    padding: "4px",
                    display: "flex",
                    borderRadius: "5px",
                    alignItems: "center",
                    ":hover": { background: "#65afbb" },
                    background: selected.includes(doing.id) ? "#90dbe7" : "",
                  }}
                >
                  <Typography
                    component={"span"}
                    variant="h5"
                    sx={{
                      flexGrow: "1",
                      textDecoration: doing.done ? "line-through" : "",
                      textDecorationColor: "red",
                    }}
                  >
                    {doing.task}
                  </Typography>
                  <Tooltip title="Done" placement="left-start">
                    <IconButton onClick={() => handleDone(doing.id)}>
                      <DoneAllOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="left-start">
                    <IconButton onClick={() => handleDelete(doing.id)}>
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Select" placement="left-start">
                    <IconButton onClick={() => handleSelect(doing.id)}>
                      <ClearAllOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
              );
            })}
      </Grid>
    </Typography>
  );
};

export default Todo;
