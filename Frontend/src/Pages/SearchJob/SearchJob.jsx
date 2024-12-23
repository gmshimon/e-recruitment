
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getJobs } from '../../Redux/Slices/jobSlice';
import SingleJob from '../../Component/SingleJob/SingleJob';

const SearchJob = () => {
    const {jobs} = useSelector(state=>state.job)
    const location = useLocation();

    // Parse query parameters from the location.search
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('title'); // Extract 'title' parameter
    const category = queryParams.get('category'); // Extract 'category' parameter

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getJobs({title,category}))
    },[category, dispatch, title])

    console.log(jobs);

    return (
        <section className='pt-20'>
            <div className='flex justify-center mt-10'>
              <div className='grid grid-cols-1 md:grid-cols-4  gap-x-10 gap-y-10'>
                {jobs.map((tab, index) => (
                  <SingleJob job={tab} key={index}/>
                ))}
              </div>
            </div>
        </section>
    );
};

export default SearchJob;