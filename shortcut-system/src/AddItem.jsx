import {useState, useEffect} from 'react'

export default function AddItem({onAdd,editingItem, currentPath, isOpen, onClose, onEdit}){

    const [name, setName] = useState('');
    const [inputUrl, setInputUrl] = useState('');
    const [err, setErr] = useState('');
    
    let inputUrlText; 
    currentPath.length === 0 ? inputUrlText = 'Folder' : inputUrlText = 'Url';
    //pre-filled if edit
    useEffect (()=>{
        if(editingItem){
            setName(editingItem.name);
            setInputUrl(editingItem.url || '');
        }else{
            setName('');
            setInputUrl('');
        }
        setErr(''); 
    },[isOpen,editingItem])

    function handleSubmit(){
        if (!name.trim()) {
            setErr('Name is required');
            return;
        }
        if (currentPath.length !== 0 && !inputUrl.trim()) {
            setErr('URL is required');
            return;
        }
        if(editingItem){
            onEdit({id: editingItem.id, name: name, url: inputUrl})
        }else{
            onAdd({name:name, url:inputUrl});
        }
        setName('');
        setInputUrl('');
        setErr('');
        onClose();
    }

    function cancelCreate(){
        onClose();
        setErr('');
        setName('');
        setInputUrl('');
    }

    if (!isOpen) return null;
    return(
        <div className="add-modal">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-name">
                        <label>Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)}></input>

                    </div>
                    <div className="modal-text">
                        <label>{inputUrlText}:</label>                       
                        <input type="text" value={inputUrl} disabled={currentPath.length === 0} onChange={e => setInputUrl(e.target.value)}></input>
                    </div>
                    {err && <p className="error">{err}</p>}
                </div>
                <div className="btn-actions">
                    <button className="btn-create" onClick={handleSubmit}>
                        {editingItem ? 'Update':'Create'}
                    </button>
                    <button className="btn-cancel" onClick={cancelCreate}>Cancel</button>
                </div>
            </div>   
        </div>
    )

}