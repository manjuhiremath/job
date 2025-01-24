import Reminder from "../models/Reminder.js";
import {CronJob } from 'cron';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: "chandrasekharkarampudi123@gmail.com", 
      pass: "ndyn ezrj mplz qzps",
    },
  });
  
  const sendEmail = (to, subject, text) => {
    const mailOptions = {
      from: 'chandrasekharkarampudi123@gmail.com',
      to,
      subject,
      text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
  
  const getCronExpression = (dateString) => {
    const dt = new Date(dateString); 
    const minute = dt.getMinutes();
    const hour = dt.getHours();
    const day = dt.getDate();
    const month = dt.getMonth() + 1; 
    return `${minute} ${hour} ${day} ${month} *`;
  };
  
  export const createReminder = async (req, res) => {
    try {
      const { email, sendAt, message } = req.body;
  
      if (!sendAt || isNaN(new Date(sendAt).getTime())) {
        return res.status(400).json({ error: 'Invalid date' });
      }
  
      const reminder = await Reminder.create({ email, sendAt, message });
  
      const cronExpression = getCronExpression(sendAt);
      console.log(cronExpression)
  
      const job = new CronJob(cronExpression, () => {
        sendEmail(email, 'Reminder', message);
      });
  
      job.start();
      console.log(`Scheduled reminder for ${sendAt}`);
  
      res.status(201).json(reminder);
    } catch (error) {
      console.error('Error creating reminder:', error);
      res.status(500).json({ error: 'Failed to create reminder' });
    }
  };


