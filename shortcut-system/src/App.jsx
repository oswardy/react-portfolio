import { useState, useEffect } from 'react'
import SideMenu from './SideMenu.jsx'
import AddItem from './AddItem.jsx'
import ItemsCard from './ItemsCard.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'


export default function App() {
  // const [shortcuts, setShortcuts] = useState([]);
  const [shortcuts, setShortcuts] = useState(() => {
  const saved = localStorage.getItem('shortcuts');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentPath, setCurrentPath] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
  }, [shortcuts]);

  let currentItems;
  if(currentPath.length === 0){
    //home
    currentItems = shortcuts.filter(i => i.type === 'folder');
  }else{
    //Inside a folder
    const currentFolder = shortcuts.find(i=>i.id === currentPath[0]);
    currentItems = currentFolder?.items || [];
  }
    
  function handleAdd(newItem){
    if(currentPath.length === 0){
      setShortcuts([...shortcuts, {id: Date.now(), type: 'folder' , name: newItem.name, items: []}]);
    }else{
    
      setShortcuts(shortcuts.map(folder => {
      if (folder.id === currentPath[0]) {
        return { ...folder, items: [...folder.items, { id: Date.now(), type: 'url', name: newItem.name, url: newItem.url }] };
      }
      return folder;
      }));
    }
    setIsOpen(false)
   }

  function handleEdit(newItem){
      //folder edit root 
    if(currentPath.length ===0){
      setShortcuts(shortcuts.map(folder =>{
        if(folder.id === newItem.id){
          return {...folder, name: newItem.name};
        }else{
          return folder;
        }
      }));
    }else{
        //inside folder item edit
        setShortcuts(shortcuts.map(folder=>{
          if(folder.id === currentPath[0]){
            return {...folder, items: folder.items.map( i => {
              if(i.id === newItem.id){
                return {...i, name: newItem.name, url: newItem.url}
              }
              else{
                return i;
              }
            })}
          }else{
            return folder;
          }   
          
        }
      ));
    }
   }

  function requestDelete(itemId){
    setPendingDelete(itemId)
  }

  function handleDelete(){
    if(currentPath.length ===0){
      setShortcuts(shortcuts.filter(item => item.id !== pendingDelete));
    }else{
      setShortcuts(shortcuts.map(folder => {
        if(folder.id === currentPath[0]){
          return {...folder, items: folder.items.filter(i =>i.id !== pendingDelete)};
        }
        return folder;
      }))
    }
    setPendingDelete(null);
  }

  function startEdit(item){
    setEditingItem(item)
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
    setEditingItem(null);
  }
  

  return (
    <div className="container">
      <SideMenu shortcuts={shortcuts} currentPath={currentPath} onSelect={(folderId)=> setCurrentPath([folderId])}/>
      <div className="shortcuts-container">
        <div className="header">
          <Breadcrumbs shortcuts={shortcuts} currentPath={currentPath} onNav={setCurrentPath} />
          <button className="btn-add" onClick={() => setIsOpen(true)}>+ Add</button>
        </div>
        <ItemsCard items={currentItems} 
        onDelete={requestDelete} 
        startEdit ={startEdit}
        onSelect={(folderId)=> setCurrentPath([folderId])}/>
      </div>
        <AddItem isOpen={isOpen} 
          onEdit={handleEdit} editingItem={editingItem} 
          onAdd={handleAdd} onClose={closeModal}
          currentPath={currentPath}/>
        {pendingDelete && (
          <div className="add-modal">
            <div className="modal">
              <p className="delete-confirm">Are you sure you want to delete this item?</p>
              <div className="btn-actions">
                <button className="btn-create" onClick={handleDelete}>Yes</button>
                <button className="btn-cancel" onClick={() => setPendingDelete(null)}>No</button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

