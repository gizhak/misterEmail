import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState({ txt: '', isRead: '', folder: 'inbox' })
    const [currentFolder, setCurrentFolder] = useState('inbox')

    useEffect(() => {
        setSearchParams(utilService.cleanObject(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get mails!')
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail removed successfully!`)
            })
            .catch(err => {
                console.log('Problem removing mail:', err)
                showErrorMsg('Problem removing mail!')
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function onSelectFolder(folderId) {
        setCurrentFolder(folderId)
        onSetFilterBy({ folder: folderId })
    }

    console.log('MailIndex Render')
    if (!mails) return <div className="loader">Loading...</div>

    return (
        <section className="mail-index">
            <MailFolderList onSelectFolder={onSelectFolder} currentFolder={currentFolder} />
            <div className="mail-main">
                <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                <MailList onRemoveMail={onRemoveMail} mails={mails} />
            </div>
        </section>
    )

}