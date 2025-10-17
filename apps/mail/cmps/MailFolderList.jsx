

const { useState } = React

export function MailFolderList({ onSelectFolder, currentFolder }) {

    const folders = [
        { id: 'inbox', label: 'Inbox', icon: '📥' },
        { id: 'sent', label: 'Sent', icon: '📤' },
        { id: 'drafts', label: 'Drafts', icon: '📝' },
        { id: 'trash', label: 'Trash', icon: '🗑️' }
    ]

    return (
        <aside className="mail-folder-list">
            <h3>Folders</h3>
            {folders.map(folder => (
                <button
                    key={folder.id}
                    className={`folder-item ${currentFolder === folder.id ? 'active' : ''}`}
                    onClick={() => onSelectFolder(folder.id)}
                >
                    <span className="folder-icon">{folder.icon}</span>
                    <span className="folder-label">{folder.label}</span>
                </button>
            ))}
        </aside>
    )
}