import './App.css';
import { useState, useEffect } from 'react' 
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'
import { v4 } from 'uuid'

function App() {
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const imageListRef = ref(storage, 'images/')

  useEffect(() => {
    listAll(imageListRef).then(response => {
      response.items.forEach(item => {
        return getDownloadURL(item).then(url => {
          setImageUrls(prev => [...prev, url])
        })
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const uploadFile = () => {
    if(imageUpload === null) return

    setIsLoading(true)

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)

    uploadBytes(imageRef, imageUpload).then(snapshot => {
      return getDownloadURL(snapshot.ref)
    }).then(url => {
      setImageUrls(prev => [...prev, url])
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  if(isLoading) { 
    return <h1>Cargando imagenes...</h1>
  }

  return (
    <div className="App">
      <input type='file' 
        onChange={(e) => setImageUpload(e.target.files[0])}
      />
      <button onClick={uploadFile}>Upload Image</button>

      {imageUrls.map(url => {
        return <img src={url} alt={url}/>
      })}
    </div>
  );
}

export default App;
