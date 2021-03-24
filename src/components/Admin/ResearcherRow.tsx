import React, { useEffect } from "react"
import { Box, Typography, Card, CardHeader, CardActions } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import ScheduleActivity from "./ScheduleActivity"
import UpdateActivity from "./UpdateActivity"
import Checkbox from "@material-ui/core/Checkbox"
import { updateSchedule } from "./ActivityMethods"
import LAMP from "lamp-core"

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
    activityHeader: { padding: "12px 5px" },
    cardMain: {
      boxShadow: "none !important ",
      background: "#F8F8F8",
      "& span.MuiCardHeader-title": { fontSize: "16px", fontWeight: 500 },
    },
    checkboxActive: { color: "#7599FF !important" },
  })
)
export default function ResearcherRow({ researcher, ...props }) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState(false)

  // const handleChange = (activity, event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked)
  //   handleSelectionChange(activity, event.target.checked)
  // }

  return (
    <Card className={classes.cardMain}>
      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          {/* <CardHeader
            className={classes.activityHeader}
            title={activity.name}
            subheader={
              <Box>
                <Typography variant="subtitle1">{activity.spec?.replace("lamp.", "")}</Typography>
                <Typography variant="body2">{activity.study_name}</Typography>
              </Box>
            }
          /> */}
        </Box>
        <Box>
          <CardActions>
            {/* <UpdateActivity
              activity={activity}
              activities={activities}
              studies={studies}
              setActivities={setActivities}
            />
            <ScheduleActivity activity={activity} setActivities={updateActivities} activities={activities} /> */}
          </CardActions>
        </Box>
      </Box>
    </Card>
  )
}
