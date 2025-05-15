import React, { useRef } from 'react'
import stateData from '../data/states';

export default function UserForm({ states, setStates, userInfo, setUserInfo }) {

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

    const formHandler = (event) => {
        event.preventDefault();

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

  return (
    <>
      <div class="form-container">
        <h2>Basic Form</h2>
        <form id="formHandler" autocomplete="off" onSubmit={ formHandler }>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required ref={name}/>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required ref={email}/>
            </div>
            <div class="form-group">
                <label for="mobile">Mobile Number</label>
                <input type="tel" id="mobile" name="mobile" required ref={mobileNumber}/>
            </div>
            <div class="form-group">
                <label for="country">Country</label>
                <select id="country" name="country" onChange={ getStates } required ref={countryName}>
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="Austraila">Austraila</option>
                </select>
            </div>
            <div class="form-group">
                <label for="state">State</label>
                <select id="state" name="state" required ref={stateName}>
                    <option value="">Select State</option>
                    {
                        states.map((v, i) => {
                            return(
                                <option value={v.name}>{ v.name }</option>
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
