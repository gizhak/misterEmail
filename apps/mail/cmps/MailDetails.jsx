import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        setIsLoading(true)
        mailService.get(mailId)
            .then(mail => {
                setMail(mail)
                // Mark as read when viewed
                mail.isRead = true
                mailService.save(mail)
            })
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }

    function onBack() {
        navigate('/mail')
    }

    if (isLoading) return <div className="loader">Loading...</div>
    if (!mail) return <div className="loader">No mail found...</div>

    const { subject, body, from, to, sentAt } = mail

    return (
        <section className="mail-details container">
            <button onClick={onBack}>← Back to Inbox</button>

            <div className="mail-header">
                <h1 className="subject">{subject}</h1>
                <div className="meta">
                    <div><strong>From:</strong> {from}</div>
                    <div><strong>To:</strong> {to}</div>
                    <div><strong>Date:</strong> {new Date(sentAt).toLocaleString()}</div>
                </div>
            </div>

            <div className="mail-body">
                {body}
            </div>

            <section className="mail-navigation">
                {mail.prevMailId && (
                    <button>
                        <Link to={`/mail/${mail.prevMailId}`}>← Previous Mail</Link>
                    </button>
                )}
                {mail.nextMailId && (
                    <button>
                        <Link to={`/mail/${mail.nextMailId}`}>Next Mail →</Link>
                    </button>
                )}
            </section>
        </section>
    )
}