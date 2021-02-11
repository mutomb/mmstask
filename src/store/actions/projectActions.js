import moment from 'moment';
export const createProject = (project) => {
  
  return (dispatch, getState, {getFirebase}) =>{
      const firestore = getFirebase().firestore() 
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      const storage = getFirebase().storage();
      const images= project.images;
      const createdAt= moment(new Date()).format('DD-MM-YYYY');
      //single image per upload => hence image[0]
      firestore.collection('projects').add({
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: createdAt
        }).then((project)=>{
            const imageUploadTask = storage.ref(`ponds/${createdAt}/${project.id}/${images[0].name}`).put(images[0]);
            imageUploadTask.on('state_changed', 
            (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              console.log(progress);
            }, 
            (error) => {
              console.log(error);
              dispatch({ type: 'CREATE_PROJECT_ERROR' },error)
            }, 
            () => {
                storage.ref(`ponds/${createdAt}/${project.id}/`)
                      .child(images[0].name).getDownloadURL().then(url => {
                    dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
                })
          });

        }).catch(err => dispatch({ type: 'CREATE_PROJECT_ERROR' }, err))

  }  
}
