
import transporter
 from "@/app/config/emailConfig";

interface EmailOptions {
    email: string;
    username: string;
    verifyCode: string;
}

export async function sendVerificationEmail({ email, username, verifyCode }: EmailOptions) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Mystery Message Verification Code',
        html: `
            <html>
                <body>
                    <h2>Hello ${username},</h2>
                    <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
                    <h1>${verifyCode}</h1>
                    <p>If you did not request this code, please ignore this email.</p>
                </body>
            </html>
        `,
    };

    try { 
        console.log('Sending email with options:', mailOptions)
       
     const response=   await transporter.sendMail(mailOptions);
     console.log("send mail response if any",response)
        return { success: true, message: 'Verification email sent successfully' };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { success: false, message: 'Failed to send verification email' };
    }
}













