import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail }) {

    if (!mails.length) return <div>No Mails To Show...</div>

    const attrs = {
        className: 'mail-list container'
    }

    return (
        <ul {...attrs}>
            {mails.map(mail => (
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    <section>
                        <button onClick={() => onRemoveMail(mail.id)}>
                            Remove
                        </button>
                        <button>
                            Details
                        </button>
                    </section>
                </li>
            ))}
        </ul>
    )

}