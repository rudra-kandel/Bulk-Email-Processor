import config from '@config/env.config'
import nodemailer from 'nodemailer'
import logger from './logger'
import Handlebars from 'handlebars'


const { smtpHost, smtpPort, smtpUser, smtpPassword } = config

export const sendMail = (template: { id: string, name: string, body: string, subject: string }, userEmail: string, link?: string) => {
    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        auth: {
            user: smtpUser,
            pass: smtpPassword
        }
    })
    const compileTemplate = Handlebars.compile(template.body)
    console.log(userEmail)
    console.log(link)
    const html = compileTemplate({ userEmail, link })

    console.log(html)
    let mailOption = {
        from: 'rudra.kandel00@gmail.com',
        to: userEmail,
        subject: template.subject,
        html
    }

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            logger.error("error sending mail"
            )
        }
        if (info) {
            logger.info("Email sent sucessfully")
        }
    })
}