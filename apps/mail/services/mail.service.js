import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const { loadFromStorage, makeId, saveToStorage } = utilService

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }
            if (filterBy.isRead !== '' && filterBy.isRead !== null && filterBy.isRead !== undefined) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(_setNextPrevMailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(from = '', to = '', subject = '', body = '') {
    return { from, to, subject, body }
}

function getDefaultFilter() {
    return { txt: '', isRead: '' }
}

function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'),
            _createMail('gal@gmail.com', 'user@appsus.com', 'Lets go shopping', 'Lets go shopping this weekend'),
            _createMail('momo@momo.com', 'user@appsus.com', 'To my bestie', 'Best wishes!'),
            _createMail('oldi@man.com', 'user@appsus.com', 'Hey there honey', 'Hey there honey, how are you?'),
            _createMail('gal@momo.com', 'user@appsus.com', 'My dog died', 'Very sad news...')
        ]
        saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(from, to, subject, body) {
    const mail = getEmptyMail(from, to, subject, body)
    mail.id = makeId()
    mail.createdAt = Date.now()
    mail.sentAt = Date.now()
    mail.isRead = false
    mail.removedAt = null
    return mail
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const isRead = searchParams.get('isRead') || ''
    return {
        txt,
        isRead
    }
}

function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}