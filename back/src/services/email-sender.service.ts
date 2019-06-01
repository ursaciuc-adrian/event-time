import nodemailer from 'nodemailer';

export function sendEmail(to: string, subject: string, content: string): void {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'event.time00@gmail.com',
			pass: 'EventTime123'
		}
	});

	const mailOptions = {
		from: 'no-reply@event-time.com',
		to,
		subject,
		text: content
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}