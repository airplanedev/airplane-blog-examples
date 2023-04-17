import airplane from "airplane";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage";

export default airplane.task(
	{
		slug: "add_employee",
		name: "Add Employee",
		parameters: {
	    	name: {
	        	type: "shorttext",
	        	name: "Employee name",
	        	description: "The name of the new employee",
	      	},
	    	birthday: {
	        	type: "date",
	        	name: "Employee birthday",
	        	description: "The birthday of the new employee.",
	      	},
	    	email: {
	        	type: "shorttext",
	        	name: "Employee email",
	        	description: "The email address of the new employee",
	      	}
    	}
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.
	async (params) => {
		const firebaseConfig = {
		    storageBucket: 'birthday-calendar-3192d.appspot.com'
		};

		const app = initializeApp(firebaseConfig);
		const storage = getStorage();

		var dataRef = ref(storage, 'birthday-data.json');

		var employeeData = [];

		try {
			const url = await getDownloadURL(dataRef);
	    
		    const res = await fetch(url);
		    employeeData = await res.json();
		} catch (error) {
			console.log(error);
		}

		employeeData.push({
		    name: params.name,
		    birthday: params.birthday,
		    email: params.email
		});

		const jsonString = JSON.stringify(employeeData);

		await uploadString(dataRef, jsonString, "raw").then((snapshot) => {
		  console.log('Upload successful.');
		});

		return employeeData;
	}
)
