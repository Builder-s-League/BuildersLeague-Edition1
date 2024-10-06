import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

const ses = new SESv2Client({
  endpoint: 'http://localhost:8005',
  region: 'aws-ses-v2-local',
  credentials: { accessKeyId: 'ANY_STRING', secretAccessKey: 'ANY_STRING' },
})
await ses.send(
  new SendEmailCommand({
    FromEmailAddress: 'sender@example.com',
    Destination: { ToAddresses: ['receiver@example.com'] },
    Content: {
      Simple: {
        Subject: { Data: 'This is the subject' },
        Body: { Text: { Data: 'This is the email contents' } },
      },
    },
  }),
)

export { SendEmailCommand }
