import React, { useEffect, useState } from 'react';
import '../../App.css';
import api from '../../api';

export default function Galery(props){
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [imgInfo, setImgInfo] = useState([]);
    const [cards1, setCards1] = useState([]);
    const [cards2, setCards2] = useState([]);
    const [filterPage, setFilterPage] = useState(1);
    const [totalFilterPages, setTotalFilterPages] = useState(0);
    const [filterImgInfo, setFilterImgInfo] = useState([]);
    const [filterCards1, setFilterCards1] = useState([]);
    const [filterCards2, setFilterCards2] = useState([]);
    const [galerySelected, setGalerySelected] = useState(true);
    const [filterType, setFilterType] = useState('category');
    const [filterValue, setFilterValue] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [breedList, setBreedList] = useState([]);
    const [trigger, setTrigger] = useState();

    const handleFilterTypeChange = e => {
      setFilterType(e.target.value);
      setFilterValue('');
    }

    const handleFilterValueChange = e => {
      setFilterValue(e.target.value);
    }

    const getFilters = async () => {
      let categories = [];
      let breeds = [];

      let url = process.env.REACT_APP_API_URL + '/categories';
      const categoriesResult  = await api.get(url);

      url = process.env.REACT_APP_API_URL + '/breeds';
      const breedsResult  = await api.get(url);

      for(let i=0; i<categoriesResult.data.result.length; i++){
        categories.push(
          <option value={categoriesResult.data.result[i].name}>{categoriesResult.data.result[i].name}</option>
        )
      }

      for(let i=0; i<breedsResult.data.result.length; i++){
        breeds.push(
          <option value={breedsResult.data.result[i].breed_id}>{breedsResult.data.result[i].name}</option>
        )
      }
      setFilterValue(categoriesResult.data.result[0].name);

      setCategoryList(categories);
      setBreedList(breeds);
  }

    useEffect(()=>{
     getFilters();
    },[])

    useEffect(() => {
      let url = process.env.REACT_APP_API_URL + '/images/page/' + page;
      api.get(url)
      .then(res => {
        let numberOfPages = Math.ceil(res.data.row_count/6); 
        setTotalPages(numberOfPages);
        setImgInfo(res.data.result);
      })
      .catch(err => {
        console.log(err);
      })
    },[page])

    useEffect(() => {
      let url = process.env.REACT_APP_API_URL + '/images/page/' + page;
      api.get(url)
      .then(res => {
        let numberOfPages = Math.ceil(res.data.row_count/6); 
        setTotalPages(numberOfPages);
        setImgInfo(res.data.result);
      })
      .catch(err => {
        console.log(err);
      })
    },[page])

    useEffect(()=>{
      let cardsRow1 = [];
      let cardsRow2 = [];

      if(imgInfo){
        for(let i=0; i<imgInfo.length; i++){
          let url = imgInfo[i].url;
    
          if(i<3){
            cardsRow1.push(
              <div style={{width:'30%', height:'75%', alignItems:'center', justifyItems:'center', display:'flex'}}>
                <a href={url} target="_blank" rel='noreferrer' style={{width:'100%', height:'100%'}}>
                  <img src={url} alt='' style={{width:'100%', height:'100%'}}/>
                </a>
              </div>
            )
          }
          else{
            cardsRow2.push(
              <div style={{width:'30%', height:'75%', alignItems:'center', justifyItems:'center', display:'flex'}}>
                <a href={url} target="_blank" rel='noreferrer' style={{width:'100%', height:'100%'}}>
                  <img src={url} alt='' style={{width:'100%', height:'100%'}}/>
                </a>
              </div>
            )
          }
        }
        setCards1(cardsRow1);
        setCards2(cardsRow2);
      }
    }, [imgInfo])

    useEffect(() => {
      if(galerySelected===false){
        if(filterType!=='' & filterValue!==''){
          console.log('inside')
          console.log(filterValue)
          let url = process.env.REACT_APP_API_URL + '/images/' + filterType + '/' + filterValue + '/' + filterPage;
          api.get(url)
          .then(res => {
            let numberOfPages = Math.ceil(res.data.row_count/6); 
            setTotalFilterPages(numberOfPages);
            setFilterImgInfo(res.data.result);
          })
          .catch(err => {
            console.log(err);
          })
        }
        else{
          let url = process.env.REACT_APP_API_URL + '/images/page/' + filterPage;
          api.get(url)
          .then(res => {
            let numberOfPages = Math.ceil(res.data.row_count/6); 
            setTotalFilterPages(numberOfPages);
            setFilterImgInfo(res.data.result);
          })
          .catch(err => {
            console.log(err);
          })
        }
      }
    },[galerySelected, filterPage, trigger])

    useEffect(()=>{
      if(filterImgInfo.length>0){
        let cardsRow1 = [];
        let cardsRow2 = [];
  
        if(filterImgInfo){
          for(let i=0; i<filterImgInfo.length; i++){
            let url = filterImgInfo[i].url;
      
            if(i<3){
              cardsRow1.push(
                <div style={{width:'30%', height:'75%', alignItems:'center', justifyItems:'center', display:'flex'}}>
                  <a href={url} target="_blank" rel='noreferrer' style={{width:'100%', height:'100%'}}>
                    <img src={url} alt='' style={{width:'100%', height:'100%'}}/>
                  </a>
                </div>
              )
            }
            else{
              cardsRow2.push(
                <div style={{width:'30%', height:'75%', alignItems:'center', justifyItems:'center', display:'flex'}}>
                  <a href={url} target="_blank" rel='noreferrer' style={{width:'100%', height:'100%'}}>
                    <img src={url} alt='' style={{width:'100%', height:'100%'}}/>
                  </a>
                </div>
              )
            }
          }
          setFilterCards1(cardsRow1);
          setFilterCards2(cardsRow2);
        }
      }
    }, [filterImgInfo])

    return(
      <div className='galery-container'>

        <div style={{display:'flex', padding:'10px', width:'100%', justifyContent:'space-around'}}>
          <h1 style={{textAlign:'center', lineHeight:'100px'}}>Cat Galery</h1>
          <div style={{alignItems:'center', justifyContent:'center'}}>
            <img src='/githubicon.svg' alt='' width='130px'/>
            <p style={{textAlign:'center'}}>GitHub</p>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', backgroundColor:'lightslategrey', width:'100%'}}>

          {galerySelected ?
            <div className='tab-container'>
              <p className='selected-tab' onClick={() => {setGalerySelected(true)}}>Galery</p>
              <p className='tab' onClick={() => {setGalerySelected(false)}}>Filter</p> 
            </div>
          : 
            <div className='tab-container'>
              <p className='tab' onClick={() => {setGalerySelected(true)}}>Galery</p>
              <p className='selected-tab' onClick={() => {setGalerySelected(false)}}>Filter</p> 
          </div>
          
          }

          {galerySelected ? 
            <div className='row-container'>
              <div className='upper-row'>
                {cards1}
              </div>
              <div className='lower-row'>
                {cards2}
              </div>
            </div>
          :
            <div style={{display:'flex'}}>
              <div className='row-container-filter'>
                <div className='upper-row'>
                  {filterCards1}
                </div>
                <div className='lower-row'>
                  {filterCards2}
                </div>
              </div>

              <div className='filter-container'>
                
                <select className='selector' name="filterType" id="filterType" onChange={handleFilterTypeChange}>
                  <option value="category">Category</option>
                  <option value="breed">Breed</option>
                </select>

                {filterType==='category' && 
                  <select className='selector' name="filterValue" id="filterValue" onChange={handleFilterValueChange}>
                    {categoryList}
                  </select>
                }

                {filterType==='breed' && 
                  <select className='selector' name="filterValue" id="filterValue" onChange={handleFilterValueChange}>
                    {breedList}
                  </select>
                }
                <button className='filter-button' onClick={() => {setTrigger(!trigger)}}>Filter</button>
              </div>
            </div>
          }

        </div>

        {galerySelected ?
          <div className='page-button-container'>
            {page > 1 &&
              <button className='page-button' onClick={()=>{setPage(page-1)}}>Previous</button>
            }
            {page > 1 &&
              <button className='page-button'onClick={()=>{setPage(page-1)}}>{page-1}</button>
            }
            <button className='page-button' style={{backgroundColor:'lightcyan'}} onClick={()=>{setPage(page)}}>{page}</button>
            {page+1 <= totalPages &&
              <button className='page-button' onClick={()=>{setPage(page+1)}}>{page+1}</button>
            }
            {page+2 <= totalPages &&
              <p style={{padding:'0px 5px', marginRight:'5px', marginTop:'0px', marginBottom:'0px'}}>...</p>
            }
            {page+2 <= totalPages &&
              <button className='page-button' onClick={()=>{setPage(totalPages)}}>{totalPages}</button>
            }
            {page+1 < totalPages &&
              <button className='page-button' onClick={()=>{setPage(page+1)}}>Next</button>
            }
          </div>
        :
          <div className='page-button-container'>
            {filterPage > 1 &&
              <button className='page-button' onClick={()=>{setFilterPage(filterPage-1)}}>Previous</button>
            }
            {filterPage > 1 &&
              <button className='page-button' onClick={()=>{setFilterPage(filterPage-1)}}>{filterPage-1}</button>
            }
            <button className='page-button' style={{backgroundColor:'lightcyan'}} onClick={()=>{setFilterPage(filterPage)}}>{filterPage}</button>
            {filterPage+1 <= totalFilterPages &&
              <button className='page-button' onClick={()=>{setFilterPage(filterPage+1)}}>{filterPage+1}</button>
            }
            {filterPage+2 <= totalFilterPages &&
              <p style={{padding:'0px 5px', marginRight:'5px', marginTop:'0px', marginBottom:'0px'}}>...</p>
            }
            {filterPage+2 <= totalFilterPages &&
              <button className='page-button' onClick={()=>{setFilterPage(totalFilterPages)}}>{totalFilterPages}</button>
            }
            {filterPage+1 < totalFilterPages &&
              <button className='page-button' onClick={()=>{setFilterPage(filterPage+1)}}>Next</button>
            }
          </div>
        }
      </div>
  );
}