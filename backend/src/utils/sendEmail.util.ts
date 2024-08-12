import config from '@config/env.config'
import nodemailer from 'nodemailer'
import logger from './logger'
import Handlebars from 'handlebars'


const { smtpHost, smtpPort, smtpUser, smtpPassword } = config

export const sendMail = async (
    template: {
        id: string,
        name: string,
        body: string,
        subject: string
    },
    userEmail: string,
    link?: string
): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        auth: {
            user: smtpUser,
            pass: smtpPassword
        }
    })
    const compileTemplate = Handlebars.compile(template.body)
    const html = compileTemplate({ userEmail, link })

    let mailOption = {
        from: 'rudra.kandel00@gmail.com',
        to: userEmail,
        subject: template.subject,
        html
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                logger.error("error sending mail")
                reject(error)
            }
            resolve()
            if (info) {
                logger.info("Email sent sucessfully")
            }
        })
    })
}