// Core Imports
import React, { useState, useEffect } from "react"
import { Backdrop, CircularProgress, makeStyles, Theme, createStyles } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import LAMP from "lamp-core"
import { useSnackbar } from "notistack"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
)
const demoActivities = {
  "lamp.spatial_span": "boxgame",
  "lamp.cats_and_dogs": "catsndogs",
  "Dot Touch": "dottouch",
  "lamp.jewels_a": "jewelspro",
  "lamp.jewels_b": "jewelspro",
  "lamp.dbt_diary_card": "dbtdiarycard",
  "lamp.balloon_risk": "balloonrisk",
  "lamp.pop_the_bubbles": "popthebubbles",
  "lamp.journal": "journal",
  "lamp.breathe": "breathe",
  "lamp.survey": "survey",
}

export default function EmbeddedActivity({ participant, activity, name, onComplete, ...props }) {
  const classes = useStyles()
  const [embeddedActivity, setEmbeddedActivity] = useState<string>("")
  const [iFrame, setIframe] = useState(null)
  const [settings, setSettings] = useState(null)
  const [activityId, setActivityId] = useState(null)
  const [saved, setSaved] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t, i18n } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    activateEmbeddedActivity(activity)
  }, [])

  useEffect(() => {
    if (iFrame != null) {
      iFrame.onload = function () {
        iFrame.contentWindow.postMessage(settings, "*")
      }
    }
  }, [iFrame])

  useEffect(() => {
    if (activity.spec === "lamp.dbt_diary_card" || activity.spec === "lamp.survey") handleLocalStorage()
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
    var eventer = window[eventMethod]
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message"
    // Listen to message from child window
    eventer(
      messageEvent,
      function (e) {
        if (e.data === null) {
          setSaved(true)
          onComplete()
        } else if (!saved && activityId !== null && activityId !== "") {
          let data = JSON.parse(e.data)
          if (activity.spec === "lamp.survey") {
            onComplete(data.response, data.prefillTimestamp ?? null)
          } else {
            delete data["activity"]
            data["activity"] = activityId
            setData(data)
            setEmbeddedActivity(undefined)
            setSettings(null)
            setActivityId(null)
          }
        }
      },
      false
    )
  }, [activityId])

  const handleLocalStorage = () => {
    try {
      localStorage.setItem(
        "lamp-activity-settings",
        JSON.stringify(activity.spec === "lamp.survey" ? activity : activity.settings)
      )
      localStorage.setItem("lamp-language", i18n.language)
    } catch {
      enqueueSnackbar(t("Encountered an error: "), {
        variant: "error",
      })
      return false
    }
  }

  useEffect(() => {
    if (embeddedActivity === undefined && data !== null && !saved) {
      LAMP.ActivityEvent.create(participant.id, data)
        .catch((e) => {
          console.dir(e)
        })
        .then((x) => {
          setSaved(true)
          onComplete()
        })
    }
  }, [embeddedActivity])

  const activateEmbeddedActivity = async (activity) => {
    setActivityId(activity.id)
    setSaved(false)
    setSettings({ ...settings, activity: activity, configuration: { language: i18n.language } })
    let response = await fetch(
      `https://raw.githubusercontent.com/BIDMCDigitalPsychiatry/LAMP-activities/master/dist/out/${
        demoActivities[activity.spec]
      }.html.b64`
    )
    // let response = await fetch(demoActivities[activity.spec] + ".html.b64")
    setEmbeddedActivity(atob(await response.text()))
    setLoading(false)
  }

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", flexDirection: "column", overflow: "hidden" }}>
      {embeddedActivity !== "" && (
        <iframe
          ref={(e) => {
            setIframe(e)
          }}
          style={{ flexGrow: 1, border: "none", margin: 0, padding: 0 }}
          allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; display-capture; geolocation; gyroscope; magnetometer; microphone; oversized-images; sync-xhr; usb; wake-lock;"
          srcDoc={embeddedActivity}
          sandbox="allow-same-origin allow-scripts"
        />
      )}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
