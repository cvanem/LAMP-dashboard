import React, { useEffect } from "react"
import { Box, Fab, Card, CardHeader, CardActions, Icon } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Credentials from "../Credentials"
import LAMP from "lamp-core"
import DeleteResearcher from "./DeleteResearcher"
import AddUpdateResearcher from "./AddUpdateResearcher"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      "& div.MuiInput-underline:before": { borderBottom: "0 !important" },
      "& div.MuiInput-underline:after": { borderBottom: "0 !important" },
      "& div.MuiInput-underline": {
        "& span.material-icons": {
          width: 21,
          height: 19,
          fontSize: 27,
          lineHeight: "23PX",
          color: "rgba(0, 0, 0, 0.4)",
        },
        "& button": { display: "none" },
      },
    },
    activityHeader: { padding: "20px 5px 20px 15px" },
    cardMain: {
      boxShadow: "none !important ",
      background: "#F8F8F8",
      "& span.MuiCardHeader-title": { fontSize: "16px", fontWeight: 500 },
    },
    checkboxActive: { color: "#7599FF !important" },
    btnWhite: {
      background: "#fff",
      borderRadius: "40px",
      boxShadow: "none",
      cursor: "pointer",
      textTransform: "capitalize",
      fontSize: "14px",
      color: "#7599FF",
      "& svg": { marginRight: 8 },
      "&:hover": { color: "#5680f9", background: "#fff", boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.20)" },
    },
  })
)
export default function ResearcherRow({ history, researcher, refreshResearchers, ...props }) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState(false)

  // const handleChange = (activity, event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked)
  //   handleSelectionChange(activity, event.target.checked)
  // }

  return (
    <Card className={classes.cardMain}>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1} py={1}>
          <CardHeader
            className={classes.activityHeader}
            title={researcher.name}
            // subheader={
            //   <Box>
            //     <Typography variant="subtitle1">{activity.spec?.replace("lamp.", "")}</Typography>
            //     <Typography variant="body2">{activity.study_name}</Typography>
            //   </Box>
            // }
          />
        </Box>
        <Box>
          <CardActions>
            <Credentials user={researcher} />
            {/* <PatientProfile
              participant={participant}
              studies={studies}
              onClose={updateParticipant}
              setUpdateCount={setUpdateCount}
            /> */}
            <AddUpdateResearcher researcher={researcher} refreshResearchers={refreshResearchers} />
            <DeleteResearcher researcher={researcher} refreshResearchers={refreshResearchers} />
            <Fab
              size="small"
              classes={{ root: classes.btnWhite }}
              onClick={() => {
                history.push(`/researcher/${researcher.id}`)
              }}
            >
              <Icon>arrow_forward</Icon>
            </Fab>
          </CardActions>
        </Box>
      </Box>
    </Card>
  )
}
