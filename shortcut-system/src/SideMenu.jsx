
export default function SideMenu({shortcuts, onSelect, currentPath}){
    
    const folders = shortcuts.map(folder => {
        const isActive = currentPath[0] === folder.id;
        return (
            <div className={`side-menu-item ${isActive? 'active': ''}`} key={folder.id} onClick={()=> onSelect(folder.id)}>
                <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                    </svg>
                </span>
                <span>{folder.name}</span>
            </div>
        )
    })

    return(
        <div className="side-menu">
            {folders}
        </div>

    )
}