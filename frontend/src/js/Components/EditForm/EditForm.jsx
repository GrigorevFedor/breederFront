// import React, { useState, useEffect } from 'react';
// import './AdForm.scss';
// import InputField from '../UI/input/Input';
// import Button from '../UI/button/Button';
// import SelectInput from '../UI/input/SelectInput';
// import TextArea from '../UI/textarea/TextArea'
// import ImageUploading from 'react-images-uploading';
// import DeleteButton from '../UI/button/DeleteButton';
// import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';
// import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const EditForm = (id) => {
//     // const initialPuppyState = {
//     //     title: '',
//     //     breed: '',
//     //     sexMale: 0,
//     //     sexFemale: 0,
//     //     dateOfBirth: '',
//     //     city: '',
//     //     documents: '',
//     //     price: '',
//     //     isTransportable: '',
//     //     description: '',
//     //     photos: '',
//     //     parentsDesc: '',
//     //     parentsPhotos: '',
//     //     creationDate: new Date().toLocaleDateString()
//     // }
//     const userToken = useSelector(state => state.login.userToken);
//     const [brood, setBrood] = useState('');

//     const [breeds, setBreeds] = useState([]);

//     useEffect(() => {
//         const getBreeds = async () => {
//             try {
//                 await fetch('/api/v2/breeds/')
//                     .then((res) => {
//                         return res.json();
//                     })
//                     .then((data) => {
//                         let pureBreeds = data.records.map(breedName => breedName.name)
//                         setBreeds(pureBreeds);
//                     })
//             } catch (error) {
//                 console.error('Ошибка:', error);
//             }
//         }
//         getBreeds();
//     }, []);

//     useEffect(() => {
//         const getBrood = async () => {
//             try {
//                 await fetch(`/api/v2/announcement/${id}`)
//                     .then((res) => {
//                         return res.json();
//                     })
//                     .then((data) => {
//                         let pureBreeds = data.records.map(breedName => breedName.name)
//                         setBreeds(pureBreeds);
//                     })
//             } catch (error) {
//                 console.error('Ошибка:', error);
//             }
//         }
//         getBreeds();
//     })

//     const [isSuccess, setIsSuccess] = useState(true);

//     const history = useHistory();

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setBrood({ ...brood, [name]: value })
//     };

//     const formatPhotosToPost = (photos) => {
//         return photos.map(photo => {
//             return {
//                 image: photo
//             }
//         })
//     }

//     const [puppyImg, setpuppyImg] = useState([]);
//     const [parentsImg, setparentsImg] = useState([]);

//     const handleFiles = (imageList) => {
//         // data for submit
//         setpuppyImg(imageList);
//         setpuppyParam({ ...puppyParam, photos: imageList.map(({ data_url }) => data_url) })
//     };

//     const handleParentsFiles = (imageList) => {
//         // data for submit
//         setparentsImg(imageList);
//         setpuppyParam({ ...puppyParam, parentsPhotos: imageList.map(({ data_url }) => data_url) })
//     };

//     const clearState = () => {
//         setpuppyParam({ ...initialPuppyState });
//         setpuppyImg('');
//         setparentsImg('')
//     };

//     const [modalOpen, setmodalOpen] = useState(false);


//     const handleClose = () => {
//         setmodalOpen(false);
//     };

//     const modalText = <span>Теперь его можно найти
//         на странице <Link to='/obyavleniya'>"Объявления"</Link> и в личном кабинете</span>

//     const handleSubmit = async e => {
//         e.preventDefault();
//         const data = { ...puppyParam };
//         if (data.documents === 'Есть') {
//             data.documents = true;
//         } else if (data.documents === 'Нет') {
//             data.documents = false;
//         }

//         if (data.isTransportable === 'Да') {
//             data.isTransportable = true;
//         } else if (data.isTransportable === 'Нет') {
//             data.isTransportable = false;
//         }

//         try {
//             await fetch('/api/v2/announcements/', {
//                 method: 'PUT',
//                 body: JSON.stringify({
//                     title: brood.title,
//                     breed: brood.breed,
//                     male_count: parseInt(brood.sexMale),
//                     female_count: parseInt(brood.sexFemale),
//                     birthday: brood.dateOfBirth,
//                     with_documents: brood.documents,
//                     price: parseInt(brood.price),
//                     city: brood.city,
//                     is_transportable: brood.isTransportable,
//                     description: brood.description,
//                     pet_photos: formatPhotosToPost(brood.photos),
//                     parents_description: brood.parentsDesc,
//                     parent_photos: formatPhotosToPost(brood.parentsPhotos),
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json; charset="utf-8"',
//                     'Authorization': userToken.access_token.toString()
//                 }
//             }).then((res) => {
//                 if (res.ok) {
//                     setIsSuccess(true)
//                     setmodalOpen(true)
//                     window.ym(84678121, 'reachGoal', 'new_ob`yva_success')
//                     clearState()
//                     setTimeout(() => history.push('/'), 2000)

//                 } else {
//                     setIsSuccess(false)
//                     setmodalOpen(true)
//                 }
//             });
//         } catch (error) {

//             console.error('Ошибка:', error);
//         }

//     }

//     const ImagesPlaceholder = ({ numberOfPhotos }) => {
//         let placeholders = []
//         for (let i = 0; i < numberOfPhotos; i++) {
//             placeholders.push('./img/image-placeholder.jpg')
//         }
//         return placeholders.map((image, index) => (
//             <div key={ index } className="image-item">
//                 <img src={ image } alt="puppy" width="100" height="100" /></div>))
//     }

//     return (
//         <>
//             <SubmittingModal open={ modalOpen } onClose={ handleClose } title={ isSuccess ? 'Объявление опубликовано' : 'Упс! Что-то пошло не так' } text={ isSuccess ? modalText : 'Попробуйте еще раз' } isLink={ false } onClick={ handleClose } isSubmit={ false } modalClass='modal-small' />
//             <div className="form-container">
//                 <form action="#" method="post" className="ad-container" onSubmit={ (e) => handleSubmit(e) }>
//                     <InputField
//                         label='Название объявления'
//                         type='text'
//                         inputName='title'
//                         placeholder='Введите название объявления'
//                         customClass='card-input'
//                         classNameLabel='card-label'
//                         classNameInput='long-select'
//                         propValue={ brood.title }
//                         onChange={ handleChange }
//                     />
//                     <SelectInput
//                         items={ [...breeds] }
//                         propValue={ brood.breed }
//                         onChange={ handleChange }
//                         inputName={ 'breed' }
//                         customClass='card-input'
//                         customLabel='card-label'
//                         classNameInput='long-select'
//                         placeholder='Не выбрано'
//                         label='Порода'
//                     />
//                     <div className="puppy-sex">
//                         <p className='card-label'>Пол</p>
//                         <SelectInput
//                             label={ <i className="fas fa-mars"></i> }
//                             propValue={ brood.sexMale }
//                             items={ ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] }
//                             inputName={ 'sexMale' }
//                             onChange={ handleChange }
//                             placeholder='00'
//                         />
//                         <SelectInput
//                             label={ <i className="fas fa-venus"></i> }
//                             propValue={ brood.sexFemale }
//                             items={ ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] }
//                             inputName={ 'sexFemale' }
//                             onChange={ handleChange }
//                             placeholder='00'
//                         />
//                     </div>
//                     <InputField
//                         label='Дата рождения'
//                         type='date'
//                         inputName='dateOfBirth'
//                         placeholder='дд.мм.гггг'
//                         customClass='card-input'
//                         classNameLabel='card-label'
//                         classNameInput='long-select'
//                         propValue={ brood.dateOfBirth }
//                         onChange={ handleChange }
//                     />
//                     <span className='form-divider-line'></span>
//                     <InputField
//                         label='Цена, ₽'
//                         type='text'
//                         inputName='price'
//                         placeholder='Введите стоимость щенка'
//                         customClass='card-input'
//                         classNameLabel='card-label'
//                         classNameInput='long-select'
//                         propValue={ brood.price }
//                         onChange={ handleChange }
//                     />
//                     <SelectInput
//                         label='Наличие родословной'
//                         propValue={ brood.documents }
//                         items={ ['Есть', 'Нет'] }
//                         inputName={ 'documents' }
//                         onChange={ e => handleChange(e) }
//                         customClass='card-input'
//                         customLabel='card-label'
//                         classNameInput='long-select'
//                         placeholder='Не выбрано'
//                     />
//                     <span className='form-divider-line'></span>
//                     <SelectInput
//                         label='Местонахождение'
//                         propValue={ brood.city }
//                         items={ ['Москва', 'Московская область'] }
//                         inputName={ 'city' }
//                         onChange={ handleChange }
//                         customClass='card-input'
//                         customLabel='card-label'
//                         classNameInput='long-select'
//                         placeholder='Не выбрано'
//                     />
//                     <SelectInput
//                         label='Возможна отправка в другой город?'
//                         propValue={ brood.isTransportable }
//                         items={ ['Да', 'Нет'] }
//                         inputName={ 'isTransportable' }
//                         onChange={ e => handleChange(e) }
//                         customClass='card-input'
//                         customLabel='card-label'
//                         classNameInput='long-select'
//                         placeholder='Не выбрано'
//                     />
//                     <TextArea
//                         label="Описание"
//                         rows={ 7 }
//                         placeholder='Опишите щенков'
//                         fullWidth={ false }
//                         classNameLabel='card-label'
//                         customClassContainer='textarea-container'
//                         className='textarea-input'
//                         propValue={ brood.description }
//                         inputName={ 'description' }
//                         onChange={ handleChange }
//                         maxLength={ 1000 }
//                         isEditable={ false }
//                     />
//                     <div className='textarea-limit'><span>До 1000 символов</span><span>{ `${puppyParam.description.length} / 1000` }</span></div>

//                     <ImageUploading
//                         multiple
//                         value={ brood.photos }
//                         onChange={ handleFiles }
//                         maxNumber={ 5 }
//                         dataURLKey="data_url"
//                     >
//                         { ({
//                             imageList,
//                             onImageUpload,
//                             onImageRemoveAll,
//                             onImageUpdate,
//                             onImageRemove,
//                             isDragging,
//                             dragProps,
//                         }) => (
//                             // write your building UI
//                             <div className='photos-wrapper'>
//                                 <p className='card-label'>Фотографии щенков</p>
//                                 <div className="upload-container">
//                                     <div className='btn-wrpapper'>
//                                         <Button
//                                             isLink={ false }
//                                             btnClass='sec-outlined-btn img-btn'
//                                             text='Загрузить фотографии'
//                                             type='button'
//                                             onClick={ onImageUpload }
//                                             { ...dragProps }
//                                         />
//                                         <span>Выберите до пяти изображений</span>
//                                     </div>
//                                     <div className="puppy-img-container">
//                                         { imageList.length > 0
//                                             ? imageList.map((image, index) => (
//                                                 <div key={ index } className="image-item">
//                                                     <img src={ image['data_url'] } alt="puppy" width="100" height="100" />
//                                                     <div className="image-item__btn-wrapper">
//                                                         <Button
//                                                             onClick={ () => onImageUpdate(index) }
//                                                             isLink={ false }
//                                                             type='button'
//                                                             btnClass='hide-button'
//                                                         />
//                                                         <DeleteButton
//                                                             onClick={ () => onImageRemove(index) }
//                                                         />

//                                                     </div>
//                                                 </div>
//                                             ))
//                                             : <ImagesPlaceholder numberOfPhotos={ 5 } />
//                                         }
//                                     </div>
//                                 </div>
//                             </div>
//                         ) }
//                     </ImageUploading>

//                     <span className='form-divider-line'></span>

//                     <TextArea
//                         label="Родители щенков"
//                         rows={ 7 }
//                         placeholder='Опишите родителей щенка'
//                         fullWidth={ false }
//                         classNameLabel='card-label'
//                         customClassContainer='textarea-container'
//                         className='textarea-input'
//                         propValue={ brood.parentsDesc }
//                         inputName={ 'parentsDesc' }
//                         onChange={ handleChange }
//                         maxLength={ 500 }
//                         isEditable={ false }
//                     />
//                     <div className='textarea-limit'><span>До 500 символов</span><span>{ `${brood.parentsDesc.length} / 500` }</span></div>

//                     <ImageUploading
//                         multiple
//                         value={ parentsImg }
//                         onChange={ handleParentsFiles }
//                         maxNumber={ 2 }
//                         dataURLKey="data_url"
//                     >
//                         { ({
//                             imageList,
//                             onImageUpload,
//                             onImageRemoveAll,
//                             onImageUpdate,
//                             onImageRemove,
//                             isDragging,
//                             dragProps,
//                         }) => (
//                             // write your building UI
//                             <div className='photos-wrapper'>
//                                 <p className='card-label'>Фотографии родителей</p>
//                                 <div className="upload-container">
//                                     <div className='btn-wrpapper'>
//                                         <Button
//                                             isLink={ false }
//                                             btnClass='sec-outlined-btn img-btn'
//                                             text='Загрузить фотографии'
//                                             type='button'
//                                             onClick={ onImageUpload }
//                                             { ...dragProps }
//                                         />
//                                         <span>Выберите до двух изображений</span>
//                                     </div>
//                                     <div className="puppy-img-container">
//                                         { imageList.length > 0
//                                             ? imageList.map((image, index) => (
//                                                 <div key={ index } className="image-item">
//                                                     <img src={ image['data_url'] } alt="puppy" width="100" height="100" />
//                                                     <div className="image-item__btn-wrapper">
//                                                         <Button
//                                                             onClick={ () => onImageUpdate(index) }
//                                                             isLink={ false }
//                                                             type='button'
//                                                             btnClass='hide-button'
//                                                         />
//                                                         <DeleteButton
//                                                             onClick={ () => onImageRemove(index) }
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             ))
//                                             : <ImagesPlaceholder numberOfPhotos={ 2 } />
//                                         }
//                                     </div>
//                                 </div>
//                             </div>
//                         ) }
//                     </ImageUploading>

//                     <Button
//                         isLink={ false }
//                         type='submit'
//                         btnClass='pr-filled-btn add-form-submit-btn'
//                         text='Сохранить изменения'
//                     />
//                 </form>
//             </div>
//         </>
//     )
// }

// export default EditForm;