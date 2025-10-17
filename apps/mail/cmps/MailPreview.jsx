export function MailPreview({ mail }) {

    const { from, subject, body, isRead, sentAt } = mail
    const mailClass = isRead ? 'mail-preview read' : 'mail-preview unread'

    return (
        <article className={mailClass}>
            <div className="mail-from">From: {from}</div>
            <div className="mail-subject">Subject: {subject}</div>
            {/* <div className="mail-body">{body}</div> */}
            <div className="mail-date">{new Date(sentAt).toLocaleDateString()}</div>
        </article>
    )
}