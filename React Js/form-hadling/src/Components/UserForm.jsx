import React, { useRef } from 'react'
import stateData from '../data/states';

export default function UserForm({ states, setStates, userInfo, setUserInfo, singleUser, setSingleUser }) {

    var name = useRef();
    var email = useRef();
    var mobileNumber = useRef();
    var countryName = useRef();
    var stateName = useRef();

    const getStates = (i) => {
        
        var finalStates = stateData.filter((v) => {
            if(i.target.value == v.country_name){
                return v;
            }
        })

        setStates([...finalStates]);
    }

    // const getilterStates = (i) => {
        
    //     var finalStates = stateData.filter((v) => {
    //         if(i.target.value == v.country_name){
    //             return v;
    //         }
    //     })

    //     setStates([...finalStates]);
    // }

    // if(singleUser.id){
    //     getStates(singleUser.countryName);
    // }

    const formHandler = (event) => {
        event.preventDefault();

        console.log(singleUser.id);

        if(singleUser.id != -1){
            console.log('update');
            var finalData = userInfo.map((v,i) => {
                if(singleUser.id == i){
                    v.name = name.current.value;
                    v.email = email.current.value;
                    v.mobile_number = mobileNumber.current.value;
                    v.country_name = countryName.current.value;
                    v.state_name = stateName.current.value;

                    return v;
                } else {
                    return v;
                }
            })

            setUserInfo([...finalData]);
            localStorage.setItem('user_info', JSON.stringify(finalData));

            event.target.reset();
            setStates([]);
        } else {
            console.log('insert');
            const user = {
                name : name.current.value,
                email : email.current.value,
                mobile_number : mobileNumber.current.value,
                country_name : countryName.current.value,
                state_name : stateName.current.value,
            }

            var finalData = [user, ...userInfo];
            setUserInfo(finalData);
            localStorage.setItem('user_info', JSON.stringify(finalData));

            event.target.reset();
            setStates([]);
        }

        setSingleUser({
            id: -1,
            name : '',
            email : '',
            mobile_number : '',
            country_name : '',
            state_name : ''
        })
        
    }

  return (
    <>
      <div class="form-container">
        <h2>Basic Form</h2>
        <form id="formHandler" autocomplete="off" onSubmit={ formHandler }>

            
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" defaultValue={singleUser.name} name="name" required ref={name}/>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" defaultValue={singleUser.email} name="email" required ref={email}/>
            </div>
            <div class="form-group">
                <label for="mobile">Mobile Number</label>
                <input type="tel" id="mobile" defaultValue={singleUser.mobile_number} name="mobile" required ref={mobileNumber}/>
            </div>
            <div class="form-group">
                <label for="country">Country</label>
                <select id="country" name="country" onChange={ getStates } required ref={countryName}>
                    <option value="">Select Country</option>
                    <option value="India" selected={ singleUser.country_name == 'India' ? 'selected' : '' }>India</option>
                    <option value="Canada" selected={ singleUser.country_name == 'Canada' ? 'selected' : '' }>Canada</option>
                    <option value="Austraila" selected={ singleUser.country_name == 'Austraila' ? 'selected' : '' }>Austraila</option>
                </select>
            </div>
            <div class="form-group">
                <label for="state">State</label>
                <select id="state" name="state" ref={stateName}>
                    <option value="">Select State</option>
                    {
                        states.map((v, i) => {
                            return(
                                <option value={v.name} selected={ singleUser.state_name == v.name ? 'selected' : '' }>{ v.name }</option>
                            )
                        })
                    }
                </select>
            </div>
            <button type="submit" class="submit-btn">Submit</button>
        </form>
    </div>
    </>
  )
}
