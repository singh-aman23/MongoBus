"use client";
import { useState } from "react";
import classes from "./bus-form.module.css";
import BusResults from "./busResult";

export default function BusForm() {
    const [buses, setBuses] = useState([]);
    const [errors, setErrors] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();
        setErrors(null);
        setBuses([]);

        const formData = new FormData(e.target);
        const startingLocation = formData.get("startingLocation");
        const finalLocation = formData.get("finalLocation");

        if(!startingLocation || !finalLocation){
            setErrors("All fields are mandatory");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/findBus', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({startingLocation, finalLocation})
            });

            const data = await response.json();
            if(response.ok){
                setBuses(data.buses);
            }else{
                setErrors(data.error);
            }
        } catch (error) {
            setErrors('An unexpected error occured');
            console.error('Error fetching buses', error);
        }
    }
  return (
    <div className={classes.formContainer}>
      <form className={classes.busForm} onSubmit = {handleSubmit}>
        <input
          type="text"
          name="startingLocation"
          id="startingLocation"
          placeholder="Starting Location"
          className={classes.inputField}
        />
        <input
          type="text"
          name="finalLocation"
          id="finalLocation"
          placeholder="Final Location"
          className={classes.inputField}
        />
        <button className={classes.searchButton}>Search Bus</button>
      </form>
      {errors && <p>ERROR : {errors}</p>}
      {buses.length > 0 && <BusResults buses = {buses}/>}
    </div>
  );
}
