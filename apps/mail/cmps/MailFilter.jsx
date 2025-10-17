const { useState } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, isRead } = filterByToEdit

    return (
        <section className="mail-filter container">
            <h2>Filter Mails</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Search</label>
                <input
                    onChange={handleChange}
                    value={txt}
                    name="txt"
                    id="txt"
                    type="text"
                    placeholder="Search by subject or body..."
                />

                <label htmlFor="isRead">Status</label>
                <select
                    onChange={handleChange}
                    value={isRead}
                    name="isRead"
                    id="isRead"
                >
                    <option value="">All Mails</option>
                    <option value="false">Unread</option>
                    <option value="true">Read</option>
                </select>

                <button>Submit</button>
            </form>
        </section>
    )
}