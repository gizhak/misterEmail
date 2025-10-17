
import { mailService } from "../services/mail.service"

const { useState, useEffect } = React


export function MailIndex() {

    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
    }

    return <section className="container">Mail app</section>
}

