// resetPasswordEmail.js
import { emailHeader } from './emailHeader';
import { emailFooter } from './emailFooter';
// import { FRONTEND_URL } from '../config';

export default function onboardingReminderEmail(user: { firstName?: string; email: string; }) {
    return `
        ${emailHeader('remainder')} 
            <p>Hi ${user.firstName},</p>
            <p>We noticed that your onboarding process with Copora is still incomplete. If you’re having any trouble providing the necessary information or if you’re unsure about any of the steps, please don’t hesitate to get in touch. We’re here to assist you and make the process as smooth as possible.</p>
            <p>Completing your onboarding is essential for accessing our booking system and viewing available roles, so please reach out if you need any help.</p>
            <p>
                Best regards,
                <br/>
                The Copora Team
            </p>
        ${emailFooter()}    
    `;
}
