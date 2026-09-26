
export default function Breadcrumbs({shortcuts, currentPath, onNav}){
    const folder = shortcuts.find(i => i.id === currentPath[0]);
    const title = currentPath.length === 0 ? "Shortcut System" : folder.name;

    if(currentPath.length === 0){
        return(
            <div className="header-item">
                <div className="breadcrumbs">
                    <span>Home</span>
                </div>
                <div className="btn-title">
                    <span className="title">Shortcut System</span>
                </div>
            </div>
        )
    }


    return(
        <div className="header-item">
            <div className="breadcrumbs">
                <span className="crumb" onClick={() => onNav([])}>Home</span>
                <span className="separator">/</span>
                <span className="crumb">{folder.name}</span>
            </div>
            
            <div className="display-title">
                <span className="btn-back" onClick={() => onNav([])}>←</span>
                <span className="title">{title}</span>
            </div>
        </div>
        
    )
    
}