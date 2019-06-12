const fetch = require('node-fetch');

export const notifySlack = (release: any) => {
  const payload = {
    "text": `A security goals audit for ${process.env.APP_NAME} has failed (${release.passing} out of ${release.total} passed)!`,
    "attachments":[
      {
        "fallback":`You are unable to choose an action`,
        "text":`Choose an action`,
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
          {
              "name": "action",
              "text": "View report",
              "type": "button",
              "url": `${process.env.WEB_REPORT_URL}singlerelease/${release.release}`
          },
          {
              "name": "action",
              "text": "Download PDF",
              "type": "button",
              "url": `${process.env.PDF_REPORT_URL}${release.release}`
          },
          {
            "name": "action",
            "text": "Start incident response",
            "type": "button",
            "value": "escalate",
            "style": "danger",
            "confirm": {
              "title": "Are you sure?",
              "text": "Make sure you this is not a fluke.",
              "ok_text": "Yes",
              "dismiss_text": "No"
            }
          }
        ]
      }
    ]
  };

  fetch(process.env.SLACK_WEBHOOK, {
    method: 'post',
    body:    JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  })
}