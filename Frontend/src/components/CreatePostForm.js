import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useToast } from '@chakra-ui/react';

import axios from 'axios';
export default function CreatePostForm ({ onClose, handleModalChange }) {
  const toast = useToast();
  const [form, setState] = useState({
    brand: '--Select A Brand--',
    model: '--Select A Model--',
    title: '',
    description: '',
    year: '',
    price: '',
    contact: '',
    brands: Object.keys({
      Chevrolet: [
        'Aveo',
        'Beat',
        'Captiva',
        'Cruze',
        'Enjoy',
        'Optra',
        'Sail',
        'Spark',
        'Tavera',
      ],
      Ford: [
        'Aspire',
        'EcoSport',
        'Endeavour',
        'Fiesta',
        'Figo',
        'Freestyle',
        'Fusion',
        'Ikon',
      ],
      Honda: [
        'Accord',
        'Amaze',
        'BR-V',
        'Brio',
        'CR-V',
        'City',
        'Civic',
        'Jazz',
        'Mobilio',
        'WR-V',
      ],
      Hyundai: [
        'Accent',
        'Creta',
        'Elantra',
        'Elite i20',
        'Eon',
        'Getz',
        'Grand i10',
        'Santa Fe',
        'Santro',
        'Sonata',
        'Tucson',
        'Venue',
        'Verna',
        'Xcent',
        'i10',
        'i20',
        'i20 active',
      ],
      Mahindra: [
        'Alturas',
        'Bolero',
        'Imperio',
        'Jeep',
        'KUV',
        'Marazzo',
        'NuvoSport',
        'Quanto',
        'Scorpio',
        'Supro',
        'TUV 300',
        'Thar',
        'Verito',
        'XUV300',
        'XUV500',
        'Xylo',
      ],
      Maruti: [
        '800',
        'A-Star',
        'Alto',
        'Baleno',
        'Brezza',
        'Celerio',
        'Ciaz',
        'Eeco',
        'Ertiga',
        'Esteem',
        'Estilo',
        'Gypsy',
        'Ignis',
        'Omni',
        'Ritz',
        'S-Cross',
        'S-Presso',
        'SX4',
        'Swift',
        'Swift Dzire',
        'Wagon R',
        'Zen',
      ],
      Renault: [
        'Captur',
        'Duster',
        'Fluence',
        'Koleos',
        'Kwid',
        'Lodgy',
        'Pulse',
        'Scala',
        'Triber',
      ],
      Tata: [
        'Altroz',
        'Aria',
        'Bolt',
        'Harrier',
        'Hexa',
        'Indica',
        'Indica Vista',
        'Indigo',
        'Manza',
        'Nano',
        'Nexon',
        'Safari',
        'Sumo',
        'Tiago',
        'Tigor',
        'Venture',
        'Winger',
        'Zest',
      ],
      Toyota: [
        'Camry',
        'Corolla',
        'Etios',
        'Fortuner',
        'Innova',
        'Qualis',
        'Yaris',
      ],
      Volkswagen: ['Ameo', 'Jetta', 'Passat', 'Polo', 'Vento'],
    }),
    dict: {
      Chevrolet: [
        'Aveo',
        'Beat',
        'Captiva',
        'Cruze',
        'Enjoy',
        'Optra',
        'Sail',
        'Spark',
        'Tavera',
      ],
      Ford: [
        'Aspire',
        'EcoSport',
        'Endeavour',
        'Fiesta',
        'Figo',
        'Freestyle',
        'Fusion',
        'Ikon',
      ],
      Honda: [
        'Accord',
        'Amaze',
        'BR-V',
        'Brio',
        'CR-V',
        'City',
        'Civic',
        'Jazz',
        'Mobilio',
        'WR-V',
      ],
      Hyundai: [
        'Accent',
        'Creta',
        'Elantra',
        'Elite i20',
        'Eon',
        'Getz',
        'Grand i10',
        'Santa Fe',
        'Santro',
        'Sonata',
        'Tucson',
        'Venue',
        'Verna',
        'Xcent',
        'i10',
        'i20',
        'i20 active',
      ],
      Mahindra: [
        'Alturas',
        'Bolero',
        'Imperio',
        'Jeep',
        'KUV',
        'Marazzo',
        'NuvoSport',
        'Quanto',
        'Scorpio',
        'Supro',
        'TUV 300',
        'Thar',
        'Verito',
        'XUV300',
        'XUV500',
        'Xylo',
      ],
      Maruti: [
        '800',
        'A-Star',
        'Alto',
        'Baleno',
        'Brezza',
        'Celerio',
        'Ciaz',
        'Eeco',
        'Ertiga',
        'Esteem',
        'Estilo',
        'Gypsy',
        'Ignis',
        'Omni',
        'Ritz',
        'S-Cross',
        'S-Presso',
        'SX4',
        'Swift',
        'Swift Dzire',
        'Wagon R',
        'Zen',
      ],
      Renault: [
        'Captur',
        'Duster',
        'Fluence',
        'Koleos',
        'Kwid',
        'Lodgy',
        'Pulse',
        'Scala',
        'Triber',
      ],
      Tata: [
        'Altroz',
        'Aria',
        'Bolt',
        'Harrier',
        'Hexa',
        'Indica',
        'Indica Vista',
        'Indigo',
        'Manza',
        'Nano',
        'Nexon',
        'Safari',
        'Sumo',
        'Tiago',
        'Tigor',
        'Venture',
        'Winger',
        'Zest',
      ],
      Toyota: [
        'Camry',
        'Corolla',
        'Etios',
        'Fortuner',
        'Innova',
        'Qualis',
        'Yaris',
      ],
      Volkswagen: ['Ameo', 'Jetta', 'Passat', 'Polo', 'Vento'],
    },
    models: [],
    kms: 0,
    check: true,
    submit: true,
    output: '',
    image: [],
  });

  const handleBrandChange = e => {
    setState(prevState => ({
      ...prevState,
      brand: e,
      check: false,
      models: form.dict[e],
    }));
  };

  const handleModelChange = e => {
    setState(prevState => ({
      ...prevState,
      model: e,
    }));
  };

  const handleKmChange = e => {
    setState(prevState => ({
      ...prevState,
      kms: e.target.value,
    }));
  };

  const handleTitleChange = e => {
    setState(prevState => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleDescription = e => {
    setState(prevState => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const handleYearChange = e => {
    setState(prevState => ({
      ...prevState,
      year: e.target.value,
    }));
  };

  const hanldePriceChange = e => {
    setState(prevState => ({
      ...prevState,
      price: e.target.value,
    }));
  };

  const handleContact = e => {
    setState(prevState => ({
      ...prevState,
      contact: e.target.value,
    }));
  };

  const convertToBase64 = (file, callback) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      callback(null, fileReader.result);
    };
    fileReader.onerror = error => {
      callback(error, null);
    };
  };

  const handleImageChange = e => {
    const file = e.target.files;
    var imageArray = ''
    for(let i=0; i<Object.keys(file).length; i++){
      // eslint-disable-next-line no-loop-func
      convertToBase64(file[i], (error, result) => {
        if (error) {
          toast({
            title: 'Cannot upload image at the moment try later.',
            position: 'top-right',
            status: 'error',
            isClosable: true,
          });
        } else {
          if(i === 0){
            imageArray = imageArray + result
          }
          else{
            imageArray = imageArray + ' ' + result
          }
          setState(prevState => ({
            ...prevState,
            image: imageArray,
          }));
          console.log(imageArray)
        }
      });

    }
  };

  const clear = e => {
    setState(prevState => ({
      ...prevState,
      output: '',
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let fields = {
      carModel: form.model,
      carMake: form.brand,
      carMileage: form.kms,
      title: form.title,
      description: form.description,
      carYear: form.year,
      price: form.price,
      dateCreated: new Date(),
      contact: form.contact,
      user: sessionStorage.getItem('emailId'),
      location: 'United States Of America',
      status: 'available',
      image: form.image.length > 0 ? form.image : 'data:image/jpeg;base64,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',
    };
    axios
      .post('http://0.0.0.0:8000/createPost', fields)
      .then(
        response => {
          onClose();
          handleModalChange();
          toast({
            title: 'Post has been created',
            position: 'top-right',
            status: 'success',
            isClosable: true,
          });
        },
        error => {
          toast({
            title: 'Something seems to be wrong.',
            position: 'top-right',
            status: 'error',
            isClosable: true,
          });
        }
      );
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div
          className='card  align-self-center mx-auto'
          style={{ width: '450px', height: '600px' }}
        >
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-12'>
                    <div className='form-group'>
                      <h5>Title</h5>
                      <input
                        type='text'
                        className='form-control'
                        onChange={handleTitleChange}
                        placeholder='Enter A Title'
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <div className='form-group'>
                      <h5>Description</h5>
                      <input
                        type='text'
                        className='form-control'
                        onChange={handleDescription}
                        placeholder='Enter Description'
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <DropdownButton
                      alignRight
                      title={form.brand}
                      id='dropdown-menu-align-right'
                      onSelect={handleBrandChange}
                      style={{ color: 'black' }}
                    >
                      {form.brands.map(keys => {
                        return (
                          <Dropdown.Item eventKey={keys}>{keys}</Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </div>
                </div>
                <div className='row' style={{ 'margin-top': '15px' }}>
                  <div className='col-12'>
                    <DropdownButton
                      alignRight
                      title={form.model}
                      id='dropdown-menu-align-right'
                      onSelect={handleModelChange}
                      disabled={form.check}
                    >
                      {form.brand !== '--Select A Brand--'
                        ? form.models.map(values => {
                            return (
                              <Dropdown.Item eventKey={values}>
                                {values}
                              </Dropdown.Item>
                            );
                          })
                        : null}
                    </DropdownButton>
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <div className='row'>
                  <div className='col-6'>
                    <div className='form-group'>
                      <h5>Kilometers Driven</h5>
                      <input
                        type='number'
                        className='form-control'
                        onChange={handleKmChange}
                        placeholder='Kms'
                        required
                      />
                    </div>
                  </div>
                  <div className='col-6'>
                    <h5>Year</h5>
                    <input
                      type='number'
                      placeholder='YYYY'
                      min='1980'
                      max='2023'
                      className='form-control'
                      onChange={handleYearChange}
                    />
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div className='row' style={{ 'margin-top': '-25px' }}>
                  <div className='col-6'>
                    <h5>Price</h5>
                    <input
                      type='number'
                      className='form-control'
                      onChange={hanldePriceChange}
                      placeholder='Price'
                      required
                    />
                  </div>
                  <div className='col-6'>
                    <h5>Contact</h5>
                    <input
                      type='number'
                      className='form-control'
                      onChange={handleContact}
                      placeholder='xxxxxxxxxx'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-6'>
                    <input
                      type='file'
                      id='avatar'
                      name='avatar'
                      accept='image/png, image/jpeg'
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className='row justify-content-center'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  data-toggle='modal'
                  data-target='#exampleModalCenter'
                  disabled={
                    form.brand === '--Select A Brand--' ||
                    form.model === '--Select A Model--' ||
                    form.kms === 0
                  }
                >
                  Create Post
                </button>
              </div>

              <br />

              <div
                className='modal fade'
                id='exampleModalCenter'
                tabindex='-1'
                role='dialog'
                aria-labelledby='exampleModalCenterTitle'
                aria-hidden='true'
              >
                <div
                  className='modal-dialog modal-dialog-centered'
                  role='document'
                >
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 class='modal-title' id='exampleModalCenterTitle'>
                        Estimated Price
                      </h5>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                        aria-label='Close'
                        onClick={form.clear}
                      >
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </div>
                    <div class='modal-body'>
                      {form.output.length === 0 ? (
                        <div className='text-center'>
                          <div className='spinner-border' role='status'>
                            <span className='sr-only'>Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <div>{form.output}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
