const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {

    const { from, subject, body, isRead, sentAt } = mail
    const mailClass = isRead ? 'mail-preview read' : 'mail-preview unread'

    return (
        <article className={mailClass}>
            <div className="mail-from">From: {from}</div>
            <div className="mail-subject">Subject: {subject}</div>
            {/* <div className="mail-body">{body}</div> */}

            <div className="mail-date">{new Date(sentAt).toLocaleDateString()}</div>
            <div className="mail-button">                    <section>
                <button onClick={() => onRemoveMail(mail.id)}>
                    Remove
                </button>
                <button>
                    <Link to={`/mail/${mail.id}`}>Details</Link>
                </button>
            </section>
            </div>
        </article>
    )
}