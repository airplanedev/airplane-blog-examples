import airplane from "airplane"
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default airplane.task(
	{
		slug: "read_birthdays",
		name: "Read Birthdays",
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.
	async () => {
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

		    // Sort the data in ascending order by name.
			employeeData.sort((a, b) => {
			  const monthA = a.birthday.substring(5,7);
			  const monthB = b.birthday.substring(5,7)

			  const dayA   = a.birthday.substring(8,10);
			  const dayB   = b.birthday.substring(8,10);

			  if (monthA === monthB) {
			    return dayA - dayB;
			  }
			  return monthA - monthB;
			});
		} catch (error) {
			console.log(error);
		}

		// You can return data to show output to users.
		// Output documentation: https://docs.airplane.dev/tasks/output
		return employeeData;
	}
)
