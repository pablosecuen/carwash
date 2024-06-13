import {
  googleClientSecret,
  googleEmailUser,
  googleIdClient,
  googleRefreshToken
} from '@/utils/config'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import type { Attachment } from 'nodemailer/lib/mailer'

const OAuth2 = google.auth.OAuth2
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const SERVICE_MAIL = 'gmail'
const AUTH_TYPE = 'OAuth2'

const getToken = async () => {
  const oauth2Client = new OAuth2(googleIdClient, googleClientSecret, REDIRECT_URI)

  oauth2Client.setCredentials({
    refresh_token: googleRefreshToken
  })

  const accessToken = await oauth2Client.getAccessToken()
  if (accessToken.token == null) throw new Error('No access token')
  return accessToken.token
}

const getAccountTransport = async () => {
  return nodemailer.createTransport({
    service: SERVICE_MAIL,
    auth: {
      type: AUTH_TYPE,
      user: googleEmailUser,
      clientId: googleIdClient,
      clientSecret: googleClientSecret,
      refreshToken: googleRefreshToken,
      accessToken: await getToken()
    }
  })
}

export const sendMail = async ({
  emailTitle,
  emailAddress,
  html,
  attachments
}: {
  emailTitle: string
  emailAddress: string
  html: string
  attachments?: Attachment[]
}) => {
  const transporter = await getAccountTransport()
  const mailOptions = {
    from: googleEmailUser,
    to: emailAddress, // al que se mandara el correo
    subject: emailTitle,
    html,
    attachments
  }
  await transporter.sendMail(mailOptions)
}
